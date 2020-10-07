package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo"
)

// TODO Save historic heart rate data
var heartRate = 0

func main() {
	e := echo.New()

	e.GET("/heart", func(c echo.Context) error {
		return c.String(http.StatusOK, strconv.Itoa(heartRate))
	})

	e.POST("/heart/:rate", updateHeartRate)

	e.Logger.Fatal(e.Start(":8080"))
}

func updateHeartRate(c echo.Context) error {
	newHeartRate, err := strconv.Atoi(c.Param("rate"))
	if err != nil {
		return err
	}

	heartRate = newHeartRate

	return c.String(http.StatusOK, strconv.Itoa(heartRate))
}
