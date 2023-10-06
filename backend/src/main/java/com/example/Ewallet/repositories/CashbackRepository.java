package com.example.Ewallet.repositories;

import com.example.Ewallet.collections.Cashback;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CashbackRepository extends MongoRepository<Cashback, String> {
    List<Cashback> findByUserId(String userId);
}
