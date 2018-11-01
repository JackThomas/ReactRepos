import React, { Component } from 'react';
// import SearchForm from './search';
import Nav from './Nav';
import RepoList from './RepoList';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      repos: [],
      loading: true,
      filterType: '',
      filterOrder: '',
      searchTerm: ''
    };
    
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilterType = this.handleFilterType.bind(this);
    this.handleFilterOrder = this.handleFilterOrder.bind(this);

  }

  handleSearch(searchUpdate) {
    this.setState({ searchTerm: searchUpdate });
  }

  handleFilterType(filterUpdate) {
    this.setState({ filterType: filterUpdate });
  }

  handleFilterOrder(filterUpdate) {
    this.setState({ filterOrder: filterUpdate });
  }

  render() {
    return (
      <div>
        <Nav search={this.handleSearch} filterType={this.handleFilterType} filterOrder={this.handleFilterOrder} />
        <RepoList searchTerm={this.state.searchTerm} filterType={this.state.filterType} filterOrder={this.state.filterOrder} />
      </div>
    );
  }
}
