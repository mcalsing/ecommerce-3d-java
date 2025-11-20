package com.ecommerce3d.backend.services;

import com.ecommerce3d.backend.models.Base;
import com.ecommerce3d.backend.repositories.BaseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BaseService {
  private final BaseRepository repository;

  public BaseService(BaseRepository repository) {
    this.repository = repository;
  }

  public List<Base> findAll() {
    return repository.findAll();
  }

  public Base create(Base base) {
    return repository.save(base);
  }
}
