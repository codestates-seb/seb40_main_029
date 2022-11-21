package com.codestates.mainproject.auth.jwt;

import com.codestates.mainproject.auth.TokenResponse;
import com.codestates.mainproject.auth.redis.RedisDao;
import com.codestates.mainproject.member.dto.MemberResponseDto;
import com.codestates.mainproject.member.entity.Member;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.util.*;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final RedisDao redisDao;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public String encodeBase64SecretKey(String secretKey) {
        return Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    public TokenResponse createTokensByLogin(Member member) throws JsonProcessingException {

        String atk = delegateAccessToken(member);
        String rtk = delegateRefreshToken(member);
        redisDao.setValues(member.getEmail(), rtk, Duration.ofMinutes((long) refreshTokenExpirationMinutes));
        return new TokenResponse(atk, rtk, "bearer");
    }


    public String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("memberId", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = getTokenExpiration(accessTokenExpirationMinutes);
        String base64EncodedSecretKey = encodeBase64SecretKey(secretKey);

        return generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    public String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = getTokenExpiration(refreshTokenExpirationMinutes);
        String base64EncodedSecretKey = encodeBase64SecretKey(secretKey);

        return generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {


        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, base64EncodedSecretKey)
                .compact();
    }

    public String generateRefreshToken(String subject,
                                       Date expiration,
                                       String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, base64EncodedSecretKey)
                .compact();
    }

    public String getSubject(String jws) {
        Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey(secretKey));

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws)
                .getBody()
                .getSubject();

    }

    public Jws<Claims> getClaims(String jws) {
        Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey(secretKey));

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);

        return claims;
    }

//    public TokenResponseDto reissueAtk(MemberResponseDto memberResponseDto) throws JwtException {
//        String rtkInRedis = redisDao.getValues(memberResponseDto.getEmail());
//        if (Objects.isNull(rtkInRedis)) {
//            throw new JwtException("인증 정보가 만료되었습니다.");
//        }
//
//        String atk = delegateAccessToken(memberResponseDto);
//        return new TokenResponseDto(atk, null);
//    }

    public void deleteRtk(MemberResponseDto memberResponseDto) throws JwtException {
        redisDao.deleteValues(memberResponseDto.getEmail());
    }

    public void setBlackListAtk(String bearerAtk) {
        String atk = bearerAtk.substring(7);
        long expiration = getClaims(atk).getBody().getExpiration().getTime();
        long now = Calendar.getInstance().getTime().getTime();

        redisDao.setValues(atk, "logout", Duration.ofMillis(expiration-now));
    }

    public boolean isBlackList(String atk) {
        return StringUtils.hasText(redisDao.getValues(atk));
    }
}
