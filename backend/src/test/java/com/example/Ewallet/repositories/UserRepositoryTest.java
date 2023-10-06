package com.example.Ewallet.repositories;

import com.example.Ewallet.collections.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setUp(){
        User user1 = new User();
        user1.setUserId("1");
        user1.setName("Test User 1");
        user1.setEmail("testuser1@gmail.com");

        User user2 = new User();
        user2.setUserId("2");
        user2.setName("Test User 2");
        user2.setEmail("testuser2@gmail.com");

        userRepository.saveAll(List.of(user1, user2));
    }

    @Test
    void findByEmail() {
        Optional<User> userOptional = userRepository.findByEmail("testuser1@gmail.com");
        User user = userOptional.get();
        assertEquals("Test User 1", user.getName());
    }
}