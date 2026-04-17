package com.jajnaseni.myproject.repository;

import com.jajnaseni.myproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

    @Repository
    public interface UserRepository extends JpaRepository<User, String> {

        // Find a user by email (useful for login)
        User findByEmail(String email);

        // Find a user by collegeId
        User findByCollegeId(String collegeId);

        // Check if email already registered (useful for signup)
        boolean existsByEmail(String email);

        // Check if collegeId already registered
        boolean existsByCollegeId(String collegeId);

    }

