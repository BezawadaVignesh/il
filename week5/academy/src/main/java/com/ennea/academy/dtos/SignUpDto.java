package com.ennea.academy.dtos;

import com.ennea.academy.enums.UserRole;

public record SignUpDto(
        String login,
        String password,
        UserRole role) {
}
