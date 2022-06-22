package app

import (
	"fmt"
	"log"
	"net/http"

	"github.com/alexparco/api/config"
	"github.com/alexparco/api/database"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type App struct {
	Config config.ApiConfig
	Mongo  *database.MongoDB
	Mysql  *database.MySQLDB
}

func NewApp(c config.ApiConfig) *App {

	mysql, err := database.NewMySQLDB(c.MysqlConfig)
	if err != nil {
		log.Println(err)
	}

	mongo, err := database.NewMongoDB(c.MongoConfig)
	if err != nil {
		log.Println(err)
	}

	return &App{
		Config: c,
		Mysql:  mysql,
		Mongo:  mongo,
	}
}

func (a *App) Run(r *mux.Router) {
	headersOk := handlers.AllowedHeaders([]string{"Authorization", "Content-Type", "X-Requested-With"})
	originsOk := handlers.AllowedOrigins([]string{"*"})

	port := a.Config.Port
	addr := fmt.Sprintf(":%v", port)

	fmt.Printf("API is running in port: %s\n", port)
	log.Fatal(http.ListenAndServe(addr, handlers.CORS(originsOk, headersOk)(r)))
}
