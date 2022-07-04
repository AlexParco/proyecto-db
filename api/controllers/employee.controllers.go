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
	var employee models.Employee

	defer r.Body.Close()
	if err := json.NewDecoder(r.Body).Decode(&employee); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err := e.empService.CreateEmployee(&employee)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	emps, err := e.empService.GetAll()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	b, err := json.Marshal(emps)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write(b)
}

func (e *employeeController) All(w http.ResponseWriter, r *http.Request) {

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

// TODO: Update Not implemented
func (e *employeeController) UpdateEmployee(w http.ResponseWriter, r *http.Request) {
	var employee models.Employee

	empID := mux.Vars(r)["empid"]
	employee.Id = empID
	if err := json.NewDecoder(r.Body).Decode(&employee); err != nil {
		http.Error(w, "Error parsing data", http.StatusBadRequest)
		return
	}

	if err := e.empService.UpdateEmployee(&employee); err != nil {
		http.Error(w, "Error updating data", http.StatusBadRequest)
		return
	}

	employees, err := e.empService.GetAll()
	if err != nil {
		http.Error(w, "Error Getting data", http.StatusBadRequest)
		return
	}
	b, err := json.Marshal(employees)
	if err != nil {
		http.Error(w, "Error Parsing data", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusAccepted)
	w.Write(b)
}

func (e *employeeController) DeleteEmployee(w http.ResponseWriter, r *http.Request) {

	empID := mux.Vars(r)["empid"]
	err := e.empService.DeleteEmployee(empID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
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
