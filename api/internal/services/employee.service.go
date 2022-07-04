package services

import (
	"time"

	"github.com/alexparco/api/internal/models"
	"github.com/alexparco/api/internal/repositories"
	"github.com/google/uuid"
)

type EmployeeService interface {
	CreateEmployee(employee *models.Employee) (*models.Employee, error)
	GetAll() ([]*models.Employee, error)
	FindEmployeeById(id string) (*models.Employee, error)
	UpdateEmployee(employee *models.Employee) error
	DeleteEmployee(id string) error
}

type employeeService struct {
	empRepo repositories.EmployeeRepository
}

func NewEmpService(er repositories.EmployeeRepository) EmployeeService {
	return &employeeService{er}
}

func (e *employeeService) CreateEmployee(employee *models.Employee) (*models.Employee, error) {
	employee.Id = uuid.NewString()

	employee.UpdateAt = time.Now().UTC()
	err := e.empRepo.InsertEmployee(*employee)
	if err != nil {
		return nil, err
	}

	return employee, nil
}

func (e *employeeService) GetAll() ([]*models.Employee, error) {
	employees, err := e.empRepo.ListEmployees()
	if err != nil {
		return nil, err
	}

	return employees, nil
}

func (e *employeeService) FindEmployeeById(id string) (*models.Employee, error) {
	employee, err := e.empRepo.FindById(id)
	if err != nil {
		return nil, err
	}
	return employee, nil
}

func (e *employeeService) UpdateEmployee(employee *models.Employee) error {
	err := e.empRepo.UpdateEmployee(*employee)
	if err != nil {
		return err
	}
	return nil
}

func (e *employeeService) DeleteEmployee(id string) error {
	err := e.empRepo.DeleteEmployee(id)
	if err != nil {
		return err
	}
	return nil
}
