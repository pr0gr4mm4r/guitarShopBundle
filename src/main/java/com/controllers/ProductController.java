package com.controllers;

import com.entities.Product;
import com.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@Controller
public class ProductController {

    @Autowired
    private ProductService productService;

    @DeleteMapping(value = "/delete/{pid}")
    public boolean deleteProduct(@PathVariable int pid) {
        return productService.deleteProductByProductName(pid);
    }

    @PostMapping(value = "/currentImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String add(@RequestParam(value = "currentImage") MultipartFile currentImage, @RequestPart(value = "productParams") Product product) throws IOException {
        this.productService.addProduct(currentImage, product);
        return "";
    }

    @GetMapping(value = "/products")
    public @ResponseBody
    List<Product> products() {
        return this.productService.getAll();
    }

    @GetMapping(value = "/productById/{id}")
    public @ResponseBody
    Product productById(@PathVariable("id") int id) {
        return this.productService.getProductById(id).get();
    }

    @GetMapping(value = "/productByName/{productName}")
    public @ResponseBody
    Product productByName(@PathVariable("productName") String productName) {
        return this.productService.getProductByName(productName);
    }

    @GetMapping(value = "/productByName/")
    public @ResponseBody
    Product avoidClientErrorMessage() {
        return null;
    }
}
