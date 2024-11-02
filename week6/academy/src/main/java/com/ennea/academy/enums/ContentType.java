package com.ennea.academy.enums;

public enum ContentType {
    VIDEO("video");

    private String type;

    ContentType(String type) {
        this.type = type;
    }

    public String getValue() {
        return type;
    }
}