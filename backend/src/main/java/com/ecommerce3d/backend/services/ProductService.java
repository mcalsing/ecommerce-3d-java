package com.ecommerce3d.backend.services;

import com.ecommerce3d.backend.dtos.ProductDTO;
import com.ecommerce3d.backend.models.Product;
import com.ecommerce3d.backend.models.Base;
import com.ecommerce3d.backend.models.Shade;
import com.ecommerce3d.backend.repositories.BaseRepository;
import com.ecommerce3d.backend.repositories.ProductRepository;
import com.ecommerce3d.backend.repositories.ShadeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductService {
  private final ProductRepository productRepository;
  private final BaseRepository baseRepository;
  private final ShadeRepository shadeRepository;

  public ProductService(ProductRepository productRepository,
                        BaseRepository baseRepository,
                        ShadeRepository shadeRepository ) {
    this.productRepository = productRepository;
    this.baseRepository = baseRepository;
    this.shadeRepository = shadeRepository;
  }

  public List<Product> findAll() {
    return productRepository.findAll();
  }

  public Product create(ProductDTO dto) {
    Base base = baseRepository.findById(dto.getLampBaseId())
            .orElseThrow(() -> new RuntimeException("Base not found"));

    Shade shade = shadeRepository.findById(dto.getLampShadeId())
            .orElseThrow(() -> new RuntimeException("Shade not found"));

    Product product = new Product(
            dto.getLampBaseColor(),
            base,
            dto.getLampShadeColor(),
            shade
    );

    return productRepository.save(product);
  }

  public void delete(Long id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
    productRepository.delete(product);
  }
}
