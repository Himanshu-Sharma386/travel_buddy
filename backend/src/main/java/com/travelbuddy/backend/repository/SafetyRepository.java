package com.travelbuddy.backend.repository;

import com.travelbuddy.backend.model.Safety;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SafetyRepository extends JpaRepository<Safety, Long> {
    Optional<Safety> findByLocationIgnoreCase(String location);
}
