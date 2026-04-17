package com.jajnaseni.myproject.service;
import com.jajnaseni.myproject.model.User;
import com.jajnaseni.myproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

    @Service
    public class userService {

        @Autowired
        private UserRepository userRepository;

        // ── Register a new user (works for both Requester & Writer) ──
        public String registerUser(User user) {

            // Check if college ID already exists
            if (userRepository.existsByCollegeId(user.getCollegeId())) {
                return "College ID already registered!";
            }

            // Check if email already exists
            if (userRepository.existsByEmail(user.getEmail())) {
                return "Email already registered!";
            }

            userRepository.save(user);
            return "User registered successfully!";
        }

        // ── Get user by college ID ──
        public User getUserById(String collegeId) {
            return userRepository.findByCollegeId(collegeId);
        }

        // ── Get user by email (for login later) ──
        public User getUserByEmail(String email) {
            return userRepository.findByEmail(email);
        }

        // ── Get all users ──
        public java.util.List<User> getAllUsers() {
            return userRepository.findAll();
        }
    }

