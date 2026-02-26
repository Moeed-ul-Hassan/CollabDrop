package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"collabdrop-backend/db"
	"collabdrop-backend/models"

	"github.com/golang-jwt/jwt/v5"
)

type SwipeRequest struct {
	ProfileID uint   `json:"profileId"`
	Direction string `json:"direction"`
}

func PostSwipeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req SwipeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	// Get swiper (usually a Brand) from JWT
	claims := r.Context().Value("user").(jwt.MapClaims)
	brandID := uint(claims["id"].(float64))

	swipe := models.SwipeLog{
		BrandID:      brandID,
		InfluencerID: req.ProfileID,
		Direction:    req.Direction,
	}

	if result := db.DB.Create(&swipe); result.Error != nil {
		http.Error(w, "Error saving swipe", http.StatusInternalServerError)
		return
	}

	fmt.Printf("Recorded swipe in DB: Brand %d -> Profile %d (%s)\n", brandID, req.ProfileID, req.Direction)

	response := map[string]string{"status": "success"}

	// Determine matching logic (e.g. if direction is right)
	if req.Direction == "right" {
		// Create a Match record to be confirmed
		match := models.Match{
			BrandID:      brandID,
			InfluencerID: req.ProfileID,
			Status:       "pending",
		}
		db.DB.Create(&match)
		response["message"] = "Match recorded"
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
