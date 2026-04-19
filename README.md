# AssignmentSides

A Spring Boot based assignment management platform for college students.

## Status
Under active development

## About
AssignmentSides connects Assignment Requesters (students who need assignments done)
with Assignment Writers (students who can complete assignments) within a college ecosystem.

## Tech Stack
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- REST API

## Project Structure
- model/ - User entity, Role enum
- repository/ - UserRepository (JPA)
- service/ - UserService (business logic)
- controller/ - UserController (REST endpoints)

## API Endpoints
- POST /api/users/register - Register a new user
- GET /api/users/{collegeId} - Get user by college ID
- GET /api/users/all - Get all users