package com.ecommerce3d.backend.infra;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ecommerce3d.backend.models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

  @Value("${api.security.token.service}")
  private String secret;

  public String generateToken(User user){

    try {
      Algorithm algorithm = Algorithm.HMAC256(secret);
      String token = JWT.create()
              .withIssuer("ecommerce3d-api")
              .withSubject(user.getEmail())
              .withClaim("id", user.getId())
              .withExpiresAt(generateExpirationDate())
              .sign(algorithm);
      return token;
    }catch (JWTCreationException ex){
      throw new RuntimeException("Erro ao gerar a token ---> ", ex);
    }
  }

  public DecodedJWT validateToken(String token){
    try {
      Algorithm algorithm = Algorithm.HMAC256(secret);
      return JWT.require(algorithm)
              .withIssuer("ecommerce3d-api")
              .build()
              .verify(token);

    } catch (JWTVerificationException ex) {
      return null;
    }
  }

  private Instant generateExpirationDate(){
    return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
  }

}