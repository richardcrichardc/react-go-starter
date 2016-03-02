package main

import (
	"log"
	"net/http"
)

type Mux struct {
	*http.ServeMux
}

func NewMux() *Mux {
	return &Mux{http.NewServeMux()}
}

func (mux *Mux) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	lw := &LogResponseWriter{w, 200}
	mux.ServeMux.ServeHTTP(lw, r)
	log.Printf("%d %s %s", lw.status, r.Method, r.URL.Path)
}

func (mux *Mux) Static(pattern, dir string) {
	handler := http.StripPrefix(pattern, http.FileServer(http.Dir(dir)))

	mux.HandleFunc(pattern, func(w http.ResponseWriter, r *http.Request) {
		// StripPrefix mangles the request.URL
		// So copy it so the request logger logs the correct URL
		URLCopy := *r.URL
		rCopy := *r
		rCopy.URL = &URLCopy

		handler.ServeHTTP(w, &rCopy)
	})
}

type LogResponseWriter struct {
	http.ResponseWriter
	status int
}

func (lw *LogResponseWriter) WriteHeader(status int) {
	lw.status = status
	lw.ResponseWriter.WriteHeader(status)
}
