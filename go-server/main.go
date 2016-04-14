package main

import (
	"fmt"
	"go-server/web"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
)

func main() {
	web.ExecAllQueries(schema[:])

	mux := web.NewMux()

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
