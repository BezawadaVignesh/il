package com.ennea.academy.controllers;

import com.ennea.academy.controllers.CourseController;
import com.ennea.academy.dtos.CourseDto;
import com.ennea.academy.entities.Course;
import com.ennea.academy.entities.CourseContent;
import com.ennea.academy.entities.Enrollment;
import com.ennea.academy.entities.User;
import com.ennea.academy.services.CourseService;
import com.ennea.academy.services.EnrollmentService;
import com.ennea.academy.services.VideoStreamService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;


import java.io.IOException;
import java.net.URI;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CourseControllerTest {

    @Mock
    private CourseService courseService;

    @Mock
    private EnrollmentService enrollmentService;

    @Mock
    private VideoStreamService videoStreamService;

    @InjectMocks
    private CourseController courseController;

    private User testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        testUser = new User();

        var auth = new UsernamePasswordAuthenticationToken(testUser, null, Collections.emptyList());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @Test
    void testGetCourseContent_Authorized() {
        Enrollment enrollment = new Enrollment();
        when(enrollmentService.getEnrollmentByUserIdAndCourseId(testUser.getId(), 1L)).thenReturn(enrollment);
        when(courseService.getCourseContents(1L)).thenReturn(Collections.emptyList());

        ResponseEntity<?> response = courseController.getCourseContent(
                SecurityContextHolder.getContext().getAuthentication(), 1L);

        assertEquals(ResponseEntity.ok(Collections.emptyList()), response);
    }

    @Test
    void testGetCourseContent_Unauthorized() {
        when(enrollmentService.getEnrollmentByUserIdAndCourseId(testUser.getId(), 1L)).thenReturn(null);

        ResponseEntity<?> response = courseController.getCourseContent(
                SecurityContextHolder.getContext().getAuthentication(), 1L);

        assertEquals(ResponseEntity.status(403).body("You are not authorized to view this content"), response);
    }

    @Test
    void testStreamContent() throws IOException {
        CourseContent courseContent = new CourseContent();
        courseContent.setContentUrl("sample-url");

        HttpHeaders headers = new HttpHeaders();
        ResourceRegion region = new ResourceRegion(mock(Resource.class), 0, 1000);
        when(courseService.getCourseContentByCourseContentId(1L)).thenReturn(courseContent);
        when(videoStreamService.streamVideo("sample-url", headers)).thenReturn(ResponseEntity.ok(region));

        ResponseEntity<ResourceRegion> response = courseController.streamContent(1L, headers);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(region, response.getBody());
    }

    @Test
    void testEnrollToCourse() {
        Course course = new Course();
        course.setId(1L);

        when(courseService.getCourseById(1L)).thenReturn(course);

        ResponseEntity<?> response = courseController.enrollToCourse(
                SecurityContextHolder.getContext().getAuthentication(), 1L);

        assertEquals(ResponseEntity.ok("Added successfully"), response);
    }
}
