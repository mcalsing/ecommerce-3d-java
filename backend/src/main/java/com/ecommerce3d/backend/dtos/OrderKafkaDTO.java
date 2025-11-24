package com.ecommerce3d.backend.dtos;

public class OrderKafkaDTO {

  private Long orderId;

  private String lampShadeUrl;
  private String lampShadeColor;

  private String lampBaseUrl;
  private String lampBaseColor;

  public OrderKafkaDTO() {
  }

  public OrderKafkaDTO(Long orderId, String lampShadeUrl, String lampShadeColor,
                       String lampBaseUrl, String lampBaseColor) {

    this.orderId = orderId;
    this.lampShadeUrl = lampShadeUrl;
    this.lampShadeColor = lampShadeColor;
    this.lampBaseUrl = lampBaseUrl;
    this.lampBaseColor = lampBaseColor;
  }

  public Long getOrderId() {
    return orderId;
  }

  public String getLampShadeUrl() {
    return lampShadeUrl;
  }

  public String getLampShadeColor() {
    return lampShadeColor;
  }

  public String getLampBaseUrl() {
    return lampBaseUrl;
  }

  public String getLampBaseColor() {
    return lampBaseColor;
  }
}
