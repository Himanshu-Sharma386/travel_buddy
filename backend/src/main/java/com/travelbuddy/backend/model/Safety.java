package com.travelbuddy.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "safety_alerts")
public class Safety {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String location;

    @Column(name = "fraud_alert", columnDefinition = "TEXT")
    private String fraudAlert;

    @Column(name = "safety_rating")
    private Integer safetyRating;

    public Safety() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getFraudAlert() { return fraudAlert; }
    public void setFraudAlert(String fraudAlert) { this.fraudAlert = fraudAlert; }

    public Integer getSafetyRating() { return safetyRating; }
    public void setSafetyRating(Integer safetyRating) { this.safetyRating = safetyRating; }
}
