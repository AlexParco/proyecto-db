package repositories

import (
	"github.com/alexparco/api/database"
	"github.com/alexparco/api/internal/models"
)

type EmployeeRepository interface {
	InsertEmployee(employee models.Employee) error
	ListEmployees() ([]*models.Employee, error)
	FindById(id string) (*models.Employee, error)
	UpdateEmployee(employee models.Employee) error
	DeleteEmployee(id string) error
}
type employeeRepository struct {
	conn *database.MySQLDB
}

func NewEmpRepo(conn *database.MySQLDB) EmployeeRepository {
	return &employeeRepository{conn}
}

func (e *employeeRepository) InsertEmployee(employee models.Employee) error {
	stmt, err := e.conn.Prepare("CALL InsertEmployee(?,?,?,?,?,?,?,?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(&employee.Id, &employee.DeptName, &employee.FirstName, &employee.LastName, &employee.Salary, &employee.Gender, &employee.HireDate, &employee.UpdateAt)
	if err != nil {
		return err
	}

	return nil
}

func (e *employeeRepository) ListEmployees() ([]*models.Employee, error) {
	var employees []*models.Employee

	rows, err := e.conn.Query("CALL AllEmployees()")
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var employee models.Employee
		err = rows.Scan(&employee.Id, &employee.DeptName, &employee.FirstName, &employee.LastName, &employee.Salary, &employee.Gender, &employee.HireDate, &employee.UpdateAt, &employee.CreatedAt)
		if err != nil {
			return nil, err
		}
		employees = append(employees, &employee)
	}

	return employees, nil

}

func (e *employeeRepository) FindById(id string) (*models.Employee, error) {
	var employee models.Employee
	err := e.conn.QueryRow("CALL GetEmployeeById(?)", id).Scan(&employee.Id, &employee.DeptName, &employee.FirstName, &employee.LastName, &employee.Salary, &employee.Gender, &employee.HireDate, &employee.UpdateAt, &employee.CreatedAt)

	if err != nil {
		return nil, err
	}

	return &employee, nil
}

func (e *employeeRepository) UpdateEmployee(employee models.Employee) error {
	stmt, err := e.conn.Prepare("CALL UpdateEmployee(?,?,?,?,?,?,?)")
	if err != nil {
		return err
	}

	defer stmt.Close()
	_, err = stmt.Exec(employee.Id, employee.DeptName, employee.FirstName, employee.LastName, employee.Salary, employee.Gender, employee.HireDate)
	if err != nil {
		return err
	}

	return nil
}

func (e *employeeRepository) DeleteEmployee(id string) error {
	stmt, err := e.conn.Prepare("CALL DeleteEmployee(?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(id)
	if err != nil {
		return err
	}

	return nil
}
