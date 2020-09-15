package com.entities;

import javax.persistence.*;

@Entity
@Table(name = "`Product_Composition`")
public class Product_Composition {
    @Id
    @GeneratedValue
    @Column(name = "`compositionId`")
    private int compositionId;
    @Column(name = "`product1`")
    private int product1;
    @Column(name = "`product2`")
    private int product2;
    @Column(name = "`product3`")
    private int product3;
    @Column(name = "`product1Release`")
    private int product1Release;
    @Column(name = "`product2Release`")
    private int product2Release;
    @Column(name = "`product3Release`")
    private int product3Release;

    public int getCompositionId() {
        return compositionId;
    }

    public void setCompositionId(int compositionId) {
        this.compositionId = compositionId;
    }

    public int getProduct1() {
        return product1;
    }

    public void setProduct1(int product1) {
        this.product1 = product1;
    }

    public int getProduct2() {
        return product2;
    }

    public void setProduct2(int product2) {
        this.product2 = product2;
    }

    public int getProduct3() {
        return product3;
    }

    public void setProduct3(int product3) {
        this.product3 = product3;
    }

    public int getProduct1Release() {
        return product1Release;
    }

    public void setProduct1Release(int product1Release) {
        this.product1Release = product1Release;
    }

    public int getProduct2Release() {
        return product2Release;
    }

    public void setProduct2Release(int product2Release) {
        this.product2Release = product2Release;
    }

    public int getProduct3Release() {
        return product3Release;
    }

    public void setProduct3Release(int product3Release) {
        this.product3Release = product3Release;
    }
}
