package com.ecommerce3d.backend.dtos;

import com.ecommerce3d.backend.models.UserRole;

public record RegisterDTO(String email, String password, String name, UserRole role) {
}
