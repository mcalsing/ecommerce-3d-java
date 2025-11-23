package com.ecommerce3d.backend.models;

import jakarta.persistence.*;

@Entity
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long clientId;

  private Long productId;

  private String status;
}
