package com.ennea.academy.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.ennea.academy.dtos.SignUpDto;
import com.ennea.academy.entities.User;
import com.ennea.academy.enums.UserRole;
import com.ennea.academy.exceptions.InvalidJwtException;
import com.ennea.academy.repositories.CourseRepository;
import com.ennea.academy.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.authentication.BadCredentialsException;

class AuthServiceTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private UserRepository repository;

    @InjectMocks
    private AuthService authService;

    private BCryptPasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        passwordEncoder = new BCryptPasswordEncoder();
    }

    @Test
    void testLoadUserByUsername_UserExists() {
        User mockUser = new User("testUser", "test@example.com", "password", UserRole.USER);
        when(repository.findByLogin("testUser")).thenReturn(mockUser);

        UserDetails userDetails = authService.loadUserByUsername("testUser");

        assertNotNull(userDetails);
        assertEquals("testUser", userDetails.getUsername());
    }

    @Test
    void testLoadUserByUsername_UserNotExists() {
        when(repository.findByLogin("nonExistentUser")).thenReturn(null);
        assertThrows(BadCredentialsException.class, () -> authService.loadUserByUsername("nonExistentUser"));
    }

    @Test
    void testFindUserByUsernameOrEmail_ByUsername() {
        authService.findUserByUsernameOrEmail("testUser");

        verify(repository).findByLogin("testUser");
    }

    @Test
    void testFindUserByUsernameOrEmail_ByEmail() {

        authService.findUserByUsernameOrEmail("test@example.com");
        verify(repository).findByEmail("test@example.com");
    }

    @Test
    void testSignUp_NewUser() {
        SignUpDto signUpData = new SignUpDto("newUser", "new@example.com", "newPassword", UserRole.USER);
        when(repository.findByLogin(signUpData.login())).thenReturn(null);
        when(repository.findByEmail(signUpData.email())).thenReturn(null);

        when(repository.save(any(User.class))).thenAnswer(new Answer<User>() {
            @Override
            public User answer(InvocationOnMock invocation) {
                return invocation.getArgument(0); // Return the same User object passed as a parameter
            }
        });

        UserDetails userDetails = authService.signUp(signUpData);

        assertNotNull(userDetails);
        assertEquals(signUpData.login(), userDetails.getUsername());
        assertTrue(passwordEncoder.matches(signUpData.password(), userDetails.getPassword()));
    }

    @Test
    void testSignUp_ExistingUsername() {
        SignUpDto signUpData = new SignUpDto("existingUser", "new@example.com", "password", UserRole.USER);
        when(repository.findByLogin(signUpData.login())).thenReturn(new User());

        assertThrows(InvalidJwtException.class, () -> authService.signUp(signUpData));
    }

    @Test
    void testSignUp_ExistingEmail() {
        SignUpDto signUpData = new SignUpDto("newUser", "existing@example.com", "password", UserRole.USER);
        when(repository.findByEmail(signUpData.email())).thenReturn(new User());

        assertThrows(InvalidJwtException.class, () -> authService.signUp(signUpData));
    }
}

