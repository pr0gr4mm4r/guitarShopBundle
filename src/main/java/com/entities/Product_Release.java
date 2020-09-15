package com.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "`Product_Release`")
public class Product_Release {
    @Column(name = "productVersion")
    @EmbeddedId
    private Product_Version product_version;
    @Column(name = "price")
    private int price;
    @Column(name = "name")
    private String name;
    @Temporal(value = TemporalType.DATE)
    @Column(name = "addingDate")
    private Date addingDate;
    @Column(name = "description")
    private String description;

    public Date getAddingDate() {
        return addingDate;
    }

    public void setAddingDate(Date addingDate) {
        this.addingDate = addingDate;
    }

    public int getPrice() {
        return price;
    }

    public String getName() {
        return name;
    }

    public Product_Version getProduct_version() {
        return product_version;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProduct_version(Product_Version product_version) {
        this.product_version = product_version;
    }
}
