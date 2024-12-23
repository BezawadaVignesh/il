package com.ennea.academy.enums;

public enum UserRole {
    ADMIN("admin"),
    USER("user"),
    INSTRUCTOR("instructor");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getValue() {
        return role;
    }
}
