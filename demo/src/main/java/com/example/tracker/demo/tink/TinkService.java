package com.example.tracker.demo.tink;

import com.example.tracker.demo.dto.TinkTokenResponse;
import com.example.tracker.demo.dto.TinkTransaction;
import com.example.tracker.demo.dto.TinkTransactionResponse;
import com.example.tracker.demo.model.Transaction;
import com.example.tracker.demo.repository.TransactionRepository;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.ApiVersionInserter;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Map;

@Service
public class TinkService
{
  private final TinkProperties tinkProperties;
  private static final String TOKEN_URL = "https://api.tink.com/api/v1/oauth/token";
  private static final String TRANSACTION_URL = "https://api.tink.com/data/v2/transactions";
  private final TransactionRepository transactionRepository;

  public TinkService(TinkProperties tinkProperties,
      TransactionRepository transactionRepository){
    this.tinkProperties = tinkProperties;
    this.transactionRepository = transactionRepository;
  }
  public TinkTokenResponse exchangeCodeForToken(String code){

    System.out.println("CLIENT ID: [" + tinkProperties.getClientId() + "]");
    System.out.println("CLIENT SECRET: [" + tinkProperties.getClientSecret() + "]");

    MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
    body.add("code", code);
    body.add("client_id", tinkProperties.getClientId());
    body.add("client_secret", tinkProperties.getClientSecret());
    body.add("grant_type", "authorization_code");

    RestClient restClient = RestClient.create();

    TinkTokenResponse response = restClient.post()
        .uri(TOKEN_URL)
        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
        .body(body)
        .retrieve()
        .body(TinkTokenResponse.class);
    return response;
  }
  public TinkTransactionResponse getTransactions(String accessToken){


    RestClient restClient = RestClient.create();


     TinkTransactionResponse response = restClient.get()
        .uri(TRANSACTION_URL)
        .header("Authorization", "Bearer " + accessToken )
        .retrieve()
        .body(TinkTransactionResponse.class);

    return response;
  }
  public Transaction mapToTransaction(TinkTransaction tinkTransaction){
    Transaction transaction = new Transaction();

    transaction.setTinkTransactionId(tinkTransaction.getId());
    transaction.setDescription(tinkTransaction.getDescriptions().getDisplay());
    transaction.setDate(tinkTransaction.getDates().getBooked());
    transaction.setCurrency(tinkTransaction.getAmount().getCurrencyCode());

    BigDecimal amount = new BigDecimal(
        new BigInteger(tinkTransaction.getAmount().getValue().getUnscaledValue()),
        Integer.parseInt(tinkTransaction.getAmount().getValue().getScale())
    );
    transaction.setAmount(amount);

    return transaction;
  }
  public void saveTransactions(TinkTransactionResponse transactionResponse){
    for (TinkTransaction tinkTransaction : transactionResponse.getTransactions()) {
      Transaction transaction = mapToTransaction(tinkTransaction);

      boolean alreadyExists = transactionRepository.existsByDescriptionAndDateAndAmount(
          transaction.getDescription(),
          transaction.getDate(),
          transaction.getAmount()
      );

      if (!alreadyExists) {
        transactionRepository.save(transaction);
      }
    }
  }
  public void getTransactions(TinkTransactionResponse transactionResponse){
    for (TinkTransaction transaction : transactionResponse.getTransactions()){
      
      transactionRepository.findAll();
    }
  }
}
