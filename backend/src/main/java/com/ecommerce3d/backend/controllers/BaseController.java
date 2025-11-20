package com.ecommerce3d.backend.controllers;

import com.ecommerce3d.backend.models.Base;
import com.ecommerce3d.backend.services.BaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bases")
public class BaseController {
  private final BaseService service;

  public BaseController(BaseService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<List<Base>> findAll() {
    return ResponseEntity.ok(service.findAll());
  }

  @PostMapping
  public ResponseEntity<Base> create(@RequestBody Base base) {
    return ResponseEntity.ok(service.create(base));
  }
}
