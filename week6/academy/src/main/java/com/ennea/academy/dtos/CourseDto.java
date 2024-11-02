package com.ennea.academy.dtos;

import jakarta.validation.constraints.NotNull;

public record CourseDto(Long id,
                        @NotNull String title,
                        @NotNull String desc,
                        @NotNull double price,
                        @NotNull Long instructorId) {
}
