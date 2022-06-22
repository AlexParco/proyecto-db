package main

import (
	"log"

	"github.com/alexparco/api/app"
	"github.com/alexparco/api/config"
	"github.com/alexparco/api/routes"
)

func main() {
	config, err := config.New("./config.yml")
	if err != nil {
		log.Println(err)
	}
	app := app.NewApp(config)

	r := routes.NewRouter(app)
	app.Run(r)
}
