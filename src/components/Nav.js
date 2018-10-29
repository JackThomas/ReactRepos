import React, { Component } from 'react';
import SearchForm from './search';
import RepoList from './repoList';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      repos: [],
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  sortStars(direction) {
  
    const orderDirection = (direction === 'asc' || direction === 'desc') ? direction: 'Error - Thats not right';
    let repos;

    if(orderDirection === 'asc'){
      repos = this.state.repos.sort((a, b) => parseFloat(a.stargazers_count) - parseFloat(b.stargazers_count));
    }
    else if (orderDirection === 'desc') {
      repos = this.state.repos.sort((a, b) => parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count));
    }
    
    this.setState({
      repos: repos
    });
  }

  sortForks(direction) {
  
    const orderDirection = (direction === 'asc' || direction === 'desc') ? direction: 'Error - Thats not right';
    let repos;

    if(orderDirection === 'asc'){
      repos = this.state.repos.sort((a, b) => parseFloat(a.forks) - parseFloat(b.forks));
    }
    else if (orderDirection === 'desc') {
      repos = this.state.repos.sort((a, b) => parseFloat(b.forks) - parseFloat(a.forks));
    }
    
    this.setState({
      repos: repos
    });
  }

  performSearch = (query = 'web') => {
    fetch(`https://api.github.com/search/repositories?q=${query}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.total_count);

        this.setState({
          query: query,
          repos: data.items,
          loading: false,
          totalRepos: data.total_count
        });
      });
    // .catch(error => {
    //   console.log('Error fetching and parsing data', error);
    // });    
  }

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">RepoSearch</h1>
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>

        <button onClick={() => this.sortStars('desc')}>Stars Desc</button>
        <button onClick={() => this.sortStars('asc')}>Stars Asc</button>

        <button onClick={() => this.sortForks('desc')}>Forks Desc</button>
        <button onClick={() => this.sortForks('asc')}>Forks Asc</button>

        <div className="main-content">
          {
            (this.state.loading)
              ? <p>Loading...</p>
              : <div><h2>{this.state.query}</h2><RepoList data={this.state.repos} /></div>
          }
        </div>
      </div>
    );
  }
}
