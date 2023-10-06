package com.example.Ewallet.repositories;

import com.example.Ewallet.collections.PendingUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PendingUserRepository extends MongoRepository<PendingUser, String> {
    public PendingUser findByToken(String code);

    boolean existsByToken(String token);
}
