package com.example.demo.collections;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "Transactions")
public class Transaction {
    @Id
    private String id;
    private String userId;
    private String type;
    private String name;
    private String description;
    private Double amount;
    private LocalDate date;
}
