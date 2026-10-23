package com.travelbuddy.backend.controller;

import com.travelbuddy.backend.model.Trip;
import com.travelbuddy.backend.model.User;
import com.travelbuddy.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> payload) {
        try {
            User user = userService.register(
                payload.get("name"),
                payload.get("email"),
                payload.get("password")
            );
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        try {
            User user = userService.login(
                payload.get("email"),
                payload.get("password")
            );
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/user/trips")
    public ResponseEntity<?> getUserTrips(@RequestParam Long userId) {
        try {
            List<Trip> trips = userService.getUserTrips(userId);
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/save-trip")
    public ResponseEntity<?> saveTrip(@RequestBody Map<String, Object> payload) {
        try {
            if (payload == null) return ResponseEntity.badRequest().body(Map.of("error", "Missing request payload"));
            if (!payload.containsKey("userId")) return ResponseEntity.badRequest().body(Map.of("error", "Missing required field: userId"));
            Long userId = Long.valueOf(payload.get("userId").toString());

            String destination = (String) payload.get("destination");
            if (destination == null || destination.isBlank()) return ResponseEntity.badRequest().body(Map.of("error", "Missing required field: destination"));

            if (!payload.containsKey("budget")) return ResponseEntity.badRequest().body(Map.of("error", "Missing required field: budget"));
            Double budget = Double.valueOf(payload.get("budget").toString());

            if (!payload.containsKey("startDate") || !payload.containsKey("endDate")) return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields: startDate and/or endDate"));
            LocalDate startDate = LocalDate.parse((String) payload.get("startDate"));
            LocalDate endDate = LocalDate.parse((String) payload.get("endDate"));
            // Reject past start dates
            if (startDate.isBefore(LocalDate.now())) return ResponseEntity.badRequest().body(Map.of("error", "startDate cannot be in the past"));

            String itineraryDetails = (String) payload.get("itineraryDetails");

            // Optional hotel and guest fields
            String hotelId = payload.containsKey("hotelId") ? String.valueOf(payload.get("hotelId")) : null;
            String hotelName = payload.containsKey("hotelName") ? String.valueOf(payload.get("hotelName")) : null;
            String hotelBookingUrl = payload.containsKey("hotelBookingUrl") ? String.valueOf(payload.get("hotelBookingUrl")) : null;
            Double hotelPricePerNight = payload.containsKey("hotelPricePerNight") ? Double.valueOf(payload.get("hotelPricePerNight").toString()) : null;

            Integer rooms = payload.containsKey("rooms") ? Integer.valueOf(payload.get("rooms").toString()) : null;
            Integer adults = payload.containsKey("adults") ? Integer.valueOf(payload.get("adults").toString()) : null;
            Integer children = payload.containsKey("children") ? Integer.valueOf(payload.get("children").toString()) : null;

            Trip trip = userService.saveTrip(userId, destination, budget, startDate, endDate, itineraryDetails,
                    rooms, adults, children, hotelId, hotelName, hotelBookingUrl, hotelPricePerNight);
            return ResponseEntity.ok(trip);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
