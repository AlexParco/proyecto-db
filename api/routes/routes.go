package routes

import (
	"net/http"

	"github.com/alexparco/api/app"
	"github.com/alexparco/api/controllers"
	"github.com/alexparco/api/internal/middleware"
	"github.com/alexparco/api/internal/repositories"
	"github.com/alexparco/api/internal/services"
	"github.com/gorilla/mux"
)

func NewRouter(a *app.App) *mux.Router {
	r := mux.NewRouter()
	jwtService := services.NewJWTService(a)
	middleware := middleware.NewMiddleware(a)

	// user
	ur := repositories.NewUserRepo(a.Mongo)
	us := services.NewUserService(ur)
	uc := controllers.NewUserController(us, jwtService)

	// auth
	as := services.NewAuthService(ur)
	ac := controllers.NewAuthController(as, us, jwtService)

	// employee
	er := repositories.NewEmpRepo(a.Mysql)
	es := services.NewEmpService(er)
	ec := controllers.NewEmpController(es, jwtService)

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hola mundo"))
	})

	//
	api := r.PathPrefix("/api").Subrouter()

	// auth routes
	auth := api.PathPrefix("/v1/auth").Subrouter()
	auth.HandleFunc("/login", ac.Login).Methods(http.MethodPost)
	auth.HandleFunc("/register", ac.Register).Methods(http.MethodPost)

	// user routes
	user := api.PathPrefix("/v1/user").Subrouter()
	user.Use(middleware.AuthMiddleware)
	user.HandleFunc("/profile", uc.Profile).Methods(http.MethodGet)
	user.HandleFunc("/profile", uc.Update).Methods(http.MethodPut)

	emp := api.PathPrefix("/v1/employee").Subrouter()
	emp.Use(middleware.AuthMiddleware)
	emp.HandleFunc("", ec.All).Methods(http.MethodGet)
	emp.HandleFunc("", ec.CreateEmployee).Methods(http.MethodPost)
	emp.HandleFunc("/{empid}", ec.FindEmployeeByID).Methods(http.MethodGet)
	emp.HandleFunc("/{empid}", ec.DeleteEmployee).Methods(http.MethodDelete)

	return r
}
