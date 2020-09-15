package com.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "`Order`")
public class Order {
    @Id
    @GeneratedValue
    @Column(name = "`orderId`")
    private long orderId;
    @Column(name = "`price`")
    private int price;
    @Temporal(TemporalType.DATE)
    @Column(name = "`creationDate`")
    private Date creationDate;
    @ManyToMany
    @JoinTable(
            name = "Userorders",
            joinColumns = @JoinColumn(name = "`orderId`", foreignKey = @ForeignKey(name = "orderIdReference")),
            inverseJoinColumns = @JoinColumn(name = "`userId`", foreignKey = @ForeignKey(name = "userIdReference"))
    )
    @JsonIgnore
    @Column(name = "`usersOrders`")
    private List<User> usersOrders;

    public int getPrice() {
        return price;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public List<User> getUsersOrders() {
        return usersOrders;
    }

    public long getOrderId() {
        return orderId;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public void setUsersOrders(List<User> usersOrders) {
        this.usersOrders = usersOrders;
    }
}
