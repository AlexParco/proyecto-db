package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/alexparco/api/internal/models"
	"github.com/alexparco/api/internal/services"
	"github.com/gorilla/mux"
)

type EmployeeController interface {
	CreateEmployee(w http.ResponseWriter, r *http.Request)
	All(w http.ResponseWriter, r *http.Request)
	FindEmployeeByID(w http.ResponseWriter, r *http.Request)
	UpdateEmployee(w http.ResponseWriter, r *http.Request)
	DeleteEmployee(w http.ResponseWriter, r *http.Request)
}

type employeeController struct {
	empService services.EmployeeService
	jwtService services.JwtService
}

func NewEmpController(es services.EmployeeService, jwts services.JwtService) EmployeeController {
	return &employeeController{es, jwts}
}

func (e *employeeController) CreateEmployee(w http.ResponseWriter, r *http.Request) {
	tokenString := r.Header.Get("Authorization")
	token := e.jwtService.ValidateToken(tokenString)
	if token == nil {
		http.Error(w, "Failed to validate token", http.StatusForbidden)
		return
	}

	var employee models.Employee

	defer r.Body.Close()
	if err := json.NewDecoder(r.Body).Decode(&employee); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	tempEmp, err := e.empService.CreateEmployee(&employee)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	b, err := json.Marshal(tempEmp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write(b)
}

func (e *employeeController) All(w http.ResponseWriter, r *http.Request) {
	tokenString := r.Header.Get("Authorization")
	token := e.jwtService.ValidateToken(tokenString)
	if token == nil {
		http.Error(w, "Failed to validate token", http.StatusForbidden)
		return
	}

	employees, err := e.empService.GetAll()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	b, err := json.Marshal(employees)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(b)
}

func (e *employeeController) FindEmployeeByID(w http.ResponseWriter, r *http.Request) {

	tokenString := r.Header.Get("Authorization")
	token := e.jwtService.ValidateToken(tokenString)
	if token == nil {
		http.Error(w, "Failed to validate token", http.StatusForbidden)
		return
	}

	empID := mux.Vars(r)["empid"]
	employee, err := e.empService.FindEmployeeById(empID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	b, err := json.Marshal(employee)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(b)
}

func (e *employeeController) UpdateEmployee(w http.ResponseWriter, r *http.Request) {}

func (e *employeeController) DeleteEmployee(w http.ResponseWriter, r *http.Request) {
	tokenString := r.Header.Get("Authorization")
	token := e.jwtService.ValidateToken(tokenString)
	if token == nil {
		http.Error(w, "Failed to validate token", http.StatusForbidden)
		return
	}

	empID := mux.Vars(r)["empid"]
	err := e.empService.DeleteEmployee(empID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
