package com.codestates.mainproject.auth.config;

import com.codestates.mainproject.auth.authexception.CustomAuthenticationEntryPoint;
import com.codestates.mainproject.auth.filter.JwtAuthenticationFilter;
import com.codestates.mainproject.auth.jwt.JwtProvider;
import com.codestates.mainproject.auth.jwt.MemberDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtProvider jwtProvider;
    private final MemberDetailsService memberDetailsService;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()

                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint)
                .and()

                .formLogin().disable()
                .httpBasic().disable()

                .csrf().disable()
                .authorizeRequests()
                .requestMatchers(request -> CorsUtils.isPreFlightRequest(request)).permitAll()
                .antMatchers("/login/**", "/oauth/**", "/members/**",  "/docs/*", "/",  "/mails/**", "/mood/**", "/palette/**", "/friend/**", "/auth/**").permitAll()
                .anyRequest().authenticated()
                .and()

                .addFilterBefore(new JwtAuthenticationFilter(this.jwtProvider, this.memberDetailsService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Refresh"));
        configuration.setAllowedHeaders(Arrays.asList("*")); // 모든 출처에 대해 HTTP 통신을 허용
        configuration.setAllowedOriginPatterns(Arrays.asList("*")); // 모든 출처에 대해 HTTP 통신을 허용
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS")); //파라미터로 지정한 HTTP Method에 대한 HTTP 통신을 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 URL 앞에서 구성한 CORS 정책을 적용
        return source;
    }
}
