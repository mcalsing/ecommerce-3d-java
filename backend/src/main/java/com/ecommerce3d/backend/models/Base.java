package com.ecommerce3d.backend.models;

import jakarta.persistence.*;

@Entity
public class Base {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  private String url;

  public Base() {
  }

  public Base(String url, String name) {
    this.url = url;
    this.name = name;
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

  public void setId(Long id) {
    this.id = id;
  }
}
