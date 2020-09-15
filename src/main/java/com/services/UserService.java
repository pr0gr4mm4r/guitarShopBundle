package com.services;

import com.entities.Address;
import com.entities.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@Service
public interface UserService {
    User addUser(Object[] userInfoObjects);
    List<String> receiveUserRolesByEmail(String email);
    boolean checkIfEmailPersisted(String email);
    boolean checkIfNamePersisted(String name);
    UserDetails loadUserByUsername(String login);
}
