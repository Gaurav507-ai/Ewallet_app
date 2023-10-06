package com.example.Ewallet.repositories;

import com.example.Ewallet.collections.Cashback;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
class CashbackRepositoryTest {

    @Autowired
    private CashbackRepository cashbackRepository;

    @BeforeEach
    public void setUp(){
        Cashback cashback1 = new Cashback();
        cashback1.setUserId("userId1");
        cashback1.setId("1");
        cashback1.setAmount(100.0);

        Cashback cashback2 = new Cashback();
        cashback2.setUserId("userId1");
        cashback2.setId("2");
        cashback2.setAmount(50.0);

        Cashback cashback3 = new Cashback();
        cashback3.setUserId("userId2");
        cashback3.setId("3");
        cashback3.setAmount(60.0);
        cashbackRepository.saveAll(List.of(cashback1,cashback2, cashback3));
    }

    @Test
    void findByUserId() {
        List<Cashback> user1Cashbacks = cashbackRepository.findByUserId("userId1");
        List<Cashback> user2Cashbacks = cashbackRepository.findByUserId("userId2");

        assertEquals(2, user1Cashbacks.size());
        assertEquals(1, user2Cashbacks.size());
    }
}