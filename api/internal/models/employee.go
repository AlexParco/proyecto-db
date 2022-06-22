package models

import "time"

type Employee struct {
	Id        string    `json:"id"`
	DeptName  string    `json:"dept_name"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Salary    int       `json:"salary"`
	Gender    string    `json:"gender"`
	HireDate  string    `json:"hire_date"`
	UpdateAt  time.Time `json:"update_at"`
	CreatedAt time.Time `json:"created_at"`
}
