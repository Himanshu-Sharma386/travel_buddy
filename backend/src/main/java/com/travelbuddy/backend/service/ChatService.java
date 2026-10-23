package com.travelbuddy.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.travelbuddy.backend.repository.DestinationRepository;
import com.travelbuddy.backend.repository.SafetyRepository;
import com.travelbuddy.backend.model.Destination;
import java.util.*;

@Service
public class ChatService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private SafetyRepository safetyRepository;

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    private final RestTemplate restTemplate = new RestTemplate();

    public String getChatResponse(String userMessage) {
        String input = userMessage.toLowerCase();
        
        // 1. SMART DATABASE SEARCH (Prioritize our curated Indian cities and temples)
        List<Destination> allDestinations = destinationRepository.findAll();
        for (Destination dest : allDestinations) {
            if (input.contains(dest.getName().toLowerCase())) {
                return String.format(
                    "### 🏛️ %s Found in Database\n" +
                    "%s\n\n" +
                    "**Details for your trip:**\n" +
                    "*   **Category:** %s\n" +
                    "*   **Best Time to Visit:** %s\n" +
                    "*   **Rating:** %.1f/5.0\n" +
                    "*   **Coordinates:** [%.4f, %.4f]\n\n" +
                    "Since this is a verified landmark in my system, I can help you optimize a route here or calculate a budget. What would you like to do next?",
                    dest.getName(), dest.getDescription(), dest.getCategory(), 
                    dest.getBestTime(), dest.getRating(), dest.getLatitude(), dest.getLongitude()
                );
            }
        }

        // 2. LIVE AI ANALYSIS (Fallback for everything else)
        if (apiKey != null && !apiKey.equals("YOUR_GEMINI_API_KEY") && !apiKey.isEmpty()) {
            return callGeminiAPI(userMessage);
        }

        // NO KEY? No problem! Use Pollinations AI (Free, No Key required) for REAL-TIME responses
        try {
            String encodedMessage = java.net.URLEncoder.encode(
                "You are TravelBuddy AI, an expert on Indian travel. Answer this question in a helpful, premium tone using Markdown. Question: " + userMessage, 
                "UTF-8"
            );
            String pollinationsUrl = "https://text.pollinations.ai/" + encodedMessage;
            
            ResponseEntity<String> response = restTemplate.getForEntity(pollinationsUrl, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            }
        } catch (Exception e) {
            System.err.println("Pollinations AI failed: " + e.getMessage());
        }

        // Absolute last resort fallback
        return "I'm currently unable to connect to my AI brain. Please check your internet connection or add a Gemini API key to application.properties.";
    }

    private String callGeminiAPI(String userMessage) {
        String url = GEMINI_API_URL + "?key=" + apiKey;

        // Build the request body for Gemini API
        Map<String, Object> requestBody = new HashMap<>();
        List<Map<String, Object>> contents = new ArrayList<>();
        Map<String, Object> content = new HashMap<>();
        List<Map<String, String>> parts = new ArrayList<>();
        Map<String, String> part = new HashMap<>();
        
        part.put("text", "You are TravelBuddy AI, a helpful assistant for travelers in India. " +
                         "Provide concise, helpful, and premium travel advice. " +
                         "User says: " + userMessage);
        parts.add(part);
        content.put("parts", parts);
        contents.add(content);
        requestBody.put("contents", contents);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> body = response.getBody();
                if (body != null && body.containsKey("candidates")) {
                    List<Map<String, Object>> candidates = (List<Map<String, Object>>) body.get("candidates");
                    if (!candidates.isEmpty()) {
                        Map<String, Object> firstCandidate = candidates.get(0);
                        Map<String, Object> contentMap = (Map<String, Object>) firstCandidate.get("content");
                        List<Map<String, String>> responseParts = (List<Map<String, String>>) contentMap.get("parts");
                        return responseParts.get(0).get("text");
                    }
                }
            }
            return "I'm having trouble connecting to Gemini right now. Please try again later.";
        } catch (Exception e) {
            return "Error calling Gemini API: " + e.getMessage();
        }
    }
}
