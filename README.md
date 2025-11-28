# Modular Lamp – Abajur Modular Personalizável

## Integrantes do Grupo
- **Marcelo Lavratti Calsing**

---

## 📘 Descrição do Sistema

O **Modular Lamp** é um sistema de personalização e compra de um **abajur modular**, onde o cliente escolhe:

- Cúpula do abajur
- Base do abajur 
- Cor da cúpula
- Cor da base

Após finalizar a compra, um fluxo automatizado é disparado usando mensageria para auxiliar na produção e organização interna. O sistema integra:

- Front-end (personalização e compra)
- Back-end (API + eventos Kafka)
- MailHog (para testes de e-mail)
- Python Consumer (para download de arquivos .stl e controle de hardware)

### O que o sistema resolve
- Permite personalização completa do produto.
- Automatiza parte do processo produtivo.
- Facilita o fluxo pedido → produção.
- Integra com impressora 3D (acender/apagar luz).

### Público-alvo
- Designers e consumidores finais.
- Makers e entusiastas de impressão 3D.
- Pequenas lojas de produtos personalizados.

---

## 🛠️ Tecnologias Utilizadas

### **Front-end**
- Angular
- TypeScript
- Tailwind

### **Back-end**
- Java 17 + Spring Boot
- Spring Web / Security (JWT) / Data JPA
- MySQL
- Docker e Docker Compose
- MailHog (SMTP)
- Kafka Producer

### **Mensageria**
- Apache Kafka
  - **Producer:** Spring Boot  
  - **Consumer:** Python

### **Serviço Python**
- Kafka Consumer
- Download automático de STL
- Controle da iluminação da impressora 3D

---

## Como Rodar o Back-end (Spring Boot)

### ✔️ Pré-requisitos
- Java 17  
- Maven  
- Docker + Docker Compose  
- MySQL  

### Clonar o repositório
```
git clone https://github.com/mcalsing/ecommerce-3d-java.git
```

### Entrar na pasta Backend para subir o subir Kafka e MailHog
```
docker compose up -d
```

Subir o backend rodando o arquivo application.java


### Banco de dados
  - Criar a database no MySQL
  ```
  create database productsddd;
  ```

### Criar usuário pelo postman

## Configuração inicial via Postman

### Criar usuário

```
POST /auth/register
```

### Fazer login para receber o token
```
POST /auth/login
```

### Adicionar o token no Postman (Authorization → Bearer Token)

### Criar uma Lampshade

```
POST /shades
```

Body:

```
{
    "name": "Blink",
    "url": "https://images3dproducts.s3.us-east-1.amazonaws.com/shades/vertexShade.stl",
    "image": "https://images3dproducts.s3.us-east-1.amazonaws.com/shadesv2/blinkShade.png",
    "price": 55.90
}
```

### Criar uma Base

```
POST /bases
```

Body:

```
{
    "name": "Kinect",
    "url": "https://images3dproducts.s3.us-east-1.amazonaws.com/bases/vertexBase.stl",
    "image": "https://images3dproducts.s3.us-east-1.amazonaws.com/basesv2/kinectBase.png",
    "price": 36.9
}
```

## Rodando o Front-end (Angular)

Entrar na pasta do frontend
```
ng serve
```

## Acompanhar os serviços

### Kafdrop — ver mensagens no Kafka
```
http://localhost:9000/
```

### MailHog — ver e-mail do pedido
```
http://localhost:8025/
```

## Rodar o Consumer em Python

### Criar ambiente virtual
```
python3 -m venv venv
```

### No Windows:
```
venv\Scripts\activate
```

### No Linux/Mac:
```
source venv/bin/activate
```

### Instalar dependências
```
pip install -r requirements.txt
```

### Rodar o python consumer
```
pyhton3 test_kafka_consumer.py
```

## Fluxo para testar uma compra no site

- Criar um novo usuário no site.
- Fazer login.
- Adicionar 1 cúpula (shade) ao carrinho.
- Adicionar 1 base ao carrinho.
- Clicar no ícone de carrinho no header.
- Finalizar a compra.
- Acompanhar: 
   - Mensagem no Kafka (Kafdrop)
   - E-mail no MailHog
   - Logs no terminal do Consumer Python