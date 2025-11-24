package com.ecommerce3d.backend.producers;

import com.ecommerce3d.backend.dtos.OrderDTO;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderProducer {
  private final KafkaTemplate<String, OrderDTO> kafkaTemplate;

  public OrderProducer(KafkaTemplate<String, OrderDTO> kafkaTemplate) {
    this.kafkaTemplate = kafkaTemplate;
  }

  public void sendOrder(OrderDTO dto) {
    kafkaTemplate.send("pedido-impressao", dto);
  }
}
