import React, { Component } from 'react'

export default class SearchBar extends Component {

  state = {
    query: "",
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.query === "") return
    this.props.search(this.state.query)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.query} onChange={this.handleChange} />
        <br />
        <button type="submit">Search</button>
      </form>
    )
  }
}
