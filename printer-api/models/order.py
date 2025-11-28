from dataclasses import dataclass
from typing import Optional

@dataclass
class OrderKafka:
    """Modelo de pedido recebido do Kafka"""
    orderId: int
    lampShadeUrl: str
    lampShadeColor: str
    lampBaseUrl: str
    lampBaseColor: str
    
    @classmethod
    def from_dict(cls, data: dict):
        """Cria instância a partir de dicionário"""
        return cls(
            orderId=data.get('orderId'),
            lampShadeUrl=data.get('lampShadeUrl'),
            lampShadeColor=data.get('lampShadeColor'),
            lampBaseUrl=data.get('lampBaseUrl'),
            lampBaseColor=data.get('lampBaseColor')
        )
    
    def to_dict(self):
        """Converte para dicionário"""
        return {
            'orderId': self.orderId,
            'lampShadeUrl': self.lampShadeUrl,
            'lampShadeColor': self.lampShadeColor,
            'lampBaseUrl': self.lampBaseUrl,
            'lampBaseColor': self.lampBaseColor
        }