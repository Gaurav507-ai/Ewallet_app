package com.example.demo.repositories;

import com.example.demo.collections.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
@AutoConfigureMockMvc
@DirtiesContext
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setUp(){
        User user1 = new User();
        user1.setUserId("1");
        user1.setName("Test User 1");
        user1.setEmail("testuser1@gmail.com");
        user1.setVerificationCode("verificationCode1");

        User user2 = new User();
        user2.setUserId("2");
        user2.setName("Test User 2");
        user2.setEmail("testuser2@gmail.com");
        user2.setVerificationCode("verificationCode2");

        userRepository.saveAll(List.of(user1, user2));
    }

    @Test
    void findByEmail() {
        Optional<User> userOptional = userRepository.findByEmail("testuser1@gmail.com");
        User user = userOptional.get();
        assertEquals("Test User 1", user.getName());
    }

    @Test
    void findByVerificationCode() {
        User user = userRepository.findByVerificationCode("verificationCode1");
        assertEquals("testuser1@gmail.com", user.getEmail());
    }
}