package com.repositories;

import com.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin(allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token"})
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "select * from product where id = :pid" , nativeQuery = true)
    Product findByProductId(@Param(value = "pid") int pid);

    @Query(value = "select * from product where product.current_name = :productName" , nativeQuery = true)
    Optional<Product> findByName(@Param(value = "productName") String productName);
}
