import logging
from kafka_consumer import OrderKafkaConsumer
from config import Config

# Configurar logging
logging.basicConfig(
    level=getattr(logging, Config.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

def main():
    logger.info("🚀 Iniciando API de Impressão 3D")
    logger.info(f"📡 Kafka: {Config.KAFKA_BOOTSTRAP_SERVERS}")
    logger.info(f"🖨️  Impressora: {Config.PRINTER_IP}")
    
    # Criar e iniciar consumer
    consumer = OrderKafkaConsumer()
    
    if consumer.connect():
        logger.info("✅ Conexões estabelecidas")
        consumer.start_consuming()
    else:
        logger.error("❌ Falha ao conectar. Encerrando...")

if __name__ == "__main__":
    main()
