package com.ecommerce3d.backend.models;

import jakarta.persistence.*;

@Entity
public class Shade {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  private String url;

  private String image;

  private double price;

  public Shade() {
  }

  public Shade(String url, String name, double price, String image) {
    this.url = url;
    this.name = name;
    this.price = price;
    this.image = image;
  }

  public String getUrl() {
    return url;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getId() {
    return id;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }
}
