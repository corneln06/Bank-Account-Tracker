package com.example.tracker.demo.tink;

import com.example.tracker.demo.dto.TinkTokenResponse;
import com.example.tracker.demo.dto.TinkTransactionResponse;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.ApiVersionInserter;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class TinkService
{
  private final TinkProperties tinkProperties;
  private static final String TOKEN_URL = "https://api.tink.com/api/v1/oauth/token";
  private static final String TRANSACTION_URL = "https://api.tink.com/data/v2/transactions";

  public TinkService(TinkProperties tinkProperties){
    this.tinkProperties = tinkProperties;
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
}
