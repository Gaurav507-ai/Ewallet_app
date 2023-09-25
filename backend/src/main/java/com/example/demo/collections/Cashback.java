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
@Document(collection = "Cashbacks")
public class Cashback {
    @Id
    private String id;
    private String userId;
    private Double amount;
    private String description;
    private LocalDate date;
}
