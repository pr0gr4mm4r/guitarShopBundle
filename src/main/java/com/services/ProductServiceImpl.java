package com.services;

import com.entities.Product;
import com.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Transactional
@Service
@CrossOrigin
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public boolean deleteProductByProductName(int pid) {
        Product product = productRepository.findByProductId(pid);
        if (product != null) {
            productRepository.deleteById(pid);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String addProduct(MultipartFile image, Product product) {
        if(!this.productRepository.findByName(product.getCurrentName()).isPresent()) {
            try {
                product.setCurrentImage(image.getBytes());
                this.productRepository.save(product);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return "";
        }
        return "already there";
    }

    @Override
    public Optional<Product> getProductById(int pid) {
        Optional<Product> optionalProduct = this.productRepository.findById(pid);
        return optionalProduct.map(Optional::of).orElseGet(() -> Optional.of(new Product()));
    }

    @Override
    public Product getProductByName(String productName) {
        Optional<Product> optionalProduct = this.productRepository.findByName(productName);
        return optionalProduct.orElse(new Product());
    }

    @Override
    public boolean updateProduct(Product product) {
        return false;
    }

    @Override
    public List<Object> getShoppingCartProducts(List<Object> shoppingcart) {
        return new ArrayList<>();
    }

    @Override
    public List<Product> getAll() {
        return this.productRepository.findAll();
    }
}
