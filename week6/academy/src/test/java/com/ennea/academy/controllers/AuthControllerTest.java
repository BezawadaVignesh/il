package com.ennea.academy.controllers;

import com.ennea.academy.config.auth.TokenProvider;
import com.ennea.academy.dtos.JwtDto;
import com.ennea.academy.entities.User;
import com.ennea.academy.dtos.SignInDto;
import com.ennea.academy.dtos.SignUpDto;
import com.ennea.academy.enums.UserRole;
import com.ennea.academy.services.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AuthControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private AuthService authService;

    @Mock
    private TokenProvider tokenProvider;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testingSignUp() {
        SignUpDto signUpDto = new SignUpDto("testUser", "password", "email@example.com", UserRole.USER);

        ResponseEntity<?> response = authController.signUp(signUpDto);

        verify(authService).signUp(signUpDto);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Test
    void testingSignIn_Success() {
        SignInDto signInDto = new SignInDto("testUser", "password");
        User user = new User();

        when(authService.findUserByUsernameOrEmail(signInDto.login())).thenReturn(user);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken(user, signInDto.password(), user.getAuthorities()));
        when(tokenProvider.generateAccessToken(any(User.class))).thenReturn("testAccessToken");

        ResponseEntity<?> response = authController.signIn(signInDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("testAccessToken", ((JwtDto) response.getBody()).accessToken());
    }

    @Test
    void testingSignIn_UserNotFound() {
        SignInDto signInDto = new SignInDto("unknownUser", "password");

        when(authService.findUserByUsernameOrEmail(signInDto.login())).thenReturn(null);

        ResponseEntity<?> response = authController.signIn(signInDto);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Invalid username or password", response.getBody());
    }

    @Test
    void testingSignIn_BadCredentials() {
        SignInDto signInDto = new SignInDto("testUser", "wrongPassword");
        User user = new User();

        when(authService.findUserByUsernameOrEmail(signInDto.login())).thenReturn(user);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        ResponseEntity<?> response = authController.signIn(signInDto);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Invalid username or password", response.getBody());
    }

    @Test
    void testingSignIn_AuthenticationFailure() {
        SignInDto signInDto = new SignInDto("testUser", "password");
        User user = new User();

        when(authService.findUserByUsernameOrEmail(signInDto.login())).thenReturn(user);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new RuntimeException("Authentication failure"));

        ResponseEntity<?> response = authController.signIn(signInDto);

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        assertEquals("Authentication failed", response.getBody());
    }
}

