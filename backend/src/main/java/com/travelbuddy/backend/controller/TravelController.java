package com.travelbuddy.backend.controller;

import com.travelbuddy.backend.service.TravelService;
import com.travelbuddy.backend.service.UserService;
import com.travelbuddy.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
public class TravelController {

    @Autowired
    private TravelService travelService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public Map<String, Object> getStatus() {
        return Map.of(
            "status", "TravelBuddy Backend is Online",
            "version", "0.0.1-SNAPSHOT",
            "api_endpoints", List.of("/destinations", "/generate-trip", "/chat")
        );
    }

    @PostMapping("/generate-trip")
    public ResponseEntity<?> generateTrip(@RequestBody Map<String, Object> payload) {
        System.out.println("Received trip request: " + payload);
        try {
            // Validate required fields
            if (payload == null) return ResponseEntity.badRequest().body(Map.of("error", "Missing request payload"));
            String destination = (String) payload.get("destination");
            if (destination == null || destination.isBlank()) return ResponseEntity.badRequest().body(Map.of("error", "Missing required field: destination"));

            Object budgetObj = payload.get("budget");
            if (budgetObj == null) return ResponseEntity.badRequest().body(Map.of("error", "Missing required field: budget"));
            Double budget = budgetObj instanceof Number ? ((Number) budgetObj).doubleValue() : Double.valueOf(budgetObj.toString());

            Object sDateObj = payload.get("startDate");
            Object eDateObj = payload.get("endDate");
            boolean flexible = payload.containsKey("flexibleDates") && Boolean.TRUE.equals(payload.get("flexibleDates"));
            LocalDate startDate;
            LocalDate endDate;
            if (flexible) {
                // Use today's date as baseline and default to 3 days
                startDate = LocalDate.now();
                endDate = startDate.plusDays(2);
            } else {
                if (sDateObj == null || eDateObj == null) return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields: startDate and/or endDate"));
                startDate = LocalDate.parse(sDateObj.toString());
                endDate = LocalDate.parse(eDateObj.toString());
            }

            String preferences = (String) payload.getOrDefault("preferences", "general");

            // Reject trips that start in the past (only when explicit dates provided)
            LocalDate today = LocalDate.now();
            if (!flexible && startDate.isBefore(today)) {
                return ResponseEntity.badRequest().body(Map.of("error", "startDate cannot be in the past"));
            }

            System.out.println("Generating plan for " + destination + " with budget " + budget);
            Map<String, Object> tripPlan = travelService.generateTrip(destination, budget, startDate, endDate, preferences);
            
            // Save the trip if a user ID is provided, otherwise save for a default guest user
            try {
                Long userId = payload.containsKey("userId") ? Long.valueOf(payload.get("userId").toString()) : 1L;
                
                // Ensure a default user exists if ID is 1
                if (userId == 1L) {
                    try {
                        userService.register("Guest User", "guest@example.com", "password");
                    } catch (Exception ex) {
                        // User likely already exists
                    }
                }
                
                ObjectMapper mapper = new ObjectMapper();
                String itineraryJson = mapper.writeValueAsString(tripPlan.get("itinerary"));
                Integer rooms = payload.get("rooms") instanceof Number ? ((Number) payload.get("rooms")).intValue() : null;
                Integer adults = payload.get("adults") instanceof Number ? ((Number) payload.get("adults")).intValue() : null;
                Integer children = payload.get("children") instanceof Number ? ((Number) payload.get("children")).intValue() : null;
                userService.saveTrip(userId, destination, budget, startDate, endDate, itineraryJson,
                    rooms, adults, children, null, null, null, null);
                tripPlan.put("saved", true);
                tripPlan.put("userId", userId);
            } catch (Exception ex) {
                System.out.println("Could not save trip: " + ex.getMessage());
                tripPlan.put("saved", false);
                tripPlan.put("saveError", ex.getMessage());
            }

            return ResponseEntity.ok(tripPlan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/places")
    public ResponseEntity<?> getPlaces(@RequestParam String city) {
        try {
            List<?> places = travelService.getPlaces(city);
            return ResponseEntity.ok(places);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/route")
    public ResponseEntity<?> getRoute(@RequestParam String from, @RequestParam String to) {
        try {
            Map<String, String> route = travelService.getRoute(from, to);
            return ResponseEntity.ok(route);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/weather")
    public ResponseEntity<?> getWeather(@RequestParam String city) {
        try {
            Map<String, Object> weather = travelService.getWeather(city);
            return ResponseEntity.ok(weather);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/destinations")
    public ResponseEntity<?> getAllDestinations() {
        try {
            List<?> destinations = travelService.getAllDestinations();
            return ResponseEntity.ok(Map.of(
                "count", ((List<?>) destinations).size(),
                "destinations", destinations
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/destinations/india")
    public ResponseEntity<?> getIndianDestinations() {
        try {
            List<?> destinations = travelService.getAllDestinations();
            return ResponseEntity.ok(Map.of(
                "count", ((List<?>) destinations).size(),
                "country", "India",
                "destinations", destinations
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/hotels")
    public ResponseEntity<?> getHotels(@RequestParam String destination) {
        try {
            var hotels = travelService.getHotels(destination);
            return ResponseEntity.ok(Map.of("count", hotels.size(), "hotels", hotels));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
