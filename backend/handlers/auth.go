package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"collabdrop-backend/db"
	"collabdrop-backend/models"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte("super-secret-collabdrop-key-for-dev") // in prod, use env variable

type AuthResponse struct {
	Token string      `json:"token"`
	User  models.User `json:"user"`
	Error string      `json:"error,omitempty"`
}

func SignupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		json.NewEncoder(w).Encode(AuthResponse{Error: "Invalid request payload"})
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		json.NewEncoder(w).Encode(AuthResponse{Error: "Error securing password"})
		return
	}
	user.Password = string(hashedPassword)

	// Save
	if result := db.DB.Create(&user); result.Error != nil {
		json.NewEncoder(w).Encode(AuthResponse{Error: "Email already exists or invalid data"})
		return
	}

	// Generate Token
	token, _ := generateToken(user)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(AuthResponse{Token: token, User: user})
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var reqUser models.User
	if err := json.NewDecoder(r.Body).Decode(&reqUser); err != nil {
		json.NewEncoder(w).Encode(AuthResponse{Error: "Invalid request payload"})
		return
	}

	var user models.User
	if result := db.DB.Where("email = ?", reqUser.Email).First(&user); result.Error != nil {
		json.NewEncoder(w).Encode(AuthResponse{Error: "Invalid email or password"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(reqUser.Password)); err != nil {
		json.NewEncoder(w).Encode(AuthResponse{Error: "Invalid email or password"})
		return
	}

	// Generate Token
	token, err := generateToken(user)
	if err != nil {
		json.NewEncoder(w).Encode(AuthResponse{Error: "Error generating token"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(AuthResponse{Token: token, User: user})
}

func generateToken(user models.User) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := jwt.MapClaims{
		"id":    user.ID,
		"email": user.Email,
		"role":  user.Role,
		"exp":   expirationTime.Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}
