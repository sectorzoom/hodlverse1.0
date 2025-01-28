package org.edgar.hodlverse.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Entity
public class Currency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long currencyId;

    @Column(nullable = false, unique = true, length = 10)
    private String ticker; // Símbolo corto de la criptomoneda

    @Column(nullable = false, unique = true, length = 10)
    private String symbol; // Ejemplo: btc

    @Column(nullable = false)
    private String name; // Ejemplo: Bitcoin

    @Column(nullable = false)
    private String image; // URL del logo de la criptomoneda

    @Column(nullable = false, precision = 19, scale = 8)
    private BigDecimal currentPrice; // Precio actual de la criptomoneda

    @Column(nullable = false)
    private BigDecimal marketCap; // Capitalización de mercado

    @Column(nullable = false)
    private Integer marketCapRank; // Ranking basado en capitalización de mercado

    @Column(nullable = false)
    private BigDecimal totalVolume; // Volumen total de transacciones en 24 horas

    @Column(nullable = false)
    private BigDecimal high24h; // Precio más alto en las últimas 24 horas

    @Column(nullable = false)
    private BigDecimal low24h; // Precio más bajo en las últimas 24 horas

    @Column(nullable = false)
    private BigDecimal priceChange24h; // Cambio de precio en 24 horas

    @Column(nullable = false)
    private BigDecimal priceChangePercentage24h; // Cambio porcentual del precio en 24 horas

    @Column(nullable = false)
    private BigDecimal marketCapChange24h; // Cambio de capitalización en 24 horas

    @Column(nullable = false)
    private BigDecimal marketCapChangePercentage24h; // Cambio porcentual de capitalización en 24 horas

    @Column(nullable = false)
    private BigDecimal totalSupply; // Suministro total

    @Column(nullable = false)
    private BigDecimal ath; // Máximo histórico (All-Time High)

    @Column(nullable = false)
    private BigDecimal athChangePercentage; // Cambio porcentual desde el máximo histórico

    @Column(nullable = false)
    private LocalDate athDate; // Fecha del máximo histórico

    @Column(nullable = false)
    private BigDecimal atl; // Mínimo histórico (All-Time Low)

    @Column(nullable = false)
    private BigDecimal atlChangePercentage; // Cambio porcentual desde el mínimo histórico

    @Column(nullable = false)
    private LocalDate atlDate; // Fecha del mínimo histórico

    @Column
    private String roi; // Retorno de Inversión (puede ser null)

    @Column(nullable = false)
    private LocalDate lastUpdated; // Última fecha de actualización de los datos

    @OneToMany(mappedBy = "currency", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Balance> balances = new ArrayList<>();

    @OneToMany(mappedBy = "originCurrency", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> originTransactions = new ArrayList<>();

    @OneToMany(mappedBy = "destinationCurrency", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> destinationTransactions = new ArrayList<>();

    @OneToMany(mappedBy = "currency", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<History> history = new ArrayList<>();

    public Currency() {

    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }

    public BigDecimal getMarketCap() {
        return marketCap;
    }

    public void setMarketCap(BigDecimal marketCap) {
        this.marketCap = marketCap;
    }

    public Integer getMarketCapRank() {
        return marketCapRank;
    }

    public void setMarketCapRank(Integer marketCapRank) {
        this.marketCapRank = marketCapRank;
    }

    public BigDecimal getTotalVolume() {
        return totalVolume;
    }

    public void setTotalVolume(BigDecimal totalVolume) {
        this.totalVolume = totalVolume;
    }

    public BigDecimal getHigh24h() {
        return high24h;
    }

    public void setHigh24h(BigDecimal high24h) {
        this.high24h = high24h;
    }

    public BigDecimal getLow24h() {
        return low24h;
    }

    public void setLow24h(BigDecimal low24h) {
        this.low24h = low24h;
    }

    public BigDecimal getPriceChange24h() {
        return priceChange24h;
    }

    public void setPriceChange24h(BigDecimal priceChange24h) {
        this.priceChange24h = priceChange24h;
    }

    public BigDecimal getPriceChangePercentage24h() {
        return priceChangePercentage24h;
    }

    public void setPriceChangePercentage24h(BigDecimal priceChangePercentage24h) {
        this.priceChangePercentage24h = priceChangePercentage24h;
    }

    public BigDecimal getMarketCapChange24h() {
        return marketCapChange24h;
    }

    public void setMarketCapChange24h(BigDecimal marketCapChange24h) {
        this.marketCapChange24h = marketCapChange24h;
    }

    public BigDecimal getMarketCapChangePercentage24h() {
        return marketCapChangePercentage24h;
    }

    public void setMarketCapChangePercentage24h(BigDecimal marketCapChangePercentage24h) {
        this.marketCapChangePercentage24h = marketCapChangePercentage24h;
    }

    public BigDecimal getTotalSupply() {
        return totalSupply;
    }

    public void setTotalSupply(BigDecimal totalSupply) {
        this.totalSupply = totalSupply;
    }

    public BigDecimal getAth() {
        return ath;
    }

    public void setAth(BigDecimal ath) {
        this.ath = ath;
    }

    public BigDecimal getAthChangePercentage() {
        return athChangePercentage;
    }

    public void setAthChangePercentage(BigDecimal athChangePercentage) {
        this.athChangePercentage = athChangePercentage;
    }

    public LocalDate getAthDate() {
        return athDate;
    }

    public void setAthDate(LocalDate athDate) {
        this.athDate = athDate;
    }

    public BigDecimal getAtl() {
        return atl;
    }

    public void setAtl(BigDecimal atl) {
        this.atl = atl;
    }

    public BigDecimal getAtlChangePercentage() {
        return atlChangePercentage;
    }

    public void setAtlChangePercentage(BigDecimal atlChangePercentage) {
        this.atlChangePercentage = atlChangePercentage;
    }

    public LocalDate getAtlDate() {
        return atlDate;
    }

    public void setAtlDate(LocalDate atlDate) {
        this.atlDate = atlDate;
    }

    public String getRoi() {
        return roi;
    }

    public void setRoi(String roi) {
        this.roi = roi;
    }

    public LocalDate getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDate lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public List<Balance> getBalances() {
        return balances;
    }

    public void setBalances(List<Balance> balances) {
        this.balances = balances;
    }

    public List<Transaction> getOriginTransactions() {
        return originTransactions;
    }

    public void setOriginTransactions(List<Transaction> originTransactions) {
        this.originTransactions = originTransactions;
    }

    public List<Transaction> getDestinationTransactions() {
        return destinationTransactions;
    }

    public void setDestinationTransactions(List<Transaction> destinationTransactions) {
        this.destinationTransactions = destinationTransactions;
    }

    public List<History> getHistory() {
        return history;
    }

    public void setHistory(List<History> history) {
        this.history = history;
    }
}

