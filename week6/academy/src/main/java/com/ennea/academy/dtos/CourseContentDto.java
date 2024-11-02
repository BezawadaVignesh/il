package com.ennea.academy.dtos;

import com.ennea.academy.enums.ContentType;

public record CourseContentDto(
        Long id,
        String title,
        ContentType type,
        String contentUrl

) {

}
