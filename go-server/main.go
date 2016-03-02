package main

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
)

func main() {
	log.SetFlags(log.Ldate | log.Ltime)

	//loadConfig()
	//initDatabase()

	mux := NewMux()

	mux.Static("/static/", "static")
	mux.Static("/gen/", "gen")

	nodeProxyURL, err := url.Parse("http://localhost:3005")
	qpanic(err)
	mux.Handle("/", httputil.NewSingleHostReverseProxy(nodeProxyURL))

	fmt.Println("Listening")
	log.Fatal(http.ListenAndServe(":3002", mux))
}

func qpanic(err error) {
	if err != nil {
		panic(err)
	}
}
