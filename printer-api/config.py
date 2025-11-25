import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Kafka Configuration
    KAFKA_BOOTSTRAP_SERVERS = os.getenv('KAFKA_BOOTSTRAP_SERVERS', 'localhost:9092')
    KAFKA_TOPIC = os.getenv('KAFKA_TOPIC', 'order-print')
    KAFKA_GROUP_ID = os.getenv('KAFKA_GROUP_ID', 'printer-consumer-group')
    
    # BambuLab Printer Configuration
    PRINTER_IP = os.getenv('PRINTER_IP', '192.168.1.200')
    PRINTER_SERIAL = os.getenv('PRINTER_SERIAL', 'AC12309BH109')
    PRINTER_ACCESS_CODE = os.getenv('PRINTER_ACCESS_CODE', '12347890')
    
    # API Configuration
    MODELS_DOWNLOAD_PATH = os.getenv('MODELS_DOWNLOAD_PATH', './3d_models')
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
