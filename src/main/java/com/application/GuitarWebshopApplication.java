package com.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication(scanBasePackages = {"com.controllers", "com.services", "com.config"})
@EnableJpaRepositories(basePackages = "com.repositories")
@EntityScan("com.entities")
@EnableTransactionManagement
@EnableJpaAuditing
public class GuitarWebshopApplication {
    public static void main(String[] args) {
        SpringApplication.run(GuitarWebshopApplication.class, args);
    }
}
