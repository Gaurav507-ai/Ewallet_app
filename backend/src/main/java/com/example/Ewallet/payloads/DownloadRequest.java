package com.example.Ewallet.payloads;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DownloadRequest {
    private String tid;
    private Double amount;
    private String description;
    private LocalDate date;
    private String type;
}
