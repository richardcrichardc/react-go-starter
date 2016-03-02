import React from 'react'
import { Link } from 'react-router'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>React Go Starter</h1>
        <img src="/static/feedme.jpg"/>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}


