import React, { Component } from 'react';
// import SearchForm from './search';
import Nav from './Nav';
import RepoList from './repoList';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      repos: [],
      loading: true,
      filterType: 'stars-desc',
      searchTerm: 'web'
    };
    
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

  }


  handleSearch(searchUpdate) {
    this.setState({ searchTerm: searchUpdate });
  }

  handleFilter(filterUpdate) {
    this.setState({ filterType: filterUpdate });
  }

  render() {
    return (
      <div>
        <Nav search={this.handleSearch} filter={this.handleFilter} />
        <RepoList searchTerm={this.state.searchTerm} filterType={this.state.filterType} />
      </div>
    );
  }
}
