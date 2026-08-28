package com.example.tracker.demo.repository;

import com.example.tracker.demo.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long>
{

}
