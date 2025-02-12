package org.edgar.hodlverse.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/index.html", "/css/**", "/js/**", "/images/**").permitAll() // Permitir archivos estáticos
                        .requestMatchers("/login", "/oauth2/**").permitAll() // Permitir login y OAuth
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("/dashboard.html", true) // Redirige después del login
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/index.html").permitAll()
                );

        return http.build();
    }
}
