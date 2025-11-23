package com.ecommerce3d.backend.dtos;

public class ProductDTO {

  private Long lampShadeId;
  private Long lampBaseId;

  private String lampShadeColor;
  private String lampBaseColor;

  public ProductDTO() {
  }

  public Long getLampShadeId() {
    return lampShadeId;
  }

  public void setLampShadeId(Long lampShadeId) {
    this.lampShadeId = lampShadeId;
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

  public String getLampBaseColor() {
    return lampBaseColor;
  }

  public void setLampBaseColor(String lampBaseColor) {
    this.lampBaseColor = lampBaseColor;
  }

}