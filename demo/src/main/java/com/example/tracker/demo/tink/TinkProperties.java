package com.example.tracker.demo.tink;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
@ConfigurationProperties(prefix = "tink")
public class TinkProperties
{
 @Getter @Setter private String clientSecret;
 @Getter @Setter private String clientId;
 @Getter @Setter private String redirectUri;
}
