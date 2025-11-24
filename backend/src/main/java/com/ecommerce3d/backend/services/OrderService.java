package com.ecommerce3d.backend.services;

import com.ecommerce3d.backend.dtos.OrderDTO;
import com.ecommerce3d.backend.models.Order;
import com.ecommerce3d.backend.models.Product;
import com.ecommerce3d.backend.models.User;
import com.ecommerce3d.backend.repositories.OrderRepository;
import com.ecommerce3d.backend.repositories.ProductRepository;
import com.ecommerce3d.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
  private final OrderRepository orderRepository;
  private final UserRepository userRepository;
  private final ProductRepository productRepository;

  public OrderService(OrderRepository orderRepository, UserRepository userRepository, ProductRepository productRepository) {
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.productRepository = productRepository;
  }

  public List<Order> findAll() {
    return orderRepository.findAll();
  }

  public Order create(OrderDTO dto) {
    User user = userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
    Product product = productRepository.findById(dto.getProductId())

            .orElseThrow(() -> new RuntimeException("User not found"));

    Order order = new Order(
            user,
            product
    );

    return orderRepository.save(order);
  }
}
