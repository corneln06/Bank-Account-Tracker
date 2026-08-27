package com.example.tracker.demo.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
public class TinkTokenResponse
{
private String token_type;
private int expires_in;
private String access_token;
private String scope;
}
