package com.ennea.academy.services;

import com.ennea.academy.dtos.SignUpDto;
import com.ennea.academy.entities.User;
import com.ennea.academy.exceptions.InvalidJwtException;
import com.ennea.academy.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        var user = repository.findByLogin(username);
        if(user == null) throw new BadCredentialsException("Invalid credentials");
        return user;
    }

    public User findUserByUsernameOrEmail(String login) {
        if (login.contains("@")) {
            // Assume login is an email
            return repository.findByEmail(login);
        }
        // Assume login is a username
        return repository.findByLogin(login);
    }

    public UserDetails signUp(SignUpDto data) throws InvalidJwtException {
        if (repository.findByLogin(data.login()) != null) {
            throw new InvalidJwtException("Username already exists");
        }
        if (repository.findByEmail(data.email()) != null) {
            throw new InvalidJwtException("Email already exists");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

        User newUser = new User(data.login(), data.email(), encryptedPassword, data.role());
        return repository.save(newUser);
    }
}
