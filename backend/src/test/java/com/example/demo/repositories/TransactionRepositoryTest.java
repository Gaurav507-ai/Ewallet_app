package com.example.demo.repositories;

import com.example.demo.collections.Transaction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
@AutoConfigureMockMvc
@DirtiesContext
class TransactionRepositoryTest {

    @Autowired
    private TransactionRepository transactionRepository;

    @BeforeEach
    public void seuUp(){
        Transaction transaction1 = new Transaction();
        transaction1.setUserId("uid1");
        transaction1.setId("1");
        transaction1.setDescription("Description 1");

        Transaction transaction2 = new Transaction();
        transaction2.setUserId("uid2");
        transaction2.setId("2");
        transaction2.setDescription("Description 2");

        Transaction transaction3 = new Transaction();
        transaction3.setUserId("uid1");
        transaction3.setId("3");
        transaction3.setDescription("Description 3");

        transactionRepository.saveAll(List.of(transaction1, transaction2, transaction3));
    }

    @Test
    void findByUserId() {
        List<Transaction> user1Transactions = transactionRepository.findByUserId("uid1");
        List<Transaction> user2Transactions = transactionRepository.findByUserId("uid2");
        assertEquals(user1Transactions.size(), 2);
        assertEquals(user2Transactions.size(), 1);
    }
}