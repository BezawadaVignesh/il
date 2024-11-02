package com.ennea.academy.dtos;

import com.ennea.academy.enums.UserRole;
import jakarta.validation.constraints.NotNull;

public record SignUpDto(
        @NotNull(message = "Username is required")
        String login,

        @NotNull(message = "Email is required")
        String email,
        @NotNull(message = "Password is required")
        String password,

        @NotNull(message = "Role is required")
        UserRole role) {
}
