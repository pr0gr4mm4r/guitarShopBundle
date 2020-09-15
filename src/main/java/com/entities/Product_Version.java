package com.entities;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class Product_Version implements Serializable {
    @Column
    int version;
    @Column
    int productId;

    public int getProductId() {
        return productId;
    }

    public int getVersion() {
        return version;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public void setVersion(int version) {
        this.version = version;
    }
}
