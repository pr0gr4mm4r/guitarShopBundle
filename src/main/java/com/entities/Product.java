package com.entities;

import javax.persistence.*;

@Entity
@Table(name = "`Product`")
public class Product {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;
    @Column(name = "currentName", unique = true)
    private String currentName;
    @Column(name = "category")
    private String category; //als enum persistieren?
    @Column(name = "storageQuantity")
    private int storageQuantity;
    @Column(name = "currentDescription")
    private String currentDescription;
    @Column(name = "currentImage", length = 100000)
    private byte[] currentImage;
    @Column(name = "currentPrice")
    private double currentPrice;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStorageQuantity() {
        return storageQuantity;
    }

    public void setStorageQuantity(int storageQuantity) {
        this.storageQuantity = storageQuantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCurrentName() {
        return currentName;
    }

    public void setCurrentName(String currentName) {
        this.currentName = currentName;
    }

    public String getCurrentDescription() {
        return currentDescription;
    }

    public void setCurrentDescription(String currentDescription) {
        this.currentDescription = currentDescription;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public byte[] getCurrentImage() {
        return currentImage;
    }

    public void setCurrentImage(byte[] currentImage) {
        this.currentImage = currentImage;
    }
}
