package repositories

import (
	"context"

	"github.com/alexparco/api/database"
	"github.com/alexparco/api/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserRepository interface {
	InsertUser(user *models.User) error
	FindByEmail(email string) (*models.User, error)
	FindById(id primitive.ObjectID) (*models.User, error)
	UpdateUser(user *models.User) error
	Delete(id primitive.ObjectID) error
}

type userRepository struct {
	conn *database.MongoDB
	ctx  context.Context
}

func NewUserRepo(conn *database.MongoDB) UserRepository {
	return &userRepository{conn, context.Background()}
}

func (u *userRepository) InsertUser(user *models.User) error {
	coll := u.conn.Database("users").Collection("user")

	_, err := coll.InsertOne(u.ctx, user)
	if err != nil {
		return err
	}
	return nil
}

func (u *userRepository) FindByEmail(email string) (*models.User, error) {
	coll := u.conn.Database("users").Collection("user")

	var user models.User
	filter := bson.M{"email": email}
	err := coll.FindOne(u.ctx, filter).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *userRepository) FindById(id primitive.ObjectID) (*models.User, error) {
	coll := u.conn.Database("users").Collection("user")

	var user models.User
	filter := bson.M{"_id": id}
	err := coll.FindOne(u.ctx, filter).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil

}

func (u *userRepository) UpdateUser(user *models.User) error {
	coll := u.conn.Database("users").Collection("user")
	update := bson.D{primitive.E{Key: "$set", Value: user}}
	_, err := coll.UpdateByID(u.ctx, user.Id, update)
	if err != nil {
		return err
	}
	return nil
}

func (u *userRepository) Delete(id primitive.ObjectID) error {
	coll := u.conn.Database("users").Collection("user")
	if _, err := coll.DeleteOne(u.ctx, bson.M{"_id": id}); err != nil {
		return err
	}
	return nil
}
