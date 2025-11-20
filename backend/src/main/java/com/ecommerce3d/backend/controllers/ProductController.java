package com.ecommerce3d.backend.controllers;

import com.ecommerce3d.backend.dtos.ProductDTO;
import com.ecommerce3d.backend.models.Product;
import com.ecommerce3d.backend.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
  private final ProductService service;

  public ProductController(ProductService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<List<Product>> findAll() {
    return ResponseEntity.ok(service.findAll());
  }

  @PostMapping
  public ResponseEntity<Product> create(@RequestBody ProductDTO dto) {
    return ResponseEntity.ok(service.create(dto));
  }
}
