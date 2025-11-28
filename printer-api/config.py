import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Kafka Configuration
    KAFKA_BOOTSTRAP_SERVERS = os.getenv('KAFKA_BOOTSTRAP_SERVERS')
    KAFKA_TOPIC = os.getenv('KAFKA_TOPIC')
    KAFKA_GROUP_ID = os.getenv('KAFKA_GROUP_ID')
    
    # BambuLab Printer Configuration
    PRINTER_IP = os.getenv('PRINTER_IP')
    PRINTER_SERIAL = os.getenv('PRINTER_SERIAL')
    PRINTER_ACCESS_CODE = os.getenv('PRINTER_ACCESS_CODE')
    
    # API Configuration
    MODELS_DOWNLOAD_PATH = os.getenv('MODELS_DOWNLOAD_PATH', './3d_models')
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
