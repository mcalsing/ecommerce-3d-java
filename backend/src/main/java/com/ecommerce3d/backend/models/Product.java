package com.ecommerce3d.backend.models;

import jakarta.persistence.*;

@Entity
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  private Shade lampShade;

  private String lampShadeColor;

  @ManyToOne
  private Base lampBase;

  private String lampBaseColor;

  private double price;

  private Product() {
  }

  public Product(double price, String lampBaseColor, Base lampBase, String lampShadeColor, Shade lampShade) {
    this.price = price;
    this.lampBaseColor = lampBaseColor;
    this.lampBase = lampBase;
    this.lampShadeColor = lampShadeColor;
    this.lampShade = lampShade;
  }

  public Long getId() {
    return id;
  }

  public Shade getLampShade() {
    return lampShade;
  }

  public void setLampShade(Shade lampShade) {
    this.lampShade = lampShade;
  }

  public String getLampShadeColor() {
    return lampShadeColor;
  }

  public void setLampShadeColor(String lampShadeColor) {
    this.lampShadeColor = lampShadeColor;
  }

  public Base getLampBase() {
    return lampBase;
  }

  public void setLampBase(Base lampBase) {
    this.lampBase = lampBase;
  }

  public String getLampBaseColor() {
    return lampBaseColor;
  }

  public void setLampBaseColor(String lampBaseColor) {
    this.lampBaseColor = lampBaseColor;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }
}
