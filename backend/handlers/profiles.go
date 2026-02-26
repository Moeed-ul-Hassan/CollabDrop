package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"collabdrop-backend/db"
	"collabdrop-backend/models"

	"github.com/golang-jwt/jwt/v5"
)

// Simplified response struct for UI mapping
type ProfileResponse struct {
	ID        uint     `json:"id"`
	Name      string   `json:"name"`
	Age       string   `json:"age"`
	Image     string   `json:"image"`
	Tags      []string `json:"tags"`
	Followers string   `json:"followers"`
	MatchRate int      `json:"matchRate"`
	Location  string   `json:"location"`
	IsNew     bool     `json:"isNew"`
}

func GetProfilesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Assuming a Brand is requesting profiles, get Brand ID from JWT
	claims := r.Context().Value("user").(jwt.MapClaims)
	brandID := uint(claims["id"].(float64))
	_ = brandID // In a real system, you'd filter out influencers this brand already swiped on.

	var influencers []models.User
	if err := db.DB.Where("role = ?", "influencer").Find(&influencers).Error; err != nil {
		http.Error(w, "Error fetching profiles", http.StatusInternalServerError)
		return
	}

	// Map DB models to Frontend Profile shape
	var results []ProfileResponse
	for _, inf := range influencers {
		results = append(results, ProfileResponse{
			ID:        inf.ID,
			Name:      inf.Name,
			Age:       inf.Age,
			Image:     inf.Image,
			Tags:      strings.Split(inf.Tags, ","),
			Followers: inf.Followers,
			MatchRate: 90, // mock match rate for now
			Location:  inf.Location,
			IsNew:     inf.IsNew,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}
