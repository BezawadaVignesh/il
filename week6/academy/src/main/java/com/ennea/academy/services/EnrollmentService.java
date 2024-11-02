package com.ennea.academy.services;

import com.ennea.academy.entities.Course;
import com.ennea.academy.entities.Enrollment;
import com.ennea.academy.entities.User;
import com.ennea.academy.repositories.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public void enrollUserToCourse(User user, Course course) {
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);

        enrollmentRepository.save(enrollment);
    }

    public Enrollment getEnrollmentByUserIdAndCourseId(Long userId, Long courseId) {
        return enrollmentRepository.findOneByUserIdAndCourseId(userId, courseId);
    }

    public boolean hasUserEnrolledToCourse(Long userId, Long courseId) {
        return getEnrollmentByUserIdAndCourseId(userId, courseId) != null;
    }

}
