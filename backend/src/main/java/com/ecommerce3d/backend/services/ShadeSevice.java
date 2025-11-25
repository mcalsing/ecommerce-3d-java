package com.ecommerce3d.backend.services;

import com.ecommerce3d.backend.models.Base;
import com.ecommerce3d.backend.models.Shade;
import com.ecommerce3d.backend.repositories.ShadeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ShadeSevice {
  private final ShadeRepository repository;

  public ShadeSevice(ShadeRepository repository) {
    this.repository = repository;
  }

  public List<Shade> findAll() {
    return repository.findAll();
  }

  public Shade create(Shade shade) {
    return repository.save(shade);
  }

  public Shade getById(Long id) {
    Optional<Shade> shade = repository.findById(id);
    if (shade.isEmpty()) {
      throw new RuntimeException("Shade not found");
    }

    return shade.get();
  }

  public void delete(Long id) {
    Shade shade = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Shade not found"));
    repository.delete(shade);
  }
}
