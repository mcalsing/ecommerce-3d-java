package com.ecommerce3d.backend.services;

import com.ecommerce3d.backend.dtos.OrderDTO;
import com.ecommerce3d.backend.dtos.OrderKafkaDTO;
import com.ecommerce3d.backend.kafka.KafkaProducer;
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
  private final KafkaProducer kafkaProducer;

  public OrderService(OrderRepository orderRepository,
                      UserRepository userRepository,
                      ProductRepository productRepository,
                      KafkaProducer kafkaProducer) {

    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.productRepository = productRepository;
    this.kafkaProducer = kafkaProducer;
  }

  public List<Order> findAll() {
    return orderRepository.findAll();
  }

  public Order create(OrderDTO dto) {
    User user = userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

    Product product = productRepository.findById(dto.getProductId())
            .orElseThrow(() -> new RuntimeException("User not found"));

    // Order que é salva no banco
    Order order = new Order(user, product);
    Order savedOrder =  orderRepository.save(order);

    // DTO para Kafka
    OrderKafkaDTO kafkaDTO = new OrderKafkaDTO(
            savedOrder.getId(),
            product.getLampShade().getUrl(),
            product.getLampShadeColor(),
            product.getLampBase().getUrl(),
            product.getLampBaseColor()
    );

    // Envia para Kafka
    kafkaProducer.send(kafkaDTO);

    return savedOrder;
  }

  public void delete(Long id) {
    Order order = orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));
    orderRepository.delete(order);
  }
}
