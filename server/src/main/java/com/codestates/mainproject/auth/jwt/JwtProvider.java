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
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtProvider {

    private final RedisDao redisDao;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
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

    public TokenResponse createTokensByLogin(Member member) throws Exception {

        String atk = "Bearer " + delegateAccessToken(member);
        String rtk = delegateRefreshToken(member);
        redisDao.setValues(member.getEmail(), rtk, Duration.ofMinutes((long) refreshTokenExpirationMinutes));
        return new TokenResponse(atk, rtk, "bearer");
    }


    public String delegateAccessToken(Member member) throws Exception {
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
    private final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
    private Key createKey() {
        // signiture에 대한 정보는 Byte array로 구성되어있습니다.
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(secretKey);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
        return signingKey;
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) throws Exception{

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(createKey(), signatureAlgorithm)
                .compact();
    }

    public String generateRefreshToken(String subject,
                                       Date expiration,
                                       String base64EncodedSecretKey) {


        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(createKey(), signatureAlgorithm)
                .compact();
    }

    public String getSubject(String jws) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
                .build()
                .parseClaimsJws(jws)
                .getBody();
        System.out.println(claims.toString());
        return (String) claims.get("email");
    }



    public Jws<Claims> getClaims(String jws) {

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
                .build()
                .parseClaimsJws(jws);

        return claims;
    }

    //엑세스 토큰 검증하는 로직
    public Claims verifyToken(String jws){
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
                    .build()
                    .parseClaimsJws(jws)
                    .getBody();
            log.info("토큰 검증 완료");
            return claims;
        } catch (JwtException e) {
            return null;
        }
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
