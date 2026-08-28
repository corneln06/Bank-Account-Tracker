package com.example.tracker.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@Getter
@Setter
public class Transaction
{
 @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private String tinkTransactionId;
 private String description;
 private BigDecimal amount;
 private String currency;
 private LocalDate date;
 private String category;
}
