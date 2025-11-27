package com.ecommerce3d.backend.controllers;

import com.ecommerce3d.backend.dtos.OrderDTO;
import com.ecommerce3d.backend.models.Order;
import com.ecommerce3d.backend.models.User;
import com.ecommerce3d.backend.repositories.UserRepository;
import com.ecommerce3d.backend.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/orders")
public class OrderController {
  private final OrderService orderService;
  private final UserRepository userRepository;

  public OrderController(OrderService orderService, UserRepository userRepository) {
    this.orderService = orderService;
    this.userRepository = userRepository;
  }

  @GetMapping
  public ResponseEntity<List<Order>> findAll() {
    return ResponseEntity.ok(orderService.findAll());
  }

  @PostMapping
  public ResponseEntity<Order> createOrder(@RequestBody OrderDTO dto, Authentication auth ) {
    String email = auth.getName(); // email do token
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    Order order = orderService.create(dto, user);

    return ResponseEntity.ok(order);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    orderService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
