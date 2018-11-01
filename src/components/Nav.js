import React, { Component } from 'react';


export default class Nav extends Component {

  constructor() {
    super();
    this.state = {
        filterType: '',
        filterOrder: '',
    };
  }

  filterChange(filterType, filterOrder){
    this.props.filterType(filterType);
    this.props.filterOrder(filterOrder);

    this.setState({ 
      filterType: filterType,
      filterOrder: filterOrder
    });
  }

  handleSubmit = e => {
      e.preventDefault();
      this.props.search(this.query.value);
      e.currentTarget.reset();
  }

  render() {
    return (
      <div className="navigation">
        <div className="component">
          <h1 className="navigation__title">Github Search API</h1>
        </div>
        <div className="navigation__controls-wrapper">
          <div className="component">
            <div className="navigation__controls">
              
              <form className="navigation__search-form" onSubmit={this.handleSubmit} >
                  <input type="text"
                      name="search"
                      ref={(input) => this.query = input}
                      placeholder="Search..." />
                  <input type="submit" value="Search"/>
              </form>

              <div className="navigation__button-wrap">
                <button className={ this.state.filterType === '' && this.state.filterOrder === '' ? 'active' : '' } onClick={this.filterChange.bind(this, '', '')}>Best Match</button>
                <button className={ this.state.filterType === 'stars' && this.state.filterOrder === 'desc' ? 'active' : '' } onClick={this.filterChange.bind(this, 'stars', 'desc')}>Stars Desc</button>
                <button className={ this.state.filterType === 'stars' && this.state.filterOrder === 'asc' ? 'active' : '' } onClick={this.filterChange.bind(this, 'stars', 'asc')}>Stars Asc</button>
                <button className={ this.state.filterType === 'forks' && this.state.filterOrder === 'desc' ? 'active' : '' } onClick={this.filterChange.bind(this, 'forks', 'desc')}>Forks Desc</button>
                <button className={ this.state.filterType === 'forks' && this.state.filterOrder === 'asc' ? 'active' : '' } onClick={this.filterChange.bind(this, 'forks', 'asc')}>Forks Asc</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
