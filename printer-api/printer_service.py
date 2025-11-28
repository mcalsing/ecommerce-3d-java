import time
import logging
import requests
import os
import bambulabs_api as bl
from pathlib import Path
from models.order import OrderKafka
from config import Config

logger = logging.getLogger(__name__)

class PrinterService:
    """Serviço para controlar a impressora BambuLab"""
    
    def __init__(self):
        self.printer = None
        self.config = Config()
        self._ensure_download_path()
    
    def _ensure_download_path(self):
        """Cria diretório para modelos 3D se não existir"""
        Path(self.config.MODELS_DOWNLOAD_PATH).mkdir(parents=True, exist_ok=True)
    
    def connect(self):
        """Conecta à impressora BambuLab"""
        try:
            logger.info(f"Conectando à impressora em {self.config.PRINTER_IP}")
            self.printer = bl.Printer(
                self.config.PRINTER_IP,
                self.config.PRINTER_ACCESS_CODE,
                self.config.PRINTER_SERIAL
            )
            self.printer.connect()
            time.sleep(2)
            logger.info("Impressora conectada com sucesso!")
            return True
        except Exception as e:
            logger.error(f"Erro ao conectar à impressora: {e}")
            return False
    
    def disconnect(self):
        """Desconecta da impressora"""
        if self.printer:
            self.printer.disconnect()
            logger.info("Impressora desconectada")
    
    def get_status(self):
        """Obtém status atual da impressora"""
        if not self.printer:
            return None
        try:
            status = self.printer.get_state()
            logger.info(f"Status da impressora: {status}")
            return status
        except Exception as e:
            logger.error(f"Erro ao obter status: {e}")
            return None
    
    def download_model(self, url: str, filename: str) -> str:
        """Baixa modelo 3D da URL"""
        try:
            logger.info(f"Baixando modelo de {url}")
            response = requests.get(url, stream=True)
            response.raise_for_status()
            
            filepath = os.path.join(self.config.MODELS_DOWNLOAD_PATH, filename)
            
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            logger.info(f"Modelo baixado: {filepath}")
            return filepath
        except Exception as e:
            logger.error(f"Erro ao baixar modelo: {e}")
            raise
    
    def process_order(self, order: OrderKafka):
        """Processa pedido e envia para impressão"""
        try:
            logger.info(f"Processando pedido #{order.orderId}")
            
            # 1. Baixar modelos 3D
            lampshade_path = self.download_model(
                order.lampShadeUrl,
                f"order_{order.orderId}_lampshade.stl"
            )
            
            lampbase_path = self.download_model(
                order.lampBaseUrl,
                f"order_{order.orderId}_lampbase.stl"
            )
            
            # 2. Verificar status da impressora
            status = self.get_status()
            if not status:
                raise Exception("Não foi possível obter status da impressora")
            
            # 3. Preparar impressão
            
            self.printer.turn_light_on()

            time.sleep(3)

            # Exemplo de controle da luz durante impressão
            self.printer.turn_light_off()
            
            # Aqui você implementaria o envio real do arquivo para impressão
            # Exemplo: self.printer.start_print(lampshade_path)
            
            logger.info(f"Pedido #{order.orderId} enviado para impressão!")
            
            # 5. (Opcional) Notificar Spring Boot que impressão iniciou
            # self._notify_spring_boot(order.orderId, "PRINTING")
            
            return True
            
        except Exception as e:
            logger.error(f"Erro ao processar pedido #{order.orderId}: {e}")
            # self._notify_spring_boot(order.orderId, "ERROR")
            return False