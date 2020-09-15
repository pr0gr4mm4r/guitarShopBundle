package com.repositories;

import com.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token"})
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    @Query(value = "select * from role where role = :name" , nativeQuery = true)
            Role findByName(@Param(value = "name") String name);
}
