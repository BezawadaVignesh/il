package com.ennea.academy.controllers;


import com.ennea.academy.dtos.CourseDto;
import com.ennea.academy.entities.Course;
import com.ennea.academy.entities.CourseContent;
import com.ennea.academy.entities.User;
import com.ennea.academy.repositories.CourseRepository;
import com.ennea.academy.services.CourseService;
import com.ennea.academy.services.EnrollmentService;
import com.ennea.academy.services.VideoStreamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/course")
public class CourseController {
    @Autowired
    private CourseService courseService;
    @Autowired
    private VideoStreamService videoStreamService;

    @Autowired
    private EnrollmentService enrollmentService;


    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> getCourse(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getByCourseIdCourseOnly(id));
    }

    @GetMapping("/all")
    public List<CourseDto> getAllCoursesOnly() {
        return courseService.getAllCoursesOnly();
    }

    @GetMapping("/search")
    public List<CourseDto> searchAllCoursesOnly(@RequestParam(name = "keyword") String keyword) {
        return courseService.findByTitleContainingIgnoreCaseCourseOnly(keyword);
    }

    @GetMapping("/instructor/{instructorId}")
    public List<CourseDto> searchAllCoursesOnly(@PathVariable Long instructorId) {
        return courseService.getByInstructorIdCoursesOnly(instructorId);
    }

    @GetMapping("/content/{courseId}")
    public ResponseEntity<?> getCourseContent(Authentication user, @PathVariable Long courseId) {
        User currentUser = (User) user.getPrincipal();
        var enrollment = enrollmentService.getEnrollmentByUserIdAndCourseId(currentUser.getId(), courseId);
        if(enrollment == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view this content");
        }
        return ResponseEntity.ok(courseService.getCourseContentsTableOnly(courseId));
    }

    @GetMapping("content/stream/{contentId}")
    public ResponseEntity<ResourceRegion> streamContent(@PathVariable Long contentId,
                                                        @RequestHeader HttpHeaders headers) throws IOException {

        CourseContent courseContent = courseService.getCourseContentByCourseContentId(contentId);
//        if(!enrollmentService.hasUserEnrolledToCourse(((User) user.getPrincipal()).getId(), courseContent.getCourse().getId())) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view this content");
//        }

        return videoStreamService.streamVideo(courseContent.getContentUrl(), headers);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createCourse(Authentication user, @RequestBody @Valid CourseDto data) {
        Course savedCourse = courseService.createCourse(data.instructorId(), data.title(), data.desc(), data.price());

        var uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/api/v1/course/{id}")
                .build(savedCourse.getId());
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/register/{courseId}")
    public ResponseEntity<?> enrollToCourse(Authentication user, @PathVariable Long courseId) {
        enrollmentService.enrollUserToCourse((User) user.getPrincipal(), courseService.getCourseById(courseId));
        return ResponseEntity.ok("Added successfully");
    }

    @PostMapping("/content/{courseId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> addCourseContent(Authentication user, @PathVariable Long courseId,
                                                 @RequestParam String title,
                                                 @RequestParam MultipartFile file) throws IOException {
        User currentUser = (User) user.getPrincipal();
        Course course = courseService.getCourseById(courseId);
        if (course.getInstructor().getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You don't not own this course");
        }

        CourseContent savedCourseContent = courseService.addVideoContent(course, title, file);

        var uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("stream/{fileUrl}")
                .build(savedCourseContent.getContentUrl());
        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping("/{id}")
    void deleteCourse(@PathVariable Long id) {
        courseService.deleteByCourseId(id);
    }

}
