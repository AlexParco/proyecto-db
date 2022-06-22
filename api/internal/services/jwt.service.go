package services

import (
	"log"
	"strings"
	"time"

	"github.com/alexparco/api/app"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type JwtService interface {
	GenerateToken(HexUserId primitive.ObjectID) (string, error)
	ValidateToken(token string) *jwt.Token
}

type jwtService struct {
	secretKey string
}

type JwtClaims struct {
	UserId string `json:"user_id"`
	jwt.RegisteredClaims
}

func NewJWTService(a *app.App) JwtService {
	return &jwtService{
		secretKey: a.Config.JwtKey,
	}
}

func (j *jwtService) GenerateToken(HexUserId primitive.ObjectID) (string, error) {
	UserID := HexUserId.Hex()

	customClaims := JwtClaims{
		UserID,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		},
	}

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, customClaims)
	token, err := t.SignedString([]byte(j.secretKey))
	if err != nil {
		log.Println(err.Error())
		return "", err
	}

	return token, nil
}

func (j *jwtService) ValidateToken(tokenString string) *jwt.Token {
	signedKey := []byte(j.secretKey)
	splitToken := strings.Split(tokenString, " ")
	tokenString = splitToken[1]

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return signedKey, nil
	})

	if err != nil {
		return nil
	}

	return token
}
