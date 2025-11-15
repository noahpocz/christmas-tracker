package com.christmas.app.service;

import com.christmas.app.dto.CreateGiftRequestDTO;
import com.christmas.app.dto.GiftRequestDTO;
import com.christmas.app.entity.GiftRequest;
import com.christmas.app.exception.ResourceNotFoundException;
import com.christmas.app.repository.GiftRequestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class GiftRequestService {

    private final GiftRequestRepository repository;

    public GiftRequestService(GiftRequestRepository repository) {
        this.repository = repository;
    }

    public List<GiftRequestDTO> getAllRequests() {
        return repository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public GiftRequestDTO getRequestById(Long id) {
        GiftRequest request = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gift request not found with id: " + id));
        return convertToDTO(request);
    }

    public GiftRequestDTO createRequest(CreateGiftRequestDTO createDTO) {
        GiftRequest request = new GiftRequest(
                createDTO.getPersonName(),
                createDTO.getItemDescription(),
                createDTO.getShoppingLink()
        );
        GiftRequest saved = repository.save(request);
        return convertToDTO(saved);
    }

    public GiftRequestDTO updateRequest(Long id, CreateGiftRequestDTO updateDTO) {
        GiftRequest request = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gift request not found with id: " + id));

        request.setPersonName(updateDTO.getPersonName());
        request.setItemDescription(updateDTO.getItemDescription());
        request.setShoppingLink(updateDTO.getShoppingLink());

        GiftRequest updated = repository.save(request);
        return convertToDTO(updated);
    }

    public void deleteRequest(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Gift request not found with id: " + id);
        }
        repository.deleteById(id);
    }

    public GiftRequestDTO togglePurchased(Long id) {
        GiftRequest request = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gift request not found with id: " + id));

        request.setPurchased(!request.getPurchased());
        GiftRequest updated = repository.save(request);
        return convertToDTO(updated);
    }

    private GiftRequestDTO convertToDTO(GiftRequest entity) {
        return new GiftRequestDTO(
                entity.getId(),
                entity.getPersonName(),
                entity.getItemDescription(),
                entity.getShoppingLink(),
                entity.getPurchased(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
