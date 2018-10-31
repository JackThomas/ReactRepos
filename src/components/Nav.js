import React, { Component } from 'react';


export default class Nav extends Component {

  filterChange(filterType, filterOrder){
    this.props.filterType(filterType);
    this.props.filterOrder(filterOrder);
  }

  handleSubmit = e => {
      e.preventDefault();
      this.props.search(this.query.value);
      e.currentTarget.reset();
  }

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">RepoSearch</h1>
            <form className="search-form" onSubmit={this.handleSubmit} >
                <label className="is-hidden" htmlFor="search">Search</label>
                <input type="search"
                    name="search"
                    ref={(input) => this.query = input}
                    placeholder="Search..." />
            </form>
          </div>
        </div>

        <button onClick={this.filterChange.bind(this, 'stars', 'desc')}>Stars Desc</button>
        <button onClick={this.filterChange.bind(this, 'stars', 'asc')}>Stars Asc</button>

        <button onClick={this.filterChange.bind(this, 'forks', 'desc')}>Forks Desc</button>
        <button onClick={this.filterChange.bind(this, 'forks', 'asc')}>Forks Asc</button>

      </div>
    );
  }
}
