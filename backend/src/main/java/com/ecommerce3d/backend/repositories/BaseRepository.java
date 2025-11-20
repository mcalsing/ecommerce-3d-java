package com.ecommerce3d.backend.repositories;

import com.ecommerce3d.backend.models.Base;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseRepository extends JpaRepository<Base, Long> {
}
