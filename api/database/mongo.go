package database

import (
	"context"
	"fmt"
	"time"

	"github.com/alexparco/api/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type MongoDB struct {
	*mongo.Client
}

func NewMongoDB(c config.MongoConfig) (*MongoDB, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	options := options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:%s/", c.Host, c.Port))

	client, err := mongo.Connect(ctx, options)
	if err != nil {
		return nil, err
	}

	err = client.Ping(context.Background(), readpref.Primary())
	if err != nil {
		return nil, err
	}

	return &MongoDB{client}, nil
}
