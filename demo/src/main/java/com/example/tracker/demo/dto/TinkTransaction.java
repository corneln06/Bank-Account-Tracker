package com.example.tracker.demo.dto;

import lombok.Getter;

@Getter
public class TinkTransaction
{
  private String id;
  private String accountId;
  private TinkAmount amount;
  private TinkDescriptions descriptions;
  private TinkDates dates;
  private String status;
}
