package com.travelbuddy.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;

import com.travelbuddy.backend.repository.DestinationRepository;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TravelService {

    @Autowired
    private BudgetService budgetService;

    @Autowired
    private ItineraryService itineraryService;

    @Autowired
    private DestinationRepository destinationRepository;

    @Value("${hotels.provider:mock}")
    private String hotelsProvider;

    @Value("${hotels.apiKey:}")
    private String hotelsApiKey;

    public Map<String, Object> generateTrip(String destination, Double budget, LocalDate startDate, LocalDate endDate, String preferences) {
        int days = (int) ChronoUnit.DAYS.between(startDate, endDate) + 1;
        if (days <= 0) days = 1;

        Map<String, Object> tripPlan = new HashMap<>();
        tripPlan.put("destination", destination);
        tripPlan.put("dates", startDate + " to " + endDate);
        tripPlan.put("budgetBreakdown", budgetService.calculateBudget(destination, budget, days, preferences));
        tripPlan.put("itinerary", itineraryService.generateItinerary(destination, days, preferences));
        
        // Mocking safety data
        Map<String, Object> safety = new HashMap<>();
        safety.put("safetyRating", 8);
        safety.put("fraudAlerts", List.of("Beware of fake tourist guides at major spots."));
        safety.put("emergencyContact", "112");
        tripPlan.put("safety", safety);

        return tripPlan;
    }

    public List<?> getPlaces(String city) {
        if (city == null || city.isEmpty() || city.equalsIgnoreCase("all")) {
            return destinationRepository.findAll();
        }
        return destinationRepository.findAll().stream()
            .filter(d -> d.getName().toLowerCase().contains(city.toLowerCase()))
            .toList();
    }

    public Map<String, String> getRoute(String from, String to) {
        // Mock data representing Google Maps Platform response
        return Map.of(
            "from", from,
            "to", to,
            "distance", "250 km",
            "estimatedTime", "4 hours 30 mins"
        );
    }

    public Map<String, Object> getWeather(String city) {
        // Mock data representing OpenWeatherMap API response
        return Map.of(
            "city", city,
            "temperature", "26°C",
            "condition", "Partly Cloudy",
            "threats", List.of()
        );
    }

    public List<Map<String, Object>> getHotels(String destination) {
        // If configured to use an external provider attempt to call it, otherwise fallback to mock
        // RapidAPI integration: set hotels.provider=rapidapi and configure hotels.rapidapi.host and hotels.rapidapi.key
        if ("rapidapi".equalsIgnoreCase(hotelsProvider)) {
            String rapidHost = System.getProperty("hotels.rapidapi.host", System.getenv("HOTELS_RAPIDAPI_HOST"));
            String rapidKey = System.getProperty("hotels.rapidapi.key", System.getenv("HOTELS_RAPIDAPI_KEY"));
            if ((rapidHost != null && !rapidHost.isBlank()) && (rapidKey != null && !rapidKey.isBlank())) {
                try {
                    RestTemplate rt = new RestTemplate();
                    String url = "https://" + rapidHost + "/properties/list?destinationCity=" + java.net.URLEncoder.encode(destination, java.nio.charset.StandardCharsets.UTF_8);
                    HttpHeaders headers = new HttpHeaders();
                    headers.set("X-RapidAPI-Host", rapidHost);
                    headers.set("X-RapidAPI-Key", rapidKey);
                    HttpEntity<Void> req = new HttpEntity<>(headers);
                    ResponseEntity<Map<String, Object>> resp = rt.exchange(url, HttpMethod.GET, req, new ParameterizedTypeReference<Map<String, Object>>(){});
                    if (resp.getStatusCode().is2xxSuccessful() && resp.getBody() != null) {
                        // Map provider response to our hotel format (best-effort)
                        Object data = resp.getBody().get("data");
                        if (data instanceof List) {
                            List<?> list = (List<?>) data;
                            return list.stream().limit(10).map(o -> {
                                Map<String, Object> m = (Map<String, Object>) o;
                                return Map.of(
                                    "id", String.valueOf(m.getOrDefault("id", m.get("property_id"))),
                                    "name", m.getOrDefault("name", m.get("title")),
                                    "desc", m.getOrDefault("description", ""),
                                    "rating", m.getOrDefault("starRating", 4.0),
                                    "pricePerNight", m.getOrDefault("price", 0),
                                    "image", m.getOrDefault("image_url", "https://source.unsplash.com/900x600/?hotel," + destination),
                                    "bookingUrl", m.getOrDefault("url", "")
                                );
                            }).toList();
                        }
                    }
                } catch (Exception e) {
                    System.err.println("RapidAPI hotels provider failed: " + e.getMessage());
                }
            }
        }

        return List.of(
            Map.of("id", "1", "name", destination + " Grand Hotel", "desc", "Comfortable rooms with city view.", "rating", 4.5, "pricePerNight", 3500, "image", "https://source.unsplash.com/900x600/?hotel," + destination, "bookingUrl", "https://www.booking.com"),
            Map.of("id", "2", "name", destination + " Residency", "desc", "Budget-friendly stay near main attractions.", "rating", 4.0, "pricePerNight", 2000, "image", "https://source.unsplash.com/900x600/?resort," + destination, "bookingUrl", "https://www.agoda.com"),
            Map.of("id", "3", "name", destination + " Lakeview", "desc", "Scenic views and premium services.", "rating", 4.7, "pricePerNight", 5500, "image", "https://source.unsplash.com/900x600/?luxury-hotel," + destination, "bookingUrl", "https://www.tripadvisor.com"),
            Map.of("id", "4", "name", destination + " Inn", "desc", "Cozy inn with homely food.", "rating", 4.1, "pricePerNight", 1800, "image", "https://source.unsplash.com/900x600/?inn," + destination, "bookingUrl", "https://www.booking.com"),
            Map.of("id", "5", "name", destination + " Suites", "desc", "Spacious suites for families.", "rating", 4.6, "pricePerNight", 4200, "image", "https://source.unsplash.com/900x600/?hotel-suite," + destination, "bookingUrl", "https://www.hotels.com")
        );
    }

    public List<?> getAllDestinations() {
        return destinationRepository.findAll();
    }
}
