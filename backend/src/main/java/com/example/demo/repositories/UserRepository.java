package com.example.demo.repositories;

import com.example.demo.collections.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;


public interface UserRepository extends MongoRepository<User, String> {

    public Optional<User> findByEmail(String email);
    public User findByVerificationCode(String code);
}


