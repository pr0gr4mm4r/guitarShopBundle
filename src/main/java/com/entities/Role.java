package com.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Table(name = "`Role`")
@Entity
public class Role {
    @Id
    @GeneratedValue
    @Column(name = "`roleId`")
    private long id;
    @Column(name = "`role`")
    private String roleName;
    @JsonIgnore
    @JoinTable(
            name = "Userrole",
            joinColumns = @JoinColumn(name = "`roleId`", foreignKey = @ForeignKey(name = "roleIdReference")),
            inverseJoinColumns = @JoinColumn(name = "`userId`", foreignKey = @ForeignKey(name = "userIdReference"))
    )
    @ManyToMany
    private List<User> users;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
