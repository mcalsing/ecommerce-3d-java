package com.ecommerce3d.backend.repositories;

import com.ecommerce3d.backend.models.Shade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShadeRepository extends JpaRepository<Shade, Long> {
}
