package config

import (
	"io/ioutil"
	"log"

	"gopkg.in/yaml.v3"
)

type MysqlConfig struct {
	Username     string `yaml:"username"`
	Password     string `yaml:"password"`
	DatabaseName string `yaml:"DBName"`
	Host         string `yaml:"host"`
	Port         string `yaml:"port"`
}

type MongoConfig struct {
	Host string `yaml:"host"`
	Port string `yaml:"port"`
}

type ApiConfig struct {
	MysqlConfig `yaml:"mysql"`
	MongoConfig `yaml:"mongo"`
	Port        string `yaml:"port"`
	JwtKey      string `yaml:"jwtkey"`
}

func New(path string) (ApiConfig, error) {

	buf, err := ioutil.ReadFile(path)
	if err != nil {
		log.Println(err)
	}

	var c ApiConfig
	err = yaml.Unmarshal(buf, &c)
	if err != nil {
		log.Println(err)
	}

	return c, nil
}
