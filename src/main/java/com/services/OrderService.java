package com.services;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@CrossOrigin
public interface OrderService {
    boolean createOrder();
}
