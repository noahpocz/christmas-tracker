package com.christmas.app.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class GiftRequestDTO {

    private Long id;

    @NotBlank(message = "Person name is required")
    private String personName;

    @NotBlank(message = "Item description is required")
    private String itemDescription;

    private String shoppingLink;

    private Boolean purchased;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // Constructors
    public GiftRequestDTO() {
    }

    public GiftRequestDTO(Long id, String personName, String itemDescription, String shoppingLink, Boolean purchased, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.personName = personName;
        this.itemDescription = itemDescription;
        this.shoppingLink = shoppingLink;
        this.purchased = purchased;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public String getShoppingLink() {
        return shoppingLink;
    }

    public void setShoppingLink(String shoppingLink) {
        this.shoppingLink = shoppingLink;
    }

    public Boolean getPurchased() {
        return purchased;
    }

    public void setPurchased(Boolean purchased) {
        this.purchased = purchased;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
