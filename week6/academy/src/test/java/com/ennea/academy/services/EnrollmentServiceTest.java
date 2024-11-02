package com.ennea.academy.services;

import com.ennea.academy.entities.Course;
import com.ennea.academy.entities.Enrollment;
import com.ennea.academy.entities.User;
import com.ennea.academy.repositories.EnrollmentRepository;
import com.ennea.academy.services.EnrollmentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class EnrollmentServiceTest {

    @Mock
    private EnrollmentRepository enrollmentRepository;

    @InjectMocks
    private EnrollmentService enrollmentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testEnrollUserToCourse() {
        User user = new User();
        Course course = new Course();
        course.setId(1L);

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);

        when(enrollmentRepository.save(any(Enrollment.class))).thenReturn(enrollment);

        enrollmentService.enrollUserToCourse(user, course);

        verify(enrollmentRepository).save(any(Enrollment.class));
    }

    @Test
    void testGetEnrollmentByUserIdAndCourseId() {
        Long userId = 1L;
        Long courseId = 1L;
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(new User());
        enrollment.setCourse(new Course());

        when(enrollmentRepository.findOneByUserIdAndCourseId(userId, courseId)).thenReturn(enrollment);

        Enrollment foundEnrollment = enrollmentService.getEnrollmentByUserIdAndCourseId(userId, courseId);

        assertNotNull(foundEnrollment);
        verify(enrollmentRepository, times(1)).findOneByUserIdAndCourseId(userId, courseId);
    }

    @Test
    void testHasUserEnrolledToCourse_WhenEnrolled() {
        Long userId = 1L;
        Long courseId = 1L;

        Enrollment enrollment = new Enrollment();
        when(enrollmentRepository.findOneByUserIdAndCourseId(userId, courseId)).thenReturn(enrollment);

        boolean isEnrolled = enrollmentService.hasUserEnrolledToCourse(userId, courseId);

        assertTrue(isEnrolled);
    }

    @Test
    void testHasUserEnrolledToCourse_WhenNotEnrolled() {
        Long userId = 1L;
        Long courseId = 1L;

        when(enrollmentRepository.findOneByUserIdAndCourseId(userId, courseId)).thenReturn(null);

        boolean isEnrolled = enrollmentService.hasUserEnrolledToCourse(userId, courseId);

        assertFalse(isEnrolled);
    }
}

