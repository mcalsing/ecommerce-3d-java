package com.ecommerce3d.backend.controllers;

import com.ecommerce3d.backend.dtos.OrderDTO;
import com.ecommerce3d.backend.models.Order;
import com.ecommerce3d.backend.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @GetMapping
  public ResponseEntity<List<Order>> findAll() {
    return ResponseEntity.ok(orderService.findAll());
  }

  @PostMapping
  public ResponseEntity<Order> create(@RequestBody OrderDTO dto) {
    return ResponseEntity.ok(orderService.create(dto));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    orderService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
