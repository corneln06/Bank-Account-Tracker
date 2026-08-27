package com.example.tracker.demo.tink;

import com.example.tracker.demo.dto.TinkTokenResponse;
import com.example.tracker.demo.dto.TinkTransactionResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TinkController
{
  private final TinkService tinkService;

  public TinkController(TinkService tinkService)
  {
    this.tinkService = tinkService;
  }

  @GetMapping("/callback")
  public String handleCallBack(@RequestParam("code") String code) {
    TinkTokenResponse tokenResponse = tinkService.exchangeCodeForToken(code);
    TinkTransactionResponse transactionsResponse = tinkService.getTransactions(tokenResponse.getAccess_token());

    System.out.println("First transaction: " + transactionsResponse.getTransactions().get(0).getDescriptions().getDisplay());

    return "Fetched " + transactionsResponse.getTransactions().size() + " transactions";
  }
}
