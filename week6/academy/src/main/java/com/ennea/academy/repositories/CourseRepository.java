package com.ennea.academy.repositories;

import com.ennea.academy.dtos.CourseDto;
import com.ennea.academy.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByInstructorId(Long instructorId);

    // for searching
    List<Course> findByTitleContainingIgnoreCase(String keyword);

    @Query("SELECT new com.ennea.academy.dtos.CourseDto(c.id, c.title, c.description, c.price, c.instructor.id) FROM Course c")
    List<CourseDto> findAllCourseOnly();

    @Query("SELECT new com.ennea.academy.dtos.CourseDto(c.id, c.title, c.description, c.price, c.instructor.id) FROM Course c WHERE c.instructor.id = :instructorId")
    List<CourseDto> findByInstructorIdCourseOnly(@Param("instructorId") Long instructorId);

    @Query("SELECT new com.ennea.academy.dtos.CourseDto(c.id, c.title, c.description, c.price, c.instructor.id) FROM Course c WHERE c.id = :courseId")
    Optional<CourseDto> findByCourseIdCourseOnly(@Param("courseId") Long courseId);

    @Query("SELECT new com.ennea.academy.dtos.CourseDto(c.id, c.title, c.description, c.price, c.instructor.id) FROM Course c WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<CourseDto> findByTitleContainingIgnoreCaseCourseOnly(@Param("keyword") String keyword);


}
