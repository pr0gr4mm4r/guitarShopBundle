package com.entities;

import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.util.List;

@Table(name = "`User`")
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {
    @Id
    @Column(name = "`userId`")
    @GeneratedValue
    private int id;
    @Column(name = "`name`", unique = true)
    private String name;
    @Column(name = "`email`", unique = true)
    private String email;
    @Column(name = "`password`")
    private String password;
    @Column(name = "`enabled`")
    private boolean enabled;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "addressId", referencedColumnName = "`addressId`")
    private Address address;
    @ManyToMany(mappedBy = "users")
    private List<Role> userRoles;
    @ManyToMany(mappedBy = "usersOrders")
    private List<Order> orders;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<Role> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<Role> userRoles) {
        this.userRoles = userRoles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}
