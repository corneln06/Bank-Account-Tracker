package com.example.tracker.demo.controllers;

import com.example.tracker.demo.model.Transaction;
import com.example.tracker.demo.repository.TransactionRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TransactionController
{
  private final TransactionRepository transactionRepository;
  public TransactionController(TransactionRepository transactionRepository){
    this.transactionRepository = transactionRepository;
  }
  @GetMapping("/transactions")
  public List<Transaction> getTransactions(){
    List<Transaction> transactions = transactionRepository.findAll();

    return transactions;
  }
}
