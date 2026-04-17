package com.jajnaseni.myproject.controller;

import com.jajnaseni.myproject.model.User;
import com.jajnaseni.myproject.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private userService userService;

    // ── Register a new user (Requester or Writer) ──
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // ── Get user by college ID ──
    @GetMapping("/{collegeId}")
    public User getUserById(@PathVariable String collegeId) {
        return userService.getUserById(collegeId);
    }

    // ── Get all users ──
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}