package com.ennea.academy.repositories;

import com.ennea.academy.entities.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;


public interface InstructorRepository extends JpaRepository<Instructor, Long> {
}
