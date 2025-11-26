package com.ecommerce3d.backend.dtos;

public class OrderDTO {

  private Long userId;

  private Long lampShadeId;

  private String lampShadeColor;

  private Long lampBaseId;

  private String lampBaseColor;

  public OrderDTO() {
  }

  public OrderDTO(Long userId, String lampBaseColor, Long lampShadeId, Long lampBaseId, String lampShadeColor) {
    this.userId = userId;
    this.lampBaseColor = lampBaseColor;
    this.lampShadeId = lampShadeId;
    this.lampBaseId = lampBaseId;
    this.lampShadeColor = lampShadeColor;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public String getLampBaseColor() {
    return lampBaseColor;
  }

  public void setLampBaseColor(String lampBaseColor) {
    this.lampBaseColor = lampBaseColor;
  }

  public Long getLampBaseId() {
    return lampBaseId;
  }

  public void setLampBaseId(Long lampBaseId) {
    this.lampBaseId = lampBaseId;
  }

  public String getLampShadeColor() {
    return lampShadeColor;
  }

  public void setLampShadeColor(String lampShadeColor) {
    this.lampShadeColor = lampShadeColor;
  }

  public Long getLampShadeId() {
    return lampShadeId;
  }

  public void setLampShadeId(Long lampShadeId) {
    this.lampShadeId = lampShadeId;
  }
}
