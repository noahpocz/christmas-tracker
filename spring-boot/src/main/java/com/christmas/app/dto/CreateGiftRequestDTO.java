package com.christmas.app.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateGiftRequestDTO {

    @NotBlank(message = "Person name is required")
    private String personName;

    @NotBlank(message = "Item description is required")
    private String itemDescription;

    private String shoppingLink;

    // Constructors
    public CreateGiftRequestDTO() {
    }

    public CreateGiftRequestDTO(String personName, String itemDescription, String shoppingLink) {
        this.personName = personName;
        this.itemDescription = itemDescription;
        this.shoppingLink = shoppingLink;
    }

    // Getters and Setters
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
}
