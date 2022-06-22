package services

import (
	"errors"
	"log"

	"github.com/alexparco/api/internal/repositories"
	"golang.org/x/crypto/bcrypt"
)

type AuthService interface {
	VerifyCredential(email string, password string) error
}

type authService struct {
	userRepo repositories.UserRepository
}

func NewAuthService(ur repositories.UserRepository) AuthService {
	return &authService{ur}
}

func (a *authService) VerifyCredential(email string, password string) error {
	user, err := a.userRepo.FindByEmail(email)
	if err != nil {
		return err
	}
	if !confirmePassword(user.Password, []byte(password)) {
		return errors.New("check your credential")
	}
	return nil
}

func confirmePassword(hashedPwd string, plassword []byte) bool {
	byteHash := []byte(hashedPwd)
	err := bcrypt.CompareHashAndPassword(byteHash, plassword)
	if err != nil {
		log.Println(err)
		return false
	}
	return true
}
