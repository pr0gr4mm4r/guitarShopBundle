package com.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "`Address`")
public class Address {
    @Id
    @GeneratedValue
    @Column(name = "`addressId`")
    private int addressId;
    @Column(name = "`country`")
    private String country;
    @Column(name = "`postalCode`")
    private int postalCode;
    @Column(name = "`city`")
    private String city;
    @Column(name = "`streetName`")
    private String streetName;
    @Column(name = "`streetNumber`")
    private int streetNumber;
    @JsonIgnore
    @OneToMany(mappedBy = "address")
    private List<User> user;

    public int getAddressId() {
        return addressId;
    }

    public void setAddressId(int addressId) {
        this.addressId = addressId;
    }

    public List<User> getUser() {
        return user;
    }

    public void setUser(List<User> user) {
        this.user = user;
    }

    public String getCountry() {
        return country;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public int getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(int streetNumber) {
        this.streetNumber = streetNumber;
    }

}
