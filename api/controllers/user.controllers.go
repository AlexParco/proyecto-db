package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/alexparco/api/internal/models"
	"github.com/alexparco/api/internal/services"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserController interface {
	Profile(w http.ResponseWriter, r *http.Request)
	Update(w http.ResponseWriter, r *http.Request)
}

type userController struct {
	userService services.UserService
	jwtService  services.JwtService
}

func NewUserController(us services.UserService, jwts services.JwtService) UserController {
	return &userController{us, jwts}
}

func (u *userController) getUserIdByHeader(w http.ResponseWriter, r *http.Request) string {
	tokenstring := r.Header.Get("Authorization")

	validateToken := u.jwtService.ValidateToken(tokenstring)
	if validateToken == nil {
		return ""
	}

	Claims := validateToken.Claims.(jwt.MapClaims)
	return Claims["user_id"].(string)
}

func (u *userController) Profile(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	validateToken := u.jwtService.ValidateToken(token)
	if validateToken == nil {
		return
	}

	claims := validateToken.Claims.(jwt.MapClaims)
	id := claims["user_id"].(string)

	user, err := u.userService.FindUserById(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	b, err := json.Marshal(struct {
		User struct {
			ID    primitive.ObjectID `json:"id"`
			Name  string             `json:"name"`
			Email string             `json:"email"`
		} `json:"user"`
		Token string `json:"token,omitempty"`
	}{
		User: struct {
			ID    primitive.ObjectID `json:"id"`
			Name  string             `json:"name"`
			Email string             `json:"email"`
		}{
			user.Id,
			user.Name,
			user.Email,
		},
		Token: token,
	})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(b)
}

func (u *userController) Update(w http.ResponseWriter, r *http.Request) {
	var user models.User

	defer r.Body.Close()
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	UserId := u.getUserIdByHeader(w, r)
	if UserId == "" {
		http.Error(w, "Failed to validate token", http.StatusForbidden)
		return
	}

	id, err := primitive.ObjectIDFromHex(UserId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	user.Id = id
	err = u.userService.UpdateUser(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusAccepted)
}
