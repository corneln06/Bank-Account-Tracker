package com.example.tracker.demo.repository;

import com.example.tracker.demo.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface TransactionRepository extends JpaRepository<Transaction, Long>
{
  boolean existsByDescriptionAndDateAndAmount(String description, LocalDate date, BigDecimal amount);
}

