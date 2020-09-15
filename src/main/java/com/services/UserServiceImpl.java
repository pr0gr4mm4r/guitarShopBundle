package com.services;

import com.entities.Address;
import com.entities.Role;
import com.entities.User;
import com.google.gson.Gson;
import com.repositories.AddressRepository;
import com.repositories.RoleRepository;
import com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin
@Transactional
@Service
public class UserServiceImpl implements UserDetailsService, UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    AddressRepository addressRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public List<String> receiveUserRolesByEmail(String email) {
        User user = this.userRepository.findOneWithRolesByEmailIgnoreCase(email).get();
        System.out.println(user);
        List<Role> userRoles = user.getUserRoles();
        return userRoles.stream().map(Role::getRoleName).collect(Collectors.toList());
    }

    @Override
    public User addUser(Object[] userInfoObjects) {
        Object userObject = userInfoObjects[0];
        Object addressObject = userInfoObjects[1];
        String userJson = userObject.toString();
        String addressJson = addressObject.toString();
        Gson gson = new Gson();
        User user = gson.fromJson(userJson, User.class);
        Address address = gson.fromJson(addressJson, Address.class);
        Role role = roleRepository.findByName("ADMIN");
        user.setUserRoles(Arrays.asList(role));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(true);
        try { //if address already persisted
            Optional<Address> optionalAddress = this.addressRepository.findAddressByAttributeCombination(
                    address.getCountry(), address.getCity(), address.getPostalCode(),
                    address.getStreetName(), address.getStreetNumber());
            user.setAddress(optionalAddress.get());
            this.userRepository.save(user);
            role.getUsers().add(user);
            this.roleRepository.save(role);
        } catch (NoSuchElementException e1) { //if address not persisted yet
            this.addressRepository.save(address);
            try {
                Optional<Address> mustBePresent = addressRepository.findAddressByAttributeCombination(
                        address.getCountry(), address.getCity(), address.getPostalCode(),
                        address.getStreetName(), address.getStreetNumber());
                user.setAddress(mustBePresent.get());
                this.userRepository.save(user);
                role.getUsers().add(user);
                this.roleRepository.save(role);
            } catch (NoSuchElementException e2) {
                e2.printStackTrace();
            }
        }
        return user;
    }

    @Override
    public boolean checkIfEmailPersisted(String email) {
        if (userRepository.findOneWithRolesByEmailIgnoreCase(email).isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public boolean checkIfNamePersisted(String name) {
        if (userRepository.findUserByName(name).isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(final String email) throws UsernameNotFoundException {
        Optional<User> userFromDatabase = this.userRepository.findOneWithRolesByEmailIgnoreCase(email);
        return userFromDatabase.map(user -> {
            List<GrantedAuthority> grantedAuthorities = user.getUserRoles().stream()
                    .map(authority -> new SimpleGrantedAuthority("ROLE_" + authority.getRoleName()))
                    .collect(Collectors.toList());
            return new org.springframework.security.core.userdetails.User(email,
                    user.getPassword(),
                    grantedAuthorities);
        }).orElseThrow(() -> new UsernameNotFoundException("User " + email + " was not found in the " +
                "database"));
    }
}
