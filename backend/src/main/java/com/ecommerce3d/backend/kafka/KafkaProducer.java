package com.ecommerce3d.backend.kafka;

import com.ecommerce3d.backend.dtos.OrderKafkaDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaProducer {
  private final KafkaTemplate<String, String> kafkaTemplate;
  private final ObjectMapper objectMapper;

  public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
    this.kafkaTemplate = kafkaTemplate;
    this.objectMapper = objectMapper;
  }

  public void send(OrderKafkaDTO dto) {
    try {
      // Converte o DTO para JSON
      String json = objectMapper.writeValueAsString(dto);

      kafkaTemplate.send("orders-topic", json);
      System.out.println("📤 Enviado para Kafka: " + json);

    } catch (Exception e) {
      throw new RuntimeException("Erro ao serializar OrderKafkaDTO", e);
    }
  }
}
