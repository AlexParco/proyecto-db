package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ResponseUser struct {
	User struct {
		ID    primitive.ObjectID `json:"id"`
		Name  string             `json:"name"`
		Email string             `json:"email"`
	} `json:"user"`
	Token string `json:"token,omitempty"`
}

func NewResponseUser(u User, t string) *ResponseUser {
	return &ResponseUser{
		User: struct {
			ID    primitive.ObjectID `json:"id"`
			Name  string             `json:"name"`
			Email string             `json:"email"`
		}{
			u.Id,
			u.Name,
			u.Email,
		},
		Token: t,
	}
}
