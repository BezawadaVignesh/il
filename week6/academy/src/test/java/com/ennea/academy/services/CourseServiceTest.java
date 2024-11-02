package com.ennea.academy.services;

import com.ennea.academy.dtos.CourseDto;
import com.ennea.academy.entities.Course;
import com.ennea.academy.entities.Instructor;
import com.ennea.academy.exceptions.CourseNotFoundException;
import com.ennea.academy.repositories.CourseContentRepository;
import com.ennea.academy.repositories.CourseRepository;
import com.ennea.academy.repositories.InstructorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private InstructorRepository instructorRepository;

    @Mock
    private CourseContentRepository courseContentRepository;


    @InjectMocks
    private CourseService courseService;

    private Instructor instructor;
    private Course course;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        instructor = new Instructor();
        instructor.setId(69L);

        course = new Course();
        course.setId(69L);
        course.setTitle("Sample Course");
        course.setInstructor(instructor);
    }

    @Test
    void testCreateCourse_Success() {
        when(instructorRepository.findById(1L)).thenReturn(Optional.of(instructor));
        when(courseRepository.save(any(Course.class))).thenReturn(course);

        Course createdCourse = courseService.createCourse(1L, "Sample Course", "Description", 100.0);

        assertNotNull(createdCourse);
        assertEquals("Sample Course", createdCourse.getTitle());
        verify(courseRepository).save(any(Course.class));
    }

    @Test
    void testCreateCourse_InstructorNotFound() {
        when(instructorRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> courseService.createCourse(1L, "Sample Course", "Description", 100.0));
        assertEquals("Instructor not found with id: 1", exception.getMessage());
    }

    @Test
    void testGetAllCourses() {
        when(courseRepository.findAll()).thenReturn(List.of(course));

        List<Course> courses = courseService.getAllCourses();

        assertNotNull(courses);
        assertEquals(1, courses.size());
        verify(courseRepository).findAll();
    }

    @Test
    void testGetAllCoursesOnly() {
        CourseDto courseDto = new CourseDto(69L, "Sample Course", "desc", 6969, 1L);
        when(courseRepository.findAllCourseOnly()).thenReturn(List.of(courseDto));

        List<CourseDto> coursesDtos = courseService.getAllCoursesOnly();

        assertNotNull(coursesDtos);
        assertEquals(1, coursesDtos.size());
        assertEquals(courseDto, coursesDtos.get(0));
        verify(courseRepository).findAllCourseOnly();
    }

    @Test
    public void testingGetByCourseIdCourseOnly_ValidAndInvalidId() {
        CourseDto courseDto = new CourseDto(69L, "Sample Course", "desc", 6969, 1L);

        Mockito.when(courseRepository.findByCourseIdCourseOnly(69L)).thenReturn(Optional.of(courseDto));

        CourseDto resultCourse = courseService.getByCourseIdCourseOnly(69L);

        assertEquals(69L, resultCourse.id());
        assertEquals("Sample Course", resultCourse.title());

        Mockito.when(courseRepository.findByCourseIdCourseOnly(Mockito.anyLong())).thenReturn(Optional.empty());
        Exception exception = assertThrows(CourseNotFoundException.class, () -> {
            courseService.getByCourseIdCourseOnly(69L);
        });

        assertEquals("Course not found", exception.getMessage());
    }


    @Test
    public void testingGetCourseById_ValidAndInvalidCourseId() {
        // Valid courseId
        Mockito.when(courseRepository.findById(69L)).thenReturn(Optional.of(course));

        Course resultCourse = courseService.getCourseById(69L);

        assertEquals(69L, resultCourse.getId());
        assertEquals("Sample Course", resultCourse.getTitle());

        // Invalid courseId
        Mockito.when(courseRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        Exception exception = assertThrows(CourseNotFoundException.class, () -> {
            courseService.getCourseById(69L);
        });

        assertEquals("Course not found", exception.getMessage());
    }

//    @Test
//    void testAddVideoContent() throws IOException {
//        // Arrange
//        String fileName = "sample.mp4";
//        when(file.getOriginalFilename()).thenReturn(fileName);
//        when(courseContentRepository.save(any(CourseContent.class))).thenAnswer(invocation -> invocation.getArgument(0));
//
//        // Mock file transfer and directory creation
//        Path mockPath = Paths.get("uploads/videos/" + UUID.randomUUID() + "_" + fileName);
//        doNothing().when(file).transferTo(mockPath.toFile());
//        Files.createDirectories(mockPath.getParent());
//
//        // Act
//        CourseContent content = courseService.addVideoContent(course, "Video Title", file);
//
//        // Assert
//        assertNotNull(content);
//        assertEquals(ContentType.VIDEO, content.getType());
//        assertEquals("Video Title", content.getTitle());
//        verify(courseContentRepository, times(1)).save(any(CourseContent.class));
//    }

    @Test
    void testDeleteByCourseId_CourseExists() {
        when(courseRepository.findById(1L)).thenReturn(Optional.of(course));

        courseService.deleteByCourseId(1L);

        verify(courseRepository).delete(course);
    }

    @Test
    void testDeleteByCourseId_CourseNotFound() {
        when(courseRepository.findById(1L)).thenReturn(Optional.empty());

        CourseNotFoundException exception = assertThrows(CourseNotFoundException.class, () -> courseService.deleteByCourseId(1L));
        assertEquals("Course not found", exception.getMessage());
    }
}