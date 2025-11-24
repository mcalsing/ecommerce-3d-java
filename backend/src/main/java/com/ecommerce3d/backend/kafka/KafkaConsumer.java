package com.ecommerce3d.backend.kafka;

import com.ecommerce3d.backend.dtos.OrderKafkaDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumer {

  private static final Logger logger = LoggerFactory.getLogger(KafkaConsumer.class);

  @KafkaListener(topics = "order-print", groupId = "ecommerce-group")
  public void consume(OrderKafkaDTO orderKafkaDTO) {
    logger.info("Mensagem recebida do Kafka: {}", orderKafkaDTO);

    // Aqui você processa o pedido de impressão 3D
    processOrder(orderKafkaDTO);
  }

  private void processOrder(OrderKafkaDTO dto) {
    logger.info("Processando pedido ID: {}", dto.getOrderId());
    logger.info("LampShade - URL: {}, Cor: {}", dto.getLampShadeUrl(), dto.getLampShadeColor());
    logger.info("LampBase - URL: {}, Cor: {}", dto.getLampBaseUrl(), dto.getLampBaseColor());

    // TOD(O): Implementar lógica de impressão 3D
    // - Baixar os modelos 3D das URLs
    // - Aplicar as cores
    // - Enviar para a impressora 3D
    // - Atualizar status do pedido
  }
}