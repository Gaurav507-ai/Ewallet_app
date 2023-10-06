package com.example.Ewallet.repositories;

import com.example.Ewallet.collections.PendingUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;


import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
class PendingUserRepositoryTest {

    @Autowired
    private PendingUserRepository pendingUserRepository;

    @BeforeEach
    public void setUp(){
        PendingUser pendingUser1 = new PendingUser();
        pendingUser1.setId("1234");
        pendingUser1.setToken("6789");
        pendingUser1.setEmail("gauravkundwani4@gmail.com");
        pendingUser1.setName("Gaurav");

        pendingUserRepository.save(pendingUser1);
    }

    @Test
    void findByToken() {
        PendingUser pendingUser = pendingUserRepository.findByToken("6789");
        assertEquals("Gaurav", pendingUser.getName());
    }
}