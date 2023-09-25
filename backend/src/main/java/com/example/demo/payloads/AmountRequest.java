package com.example.demo.payloads;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AmountRequest {
    private String email;
    private Double amount;
}
