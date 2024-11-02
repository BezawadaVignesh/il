package com.ennea.academy.repositories;

import com.ennea.academy.dtos.CourseContentDto;
import com.ennea.academy.entities.CourseContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseContentRepository extends JpaRepository<CourseContent, Long> {

    List<CourseContent> findByCourseId(Long courseId);

    @Query("SELECT new com.ennea.academy.dtos.CourseContentDto(c.id, c.title, c.type, c.contentUrl) FROM CourseContent c where c.course.id = :courseId")
    List<CourseContentDto> findByCourseIdTableOnly(Long courseId);
}
