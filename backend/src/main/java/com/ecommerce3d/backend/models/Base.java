package com.ecommerce3d.backend.models;

import jakarta.persistence.*;

@Entity
public class Base {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  private String url;

  private double price;

  public Base() {
  }

  public Base(String url, String name, double price) {
    this.url = url;
    this.name = name;
    this.price = price;
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
}
