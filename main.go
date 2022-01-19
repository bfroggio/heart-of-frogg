package main

import (
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/spf13/viper"
)

var heartRate = 0

func main() {
	err := readConfigFile()
	if err != nil {
		log.Fatal("Could not read config file:", err.Error())
	}

	e := echo.New()
	e.Use(middleware.CORS())

	e.GET("/heart", func(c echo.Context) error {
		return c.String(http.StatusOK, strconv.Itoa(heartRate))
	})

	e.POST("/heart/:rate", updateHeartRate)

	e.Static("/ui", "ui")

	e.Logger.Fatal(e.Start(":" + viper.GetString("port")))
}

func updateHeartRate(c echo.Context) error {
	newHeartRate, err := strconv.Atoi(c.Param("rate"))
	if err != nil {
		return err
	}

	heartRate = newHeartRate

	return c.String(http.StatusOK, strconv.Itoa(heartRate))
}

func readConfigFile() error {
	viper.SetConfigName("config") // name of config file (without extension)
	viper.SetConfigType("toml")   // REQUIRED if the config file does not have the extension in the name
	viper.AddConfigPath(".")      // optionally look for config in the working directory
	err := viper.ReadInConfig()
	if err != nil {
		return err
	}

	return nil
}
