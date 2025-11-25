import json
import logging
from kafka import KafkaConsumer
from kafka.errors import KafkaError
from models.order import OrderKafka
from printer_service import PrinterService
from config import Config

logger = logging.getLogger(__name__)

class OrderKafkaConsumer:
    """Consumidor Kafka para pedidos de impressão"""
    
    def __init__(self):
        self.config = Config()
        self.consumer = None
        self.printer_service = PrinterService()
    
    def connect(self):
        """Conecta ao Kafka"""
        try:
            logger.info(f"Conectando ao Kafka em {self.config.KAFKA_BOOTSTRAP_SERVERS}")
            
            self.consumer = KafkaConsumer(
                self.config.KAFKA_TOPIC,
                bootstrap_servers=self.config.KAFKA_BOOTSTRAP_SERVERS,
                group_id=self.config.KAFKA_GROUP_ID,
                auto_offset_reset='earliest',  # Ler desde o início
                enable_auto_commit=True,
                value_deserializer=lambda m: json.loads(m.decode('utf-8'))
            )
            
            logger.info(f"Conectado ao tópico: {self.config.KAFKA_TOPIC}")
            
            # Conectar à impressora
            self.printer_service.connect()
            
            return True
            
        except KafkaError as e:
            logger.error(f"Erro ao conectar ao Kafka: {e}")
            return False
    
    def start_consuming(self):
        """Inicia consumo de mensagens"""
        try:
            logger.info("Aguardando mensagens...")
            
            for message in self.consumer:
                try:
                    # Parsear mensagem
                    order_data = message.value
                    logger.info(f"Mensagem recebida: {order_data}")
                    
                    # Criar objeto Order
                    order = OrderKafka.from_dict(order_data)
                    
                    # Processar pedido
                    success = self.printer_service.process_order(order)
                    
                    if success:
                        logger.info(f"✅ Pedido #{order.orderId} processado com sucesso!")
                    else:
                        logger.error(f"❌ Falha ao processar pedido #{order.orderId}")
                        
                except Exception as e:
                    logger.error(f"Erro ao processar mensagem: {e}")
                    continue
                    
        except KeyboardInterrupt:
            logger.info("Encerrando consumidor...")
        finally:
            self.close()
    
    def close(self):
        """Fecha conexões"""
        if self.consumer:
            self.consumer.close()
            logger.info("Consumer Kafka fechado")
        
        self.printer_service.disconnect()
