package com.travelbuddy.backend.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class BudgetService {

    public Map<String, Object> calculateBudget(String destination, Double totalBudget, int days, String preferences) {
        Map<String, Object> budgetBreakdown = new HashMap<>();
        
        // Simple mock logic for budgeting
        double stayPercentage = preferences.toLowerCase().contains("luxury") ? 0.50 : 0.35;
        double foodPercentage = 0.25;
        double travelPercentage = 0.20;
        double activitiesPercentage = 1.0 - stayPercentage - foodPercentage - travelPercentage;

        budgetBreakdown.put("total", totalBudget);
        budgetBreakdown.put("stay", totalBudget * stayPercentage);
        budgetBreakdown.put("food", totalBudget * foodPercentage);
        budgetBreakdown.put("travel", totalBudget * travelPercentage);
        budgetBreakdown.put("activities", totalBudget * activitiesPercentage);
        budgetBreakdown.put("dailyAverage", totalBudget / (days > 0 ? days : 1));

        return budgetBreakdown;
    }
}
