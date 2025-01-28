package org.edgar.hodlverse.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @ManyToOne
    @JoinColumn(name = "currency_id", nullable = false) // Foreign key referencing Divisa
    private Currency currency;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private LocalDate date;

    // Getters and Setters
    public Long getHistoryId() {
        return historyId;
    }

    public void setHistoryId(Long id) {
        this.historyId = id;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}

