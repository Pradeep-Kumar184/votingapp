# Voting Application

This is a backend application for a voting system where users can vote for candidates. It provides functionalities for user authentication, candidate management, and voting.

## Features

- User sign up and login with Aadhar Card Number and password
- User can view the list of candidates
- User can vote for a candidate (only once)
- Admin can manage candidates (add, update, delete)
- Admin cannot vote

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Pradeep-Kumar184/votingapp.git


# API Endpoints

## Authentication

### Sign Up
- `POST /api/v1/auth/register`: Sign up a user

### Login
- `POST /api/v1/auth/login`: Login a user

## Candidates

### Get Candidates
- `GET /api/v1/auth/candidate/getAll`: Get the list of candidates

### Add Candidate
- `POST /api/v1/auth/candidate/createCandidate`: Add a new candidate (Admin only)

### Update Candidate
- `PUT /api/v1/auth/candidate/updateCandidate/:id`: Update a candidate by ID (Admin only)

### Delete Candidate
- `DELETE /api/v1/auth/candidate/deleteCandidate/:id`: Delete a candidate by ID (Admin only)

## Voting

### Get Vote Count
- `GET /api/v1/auth/candidate/voteCount`: Get the count of votes for each candidate

### Vote for Candidate
- `POST /api/v1/auth/candidate/vote/:candidateId`: Vote for a candidate (User only)

## User Profile

### Get Profile
- `GET /api/v1/auth/getProfile/:id`: Get user profile information
  
### Update Profile
- `PUT /api/v1/auth/update-profile/:id`: Update user profile information

### Change Password
- `Post /api/v1/auth/forgot-password`: Change user password
