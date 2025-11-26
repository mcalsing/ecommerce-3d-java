package com.ecommerce3d.backend.services;

import com.ecommerce3d.backend.models.Order;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailService {

  @Autowired
  private JavaMailSender mailSender;

  public void sendOrderEmail(Order order) {

    try {
      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, true);

      String orderNumber = String.valueOf(new Random().nextInt(99999));

      helper.setTo("marcelo@3dmax.com");
      helper.setSubject("Confirmação de Pedido #" + orderNumber);

      String html = """
                    <h2>Nova compra realizada!</h2>

                    <p><strong>Pedido feito por:</strong> %s<br>
                    <strong>E-mail:</strong> %s</p>

                    <h3>Detalhes do pedido:</h3>

                    <h4>LampShade:</h4>
                    <p><strong>- Nome:</strong> %s<br>
                    <strong>- Cor:</strong> %s<br>
                    <strong>- Preço:</strong> R$ %.2f</p>
                    <img src="%s" width="220" style="margin-bottom: 20px;" />

                    <h4>LampBase:</h4>
                    <p><strong>- Nome:</strong> %s<br>
                    <strong>- Cor:</strong> %s<br>
                    <strong>- Preço:</strong> R$ %.2f</p>
                    <img src="%s" width="220" style="margin-bottom: 20px;" />

                    <h3>Total do Pedido: <strong>R$ %.2f</strong></h3>
                    """.formatted(
              order.getUser().getName(),
              order.getUser().getEmail(),

              order.getProduct().getLampShade().getName(),
              order.getProduct().getLampShadeColor(),
              order.getProduct().getLampShade().getPrice(),
              order.getProduct().getLampShade().getImage(),

              order.getProduct().getLampBase().getName(),
              order.getProduct().getLampBaseColor(),
              order.getProduct().getLampBase().getPrice(),
              order.getProduct().getLampBase().getImage(),

              order.getProduct().getTotalPrice()
      );

      helper.setText(html, true); // true → HTML ativado

      mailSender.send(message);

    } catch (MessagingException e) {
      throw new RuntimeException("Erro ao enviar e-mail", e);
    }
  }
}
