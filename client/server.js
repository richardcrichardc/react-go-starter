import http from 'http'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import fs from 'fs'
import { createPage, write, writeError, writeNotFound, redirect } from './utils/server-utils'
import routes from './routes/RootRoute'

const PORT = process.env.PORT || 3005

var render;
if (process.env.NODE_ENV == 'production') {
  render = renderToString
} else {
  render = (component) => { return '' }
}

function renderApp(props, res) {
  const markup = render(<RoutingContext {...props}/>)
  const html = createPage(markup)
  write(html, 'text/html', res)
}

http.createServer((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error)
      writeError('ERROR!', res)
    else if (redirectLocation)
      redirect(redirectLocation, res)
    else if (renderProps)
      renderApp(renderProps, res)
    else
      writeNotFound(res)
  })
}).listen(PORT)

console.log(`listening on port ${PORT}`)