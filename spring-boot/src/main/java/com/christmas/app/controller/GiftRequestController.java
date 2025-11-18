package com.christmas.app.controller;

import com.christmas.app.dto.CreateGiftRequestDTO;
import com.christmas.app.dto.GiftRequestDTO;
import com.christmas.app.service.GiftRequestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gift-requests")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class GiftRequestController {

    private final GiftRequestService service;

    public GiftRequestController(GiftRequestService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<GiftRequestDTO>> getAllRequests() {
        List<GiftRequestDTO> requests = service.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GiftRequestDTO> getRequestById(@PathVariable Long id) {
        GiftRequestDTO request = service.getRequestById(id);
        return ResponseEntity.ok(request);
    }

    @PostMapping
    public ResponseEntity<GiftRequestDTO> createRequest(@Valid @RequestBody CreateGiftRequestDTO createDTO) {
        GiftRequestDTO created = service.createRequest(createDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GiftRequestDTO> updateRequest(
            @PathVariable Long id,
            @Valid @RequestBody CreateGiftRequestDTO updateDTO) {
        GiftRequestDTO updated = service.updateRequest(id, updateDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        service.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/purchased")
    public ResponseEntity<GiftRequestDTO> togglePurchased(@PathVariable Long id) {
        GiftRequestDTO updated = service.togglePurchased(id);
        return ResponseEntity.ok(updated);
    }
}
