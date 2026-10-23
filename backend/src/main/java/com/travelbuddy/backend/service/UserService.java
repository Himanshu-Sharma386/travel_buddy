package com.travelbuddy.backend.service;

import com.travelbuddy.backend.model.Trip;
import com.travelbuddy.backend.model.User;
import com.travelbuddy.backend.repository.TripRepository;
import com.travelbuddy.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TripRepository tripRepository;

    public User register(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password); // In real app, hash the password
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            return userOpt.get();
        }
        throw new RuntimeException("Invalid credentials");
    }

    public List<Trip> getUserTrips(Long userId) {
        return tripRepository.findByUserId(userId);
    }

    public Trip saveTrip(Long userId, String destination, Double budget, LocalDate startDate, LocalDate endDate, String itineraryDetails,
                         Integer rooms, Integer adults, Integer children,
                         String hotelId, String hotelName, String hotelBookingUrl, Double hotelPricePerNight) {
        // Enforce that trips cannot start in the past
        LocalDate today = LocalDate.now();
        if (startDate != null && startDate.isBefore(today)) {
            throw new RuntimeException("startDate cannot be in the past");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Trip trip = new Trip();
        trip.setUser(user);
        trip.setDestination(destination);
        trip.setBudget(budget);
        trip.setStartDate(startDate);
        trip.setEndDate(endDate);
        trip.setItineraryDetails(itineraryDetails);
        // guest info
        if (rooms != null) trip.setRooms(rooms);
        if (adults != null) trip.setAdults(adults);
        if (children != null) trip.setChildren(children);
        // hotel info
        if (hotelId != null) trip.setHotelId(hotelId);
        if (hotelName != null) trip.setHotelName(hotelName);
        if (hotelBookingUrl != null) trip.setHotelBookingUrl(hotelBookingUrl);
        if (hotelPricePerNight != null) trip.setHotelPricePerNight(hotelPricePerNight);
        return tripRepository.save(trip);
    }
}
