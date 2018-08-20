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
    const { query } = this.state
    if (query === "") return
    this.props.search(query)
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
