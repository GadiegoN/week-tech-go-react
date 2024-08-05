package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"os/signal"

	"github.com/gadiegon/week-tech-go-react/server/internal/api"
	"github.com/gadiegon/week-tech-go-react/server/internal/store/pgstore"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}

	ctx := context.Background()

	pool, err := pgxpool.New(ctx, fmt.Sprintf(
		"user=%s password=%s host=%s port=%s dbname=%s",
		os.Getenv("WSGN_DATABASE_USER"),
		os.Getenv("WSGN_DATABASE_PASSWORD"),
		os.Getenv("WSGN_DATABASE_HOST"),
		os.Getenv("WSGN_DATABASE_PORT"),
		os.Getenv("WSGN_DATABASE_Name"),
	))

	if err != nil {
		panic(err)
	}

	defer pool.Close()

	if err := pool.Ping(ctx); err != nil {
		panic(err)
	}

	handler := api.NewHandler(pgstore.New(pool))

	go func() {
		if err := http.ListenAndServe(":8086", handler); err != nil {
			if !errors.Is(err, http.ErrServerClosed) {
				panic(err)
			}
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
}
