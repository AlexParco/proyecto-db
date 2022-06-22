package services

import (
	"time"

	"github.com/alexparco/api/internal/models"
	"github.com/alexparco/api/internal/repositories"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type UserService interface {
	CreateUser(user *models.User) (*models.User, error)
	UpdateUser(user *models.User) error
	FindUserByEmail(email string) (*models.User, error)
	FindUserById(id string) (*models.User, error)
}

type userService struct {
	userRepo repositories.UserRepository
}

func NewUserService(ur repositories.UserRepository) UserService {
	return &userService{ur}
}

func (u *userService) CreateUser(user *models.User) (*models.User, error) {
	_, err := u.FindUserByEmail(user.Email)
	if err == nil {
		return nil, err
	}

	user.Id = primitive.NewObjectID()
	user.UpdatedAt = time.Now().UTC()
	user.CreatedAt = time.Now().UTC()
	user.Password = encryptPassword([]byte(user.Password))
	user.Admin = false

	err = u.userRepo.InsertUser(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *userService) UpdateUser(user *models.User) error {
	user.UpdatedAt = time.Now().UTC()
	if user.Password != "" {
		user.Password = encryptPassword([]byte(user.Password))
	} else {
		tempUser, err := u.userRepo.FindById(user.Id)
		if err != nil {
			return err
		}
		user.Password = tempUser.Password
		user.CreatedAt = tempUser.CreatedAt
		user.Admin = tempUser.Admin
	}

	err := u.userRepo.UpdateUser(user)
	if err != nil {
		return err
	}
	return nil
}

func (u *userService) FindUserByEmail(email string) (*models.User, error) {
	user, err := u.userRepo.FindByEmail(email)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (u *userService) FindUserById(id string) (*models.User, error) {
	hid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	user, err := u.userRepo.FindById(hid)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func encryptPassword(pwd []byte) string {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		panic("Failed to hash a password")
	}
	return string(hash)
}
