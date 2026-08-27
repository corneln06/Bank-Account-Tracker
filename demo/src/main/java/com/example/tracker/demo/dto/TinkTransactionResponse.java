package com.example.tracker.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class TinkTransactionResponse
{
  private List<TinkTransaction> transactions;
  private String nextPageToken;
}
