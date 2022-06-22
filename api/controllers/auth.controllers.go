package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/alexparco/api/internal/models"
	"github.com/alexparco/api/internal/services"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AuthController interface {
	Login(w http.ResponseWriter, r *http.Request)
	Register(w http.ResponseWriter, r *http.Request)
}

type authController struct {
	authService services.AuthService
	userService services.UserService
	jwtService  services.JwtService
}

func NewAuthController(ac services.AuthService, us services.UserService, jwts services.JwtService) AuthController {
	return &authController{ac, us, jwts}
}

func (a *authController) Login(w http.ResponseWriter, r *http.Request) {
	var user models.User
	defer r.Body.Close()
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := a.authService.VerifyCredential(user.Email, user.Password); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	userE, err := a.userService.FindUserByEmail(user.Email)
	if err != nil {
		http.Error(w, err.Error(), http.StatusForbidden)
		return
	}

	token, err := a.jwtService.GenerateToken(userE.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusForbidden)
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
			userE.Id,
			userE.Name,
			userE.Email,
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

func (a *authController) Register(w http.ResponseWriter, r *http.Request) {
	var user models.User

	defer r.Body.Close()
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	userE, err := a.userService.CreateUser(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	token, err := a.jwtService.GenerateToken(userE.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusForbidden)
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
			userE.Id,
			userE.Name,
			userE.Email,
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
