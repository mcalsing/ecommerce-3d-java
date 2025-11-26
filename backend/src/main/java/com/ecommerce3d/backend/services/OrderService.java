package com.ecommerce3d.backend.services;

import com.ecommerce3d.backend.dtos.OrderDTO;
import com.ecommerce3d.backend.dtos.OrderKafkaDTO;
import com.ecommerce3d.backend.dtos.ProductDTO;
import com.ecommerce3d.backend.kafka.KafkaProducer;
import com.ecommerce3d.backend.models.Order;
import com.ecommerce3d.backend.models.Product;
import com.ecommerce3d.backend.models.User;
import com.ecommerce3d.backend.repositories.OrderRepository;
import com.ecommerce3d.backend.repositories.ProductRepository;
import com.ecommerce3d.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
public class OrderService {
  private final OrderRepository orderRepository;
  private final UserRepository userRepository;
  private final ProductService productService;
  private final KafkaProducer kafkaProducer;

  public OrderService(OrderRepository orderRepository,
                      UserRepository userRepository,
                      ProductRepository productRepository, ProductService productService,
                      KafkaProducer kafkaProducer) {

    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.productService = productService;
    this.kafkaProducer = kafkaProducer;
  }

  public List<Order> findAll() {
    return orderRepository.findAll();
  }

  @Autowired
  private EmailService emailService;

  @Transactional
  public Order create(OrderDTO dto) {

    // 1. Busca o usuário
    User user = userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

    // 2. Criar ProductDTO para enviar ao ProductService
    ProductDTO productDTO = new ProductDTO();
    productDTO.setLampBaseId(dto.getLampBaseId());
    productDTO.setLampBaseColor(dto.getLampBaseColor());
    productDTO.setLampShadeId(dto.getLampShadeId());
    productDTO.setLampShadeColor(dto.getLampShadeColor());


    // 3. Criar produto
    Product product = productService.create(productDTO);

    // 4. Criar pedido
    Order order = new Order(user, product);
    Order savedOrder = orderRepository.save(order);

    // 5. Criar DTO de Kafka
    OrderKafkaDTO kafkaDTO = new OrderKafkaDTO(
            savedOrder.getId(),
            product.getLampShade().getUrl(),
            product.getLampShadeColor(),
            product.getLampBase().getUrl(),
            product.getLampBaseColor()
    );

    // 6. Enviar para Kafka
    kafkaProducer.send(kafkaDTO);

    // 7. Envio de email
    emailService.sendOrderEmail(savedOrder);

    return savedOrder;
  }

  public void delete(Long id) {
    Order order = orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));
    orderRepository.delete(order);
  }
}
