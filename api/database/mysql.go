package database

import (
	"database/sql"
	"fmt"

	"github.com/alexparco/api/config"
	_ "github.com/go-sql-driver/mysql"
)

type MySQLDB struct {
	*sql.DB
}

func NewMySQLDB(c config.MysqlConfig) (*MySQLDB, error) {

	source := fmt.Sprintf("%s:%s@(%s:%s)/%s?parseTime=true", c.Username, c.Password, c.Host, c.Port, c.DatabaseName)

	db, err := sql.Open("mysql", source)

	if err != nil {
		return nil, err
	}

	return &MySQLDB{db}, nil
}
