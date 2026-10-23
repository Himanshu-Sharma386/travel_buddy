package com.travelbuddy.backend.util;

import org.springframework.stereotype.Component;

@Component
public class ApiClient {

    // Helper methods for making external API calls
    // For example, calling Google Places API, OpenWeatherMap, OpenAI

    public String fetchFromGooglePlaces(String city) {
        // Implementation for Google Places API
        return "Mock response for " + city;
    }

    public String fetchWeather(String city) {
        // Implementation for OpenWeatherMap API
        return "Mock weather data for " + city;
    }

    public String fetchAiRecommendations(String prompt) {
        // Implementation for OpenAI API
        return "Mock AI recommendations";
    }
}
