package com.christmas.app.repository;

import com.christmas.app.entity.GiftRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GiftRequestRepository extends JpaRepository<GiftRequest, Long> {

    List<GiftRequest> findAllByOrderByCreatedAtDesc();

    List<GiftRequest> findByPurchased(Boolean purchased);
}
