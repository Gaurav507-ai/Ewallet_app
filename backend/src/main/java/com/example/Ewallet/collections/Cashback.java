package com.example.Ewallet.collections;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "cashbacks")
public class Cashback {
    @Id
    private String id;
    private String userId;
    private Double amount;
    private String description;
    private LocalDate date;
}
