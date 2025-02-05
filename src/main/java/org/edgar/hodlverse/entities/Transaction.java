package org.edgar.hodlverse.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @Column(nullable = false, length = 20)
    private String transactionType; // Puede ser "buy", "sell", "exchange"

    @Column(nullable = false, precision = 20, scale = 8)
    private BigDecimal originTransactionAmount;

    @Column(nullable = false, precision = 20, scale = 8)
    private BigDecimal destinationTransactionAmount;

    @Column(nullable = false, precision = 20, scale = 8)
    private BigDecimal originUnitPrice;

    @Column(nullable = false, precision = 20, scale = 8)
    private BigDecimal destinationUnitPrice;

    @Column(nullable = false)
    private LocalDate transactionDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "origin_currency_id", nullable = false)
    private Currency originCurrency;

    @ManyToOne
    @JoinColumn(name = "destination_currency_id", nullable = false)
    private Currency destinationCurrency;

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public BigDecimal getOriginTransactionAmount() {
        return originTransactionAmount;
    }

    public void setOriginTransactionAmount(BigDecimal originTransactionAmount) {
        this.originTransactionAmount = originTransactionAmount;
    }

    public BigDecimal getDestinationTransactionAmount() {
        return destinationTransactionAmount;
    }

    public void setDestinationTransactionAmount(BigDecimal destinationTransactionAmount) {
        this.destinationTransactionAmount = destinationTransactionAmount;
    }

    public BigDecimal getOriginUnitPrice() {
        return originUnitPrice;
    }

    public void setOriginUnitPrice(BigDecimal originUnitPrice) {
        this.originUnitPrice = originUnitPrice;
    }

    public BigDecimal getDestinationUnitPrice() {
        return destinationUnitPrice;
    }

    public void setDestinationUnitPrice(BigDecimal destinationUnitPrice) {
        this.destinationUnitPrice = destinationUnitPrice;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Currency getOriginCurrency() {
        return originCurrency;
    }

    public void setOriginCurrency(Currency originCurrency) {
        this.originCurrency = originCurrency;
    }

    public Currency getDestinationCurrency() {
        return destinationCurrency;
    }

    public void setDestinationCurrency(Currency destinationCurrency) {
        this.destinationCurrency = destinationCurrency;
    }
}