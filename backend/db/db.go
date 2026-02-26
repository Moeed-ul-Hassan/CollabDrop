package db

import (
	"collabdrop-backend/models"
	"log"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() {
	var err error
	DB, err = gorm.Open(sqlite.Open("collabdrop.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database: ", err)
	}

	log.Println("Database connection established")

	// Automigrate models
	err = DB.AutoMigrate(
		&models.User{},
		&models.SwipeLog{},
		&models.Match{},
	)
	if err != nil {
		log.Fatal("failed to migrate database: ", err)
	}

	log.Println("Database migration completed")
}
