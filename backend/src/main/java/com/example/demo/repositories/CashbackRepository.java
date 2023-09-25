package com.example.demo.repositories;

import com.example.demo.collections.Cashback;
import com.example.demo.collections.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CashbackRepository extends MongoRepository<Cashback, String> {
    List<Cashback> findByUserId(String userId);
}
