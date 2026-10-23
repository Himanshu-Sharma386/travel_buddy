package com.travelbuddy.backend.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ItineraryService {

    public List<Map<String, Object>> generateItinerary(String destination, int days, String preferences) {
        List<Map<String, Object>> itinerary = new ArrayList<>();
        List<String> placePlan = getPlaceSpecificPlan(destination, preferences);

        for (int i = 1; i <= days; i++) {
            Map<String, Object> dayPlan = new HashMap<>();
            dayPlan.put("day", i);
            dayPlan.put("title", "Day " + i + " in " + destination);
            
            List<Map<String, String>> slots = new ArrayList<>();
            slots.add(createSlot("09:00 AM", "Breakfast near " + destination + " town center"));
            slots.add(createSlot("11:00 AM", placePlan.get((i - 1) % placePlan.size())));
            slots.add(createSlot("01:30 PM", "Lunch break"));
            slots.add(createSlot("03:00 PM", "Afternoon " + preferences + " experience in " + destination));
            slots.add(createSlot("06:00 PM", "Relax / Buffer Time"));
            slots.add(createSlot("08:00 PM", "Dinner with local cuisine in " + destination));

            dayPlan.put("schedule", slots);
            itinerary.add(dayPlan);
        }

        return itinerary;
    }

    private List<String> getPlaceSpecificPlan(String destination, String preferences) {
        String normalized = destination == null ? "" : destination.toLowerCase();
        if (normalized.contains("manali")) {
            return List.of(
                "Visit Hadimba Temple and Old Manali cafes",
                "Explore Solang Valley adventure activities",
                "Rohtang Pass sightseeing (subject to weather)",
                "Jogini Waterfall trek and Vashisht hot springs"
            );
        }
        if (normalized.contains("goa")) {
            return List.of(
                "North Goa beach circuit: Baga, Calangute, Anjuna",
                "Old Goa churches and Panaji heritage walk",
                "South Goa beaches: Colva, Palolem, Agonda",
                "Mandovi cruise and local seafood trail"
            );
        }
        if (normalized.contains("jaipur")) {
            return List.of(
                "Amer Fort and Jal Mahal visit",
                "City Palace and Jantar Mantar tour",
                "Hawa Mahal and local bazaar shopping",
                "Nahargarh Fort sunset and cultural dinner"
            );
        }
        return List.of(
            "Top-rated sightseeing in " + destination,
            "Local culture and market exploration in " + destination,
            "Nature and leisure activities in " + destination,
            preferences + " focused local experiences in " + destination
        );
    }

    private Map<String, String> createSlot(String time, String activity) {
        Map<String, String> slot = new HashMap<>();
        slot.put("time", time);
        slot.put("activity", activity);
        return slot;
    }
}
