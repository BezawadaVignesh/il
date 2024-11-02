package com.ennea.academy.services;

import com.ennea.academy.dtos.CourseContentDto;
import com.ennea.academy.dtos.CourseDto;
import com.ennea.academy.entities.Course;
import com.ennea.academy.entities.CourseContent;
import com.ennea.academy.entities.Instructor;
import com.ennea.academy.enums.ContentType;
import com.ennea.academy.exceptions.CourseNotFoundException;
import com.ennea.academy.repositories.CourseContentRepository;
import com.ennea.academy.repositories.CourseRepository;
import com.ennea.academy.repositories.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private CourseContentRepository courseContentRepository;

    public Course createCourse(Long instructorId, String title, String desc, double price) {
        Instructor instructor = instructorRepository.findById(instructorId).orElseThrow(() -> new RuntimeException("Instructor not found with id: " + instructorId));
        Course course = new Course();
        course.setInstructor(instructor);
        course.setTitle(title);
        course.setDescription(desc);
        course.setPrice(price);

        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Returns course object without joining instructor and user tables
    public List<CourseDto> getAllCoursesOnly() {
        return courseRepository.findAllCourseOnly();
    }

    public List<CourseDto> getByInstructorIdCoursesOnly(Long instructorId) {
        return courseRepository.findByInstructorIdCourseOnly(instructorId);
    }

    public List<CourseDto> findByTitleContainingIgnoreCaseCourseOnly(String keyword) {
        return courseRepository.findByTitleContainingIgnoreCaseCourseOnly(keyword);
    }

    public CourseDto getByCourseIdCourseOnly(Long courseId) {
        return courseRepository.findByCourseIdCourseOnly(courseId).orElseThrow(() -> new CourseNotFoundException("Course not found"));
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElseThrow(() -> new CourseNotFoundException("Course not found"));
    }

    public void deleteByCourseId(Long id) {
        var course = getCourseById(id);
        courseRepository.delete(course);
    }

    public List<CourseContentDto> getCourseContentsTableOnly(Long courseId) {
        return courseContentRepository.findByCourseIdTableOnly(courseId);
    }

    public List<CourseContent> getCourseContents(Long courseId) {
        return courseContentRepository.findByCourseId(courseId);
    }

    public CourseContent getCourseContentByCourseContentId(Long courseContentId) {
        return courseContentRepository.findById(courseContentId).orElseThrow(() -> new RuntimeException(("Course content not found")));
    }

    private final String uploadDir = "/uploads/videos";
    public CourseContent addVideoContent(Course course, String title, MultipartFile file) throws IOException {

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        String fileUrl = uploadDir + "/" + fileName;
        Path filePath = Paths.get(Paths.get("").toAbsolutePath() + fileUrl);

        Files.createDirectories(filePath.getParent());
        file.transferTo(filePath.toFile());

        CourseContent courseContent = new CourseContent();
        courseContent.setCourse(course);
        courseContent.setTitle(title);
        courseContent.setType(ContentType.VIDEO);
        courseContent.setContentUrl(fileUrl);

        return courseContentRepository.save(courseContent);

    }
}
