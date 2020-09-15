package com.repositories;

import com.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token"})
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
}
