package com.ecommerce3d.backend.repositories;

import com.ecommerce3d.backend.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
