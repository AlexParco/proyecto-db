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
	Delete(w http.ResponseWriter, r *http.Request)
}

type userController struct {
	userService services.UserService
	jwtService  services.JwtService
}

func NewUserController(us services.UserService, jwts services.JwtService) UserController {
	return &userController{us, jwts}
}

func (u *userController) Profile(w http.ResponseWriter, r *http.Request) {

	token := r.Header.Get("Authorization")
	validateToken := u.jwtService.ValidateToken(token)
	if validateToken == nil {
		http.Error(w, "error: invalid token ", http.StatusBadRequest)
		return
	}
	claims := validateToken.Claims.(jwt.MapClaims)
	id := claims["user_id"].(string)

	user, err := u.userService.FindUserById(id)
	if err != nil {
		http.Error(w, "Error getting user", http.StatusBadRequest)
		return
	}

	b, err := json.Marshal(struct {
		ID    primitive.ObjectID `json:"id"`
		Name  string             `json:"name"`
		Email string             `json:"email"`
	}{
		ID:    user.Id,
		Name:  user.Name,
		Email: user.Email,
	})
	if err != nil {
		http.Error(w, "Error converting to response", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(b)
}

func (u *userController) Update(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	validateToken := u.jwtService.ValidateToken(token)
	if validateToken == nil {
		http.Error(w, "error: invalid token ", http.StatusBadRequest)
		return
	}
	claims := validateToken.Claims.(jwt.MapClaims)
	id := claims["user_id"].(string)

	var user models.User

	defer r.Body.Close()
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	hId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "Error converting id", http.StatusInternalServerError)
		return
	}

	user.Id = hId
	if err := u.userService.UpdateUser(&user); err != nil {
		http.Error(w, "Error converting id", http.StatusBadRequest)
		return
	}

	b, err := json.Marshal(struct {
		ID    string `json:"id,omitempty"`
		Name  string `json:"name,omitempty"`
		Email string `json:"email,omitempty"`
	}{
		ID:    id,
		Name:  user.Name,
		Email: user.Email,
	})
	if err != nil {
		http.Error(w, "Error converting to response", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusAccepted)
	w.Write(b)
}

func (u *userController) Delete(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	validateToken := u.jwtService.ValidateToken(token)
	if validateToken == nil {
		http.Error(w, "error: invalid token ", http.StatusBadRequest)
		return
	}

	claims := validateToken.Claims.(jwt.MapClaims)
	id := claims["user_id"].(string)

	if err := u.userService.DeleteUser(id); err != nil {
		http.Error(w, "Error deleting user", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}
