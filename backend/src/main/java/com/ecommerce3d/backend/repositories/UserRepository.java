package com.ecommerce3d.backend.repositories;

import com.ecommerce3d.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
