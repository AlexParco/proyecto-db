package middleware

import (
	"log"
	"net/http"

	"github.com/alexparco/api/app"
	"github.com/alexparco/api/internal/services"
	"github.com/golang-jwt/jwt/v4"
)

type Middleware interface {
	AuthMiddleware(next http.Handler) http.Handler
}

type middleware struct {
	*app.App
}

func NewMiddleware(a *app.App) Middleware {
	return &middleware{a}
}

func (m *middleware) AuthMiddleware(next http.Handler) http.Handler {
	jwtService := services.NewJWTService(m.App)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")
		if tokenString == "Bearer" || tokenString == "" || tokenString == "Bearer " {
			http.Error(w, "No token provided", http.StatusForbidden)
			return
		}

		validateToken := jwtService.ValidateToken(tokenString)

		if validateToken.Valid {
			claims := validateToken.Claims.(jwt.MapClaims)
			log.Println("Claim[id]: ", claims["user_id"].(string))
			next.ServeHTTP(w, r)
		} else {
			http.Error(w, "No token provided", http.StatusUnauthorized)
			return
		}
	})
}
