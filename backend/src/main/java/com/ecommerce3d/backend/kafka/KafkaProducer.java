package com.ecommerce3d.backend.kafka;

import com.ecommerce3d.backend.dtos.OrderKafkaDTO;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaProducer {
  private final KafkaTemplate<String, OrderKafkaDTO> kafkaTemplate;

  public KafkaProducer(KafkaTemplate<String, OrderKafkaDTO> kafkaTemplate) {
    this.kafkaTemplate = kafkaTemplate;
  }

  public void send(OrderKafkaDTO dto) {
    kafkaTemplate.send("order-print", dto);
  }
}
