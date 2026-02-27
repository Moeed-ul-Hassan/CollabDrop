package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"collabdrop-backend/db"
	"collabdrop-backend/handlers"
	"collabdrop-backend/middleware"
	"collabdrop-backend/models"

	"gorm.io/gorm"
)

func main() {
	// Initialize Database
	db.Init()
	seedMockData(db.DB)

	mux := http.NewServeMux()

	// Public Routes
	mux.HandleFunc("/api/auth/signup", handlers.SignupHandler)
	mux.HandleFunc("/api/auth/login", handlers.LoginHandler)

	// Protected Routes
	protectedMux := http.NewServeMux()
	protectedMux.HandleFunc("/api/profiles", handlers.GetProfilesHandler)
	protectedMux.HandleFunc("/api/swipe", handlers.PostSwipeHandler)

	// Wrap protected routes with Auth middleware
	mux.Handle("/api/profiles", middleware.AuthMiddleware(protectedMux))
	mux.Handle("/api/swipe", middleware.AuthMiddleware(protectedMux))

	// Apply CORS middleware globally
	handler := corsMiddleware(mux)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Println("Backend server listening on port", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal(err)
	}
}

// corsMiddleware allows cross-origin requests from our Vite frontend
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// seedMockData injects the fake influencers into the DB for initial testing
func seedMockData(d *gorm.DB) {
	var count int64
	d.Model(&models.User{}).Where("role = ?", "influencer").Count(&count)

	if count == 0 {
		mockInfluencers := []models.User{
			{Email: "aisha@test.com", Password: "xyz", Name: "Aisha K.", Age: "22", Image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80", Tags: "Streetwear,Sneakers,Lahore", Followers: "45K", Location: "Lahore, Pakistan", IsNew: true, Role: "influencer"},
			{Email: "zayn@test.com", Password: "xyz", Name: "Zayn Ali", Age: "25", Image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80", Tags: "Tech,Gaming,Karachi", Followers: "120K", Location: "Karachi, Pakistan", IsNew: false, Role: "influencer"},
		}
		for _, inf := range mockInfluencers {
			d.Create(&inf)
		}
		log.Println("Seeded mock influencers.")
	}
}
