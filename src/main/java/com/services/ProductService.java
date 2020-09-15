package com.services;

import com.entities.Product;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@Service
public interface ProductService {
    boolean deleteProductByProductName(int pid);
    String addProduct(MultipartFile image, Product product);
    Optional<Product> getProductById(int productId);
    Product getProductByName(String productName);
    boolean updateProduct(Product product);
    List<Object> getShoppingCartProducts(List<Object> shoppingCart);
    List<Product> getAll();
}
