package com.ecommerce3d.backend.services;

import com.ecommerce3d.backend.dtos.OrderDTO;
import com.ecommerce3d.backend.models.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailService {

  @Autowired
  private JavaMailSender mailSender;

  public void sendOrderEmail(Order order) {

    String orderNumber = String.valueOf(new Random().nextInt(99999));

    String subject = "Confirmação do Pedido #" + orderNumber;

    String text = """
                Nova compra realizada!
                 - Pedido feito por: %s
                 - E-mail: %s

                Detalhes do pedido:

                🔹 Lampshade:
                - Nome: %s
                - Cor: %s
                - Preço: %s

                🔹 Base:
                - Nome: %s
                - Cor: %s
                - Preço: %s

                💰 Total: R$ %.2f
                """.formatted(
            order.getUser().getName(),
            order.getUser().getEmail(),

            order.getProduct().getLampShade().getName(),
            order.getProduct().getLampShadeColor(),
            order.getProduct().getLampShade().getPrice(),

            order.getProduct().getLampBase().getName(),
            order.getProduct().getLampBaseColor(),
            order.getProduct().getLampBase().getPrice(),

            order.getProduct().getTotalPrice()


    );

    SimpleMailMessage mail = new SimpleMailMessage();
    mail.setTo("marcelo@3dmax.com");
    mail.setSubject(subject);
    mail.setText(text);

    mailSender.send(mail);
  }
}