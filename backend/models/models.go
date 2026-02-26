package models

import (
	"time"

	"gorm.io/gorm"
)

// User represents both Brands and Influencers
type User struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	Email    string `gorm:"uniqueIndex;not null" json:"email"`
	Password string `gorm:"not null" json:"-"`
	Name     string `gorm:"not null" json:"name"`
	Role     string `gorm:"not null" json:"role"` // "brand" or "influencer"

	// Influencer Specific
	Age       string `json:"age"`
	Image     string `json:"image"`
	Tags      string `json:"tags"` // Stored as comma-separated
	Followers string `json:"followers"`
	Location  string `json:"location"`
	IsNew     bool   `json:"isNew"`
}

// SwipeLog tracks right/left/up swipes
type SwipeLog struct {
	ID           uint      `gorm:"primarykey" json:"id"`
	CreatedAt    time.Time `json:"createdAt"`
	BrandID      uint      `gorm:"not null" json:"brandId"`
	InfluencerID uint      `gorm:"not null" json:"influencerId"`
	Direction    string    `gorm:"not null" json:"direction"` // "left", "right", "up"
}

// Match represents a mutual interest (or a right swipe waiting for a response depending on flow)
type Match struct {
	ID           uint      `gorm:"primarykey" json:"id"`
	CreatedAt    time.Time `json:"createdAt"`
	BrandID      uint      `gorm:"not null" json:"brandId"`
	InfluencerID uint      `gorm:"not null" json:"influencerId"`
	Status       string    `gorm:"not null;default:'pending'" json:"status"` // "pending", "accepted", "rejected"
}
