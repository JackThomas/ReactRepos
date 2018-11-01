import React, { Component } from 'react';
import RepoItem from './RepoItem';
import Pagination from './Pagination';

export default class RepoList extends Component {

    constructor() {
        super();
        this.state = {
            initialSearch: true,
            searchTerm: '',
            repos: [],
            loading: true,
            repoTotalCount: 0,
            currentPage: 1,
            perPage: 20,
            filterType: '',
            filterOrder: ''
        };

        this.handlePagination = this.handlePagination.bind(this);

    }

    performSearch(query, filterType, filterOrder, pageNumber) {
        fetch(`https://api.github.com/search/repositories?q=${query}&page=${pageNumber}&per_page=${this.state.perPage}&sort=${filterType}&order=${filterOrder}`)
            .then(response => response.json())
            .then(data => {
                console.log(`https://api.github.com/search/repositories?q=${query}&page=${pageNumber}&per_page=${this.state.perPage}&sort=${filterType}&order=${filterOrder}`);
                
                this.setState({ 
                    initialSearch: false, 
                    loading: false,
                    repos: data.items,
                    repoTotalCount: data.total_count
                });
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        }); 
    }

    handlePagination(currentPage) {
        this.setState({ loading: true, currentPage: currentPage });
        this.performSearch(this.props.searchTerm, this.state.filterType, this.state.filterOrder, currentPage);
    }
    
    componentDidMount() {
        this.setState({ filterType: this.props.filterType, filterOrder: this.props.filterOrder, });   
        this.setState({ loading: false, initialSearch: true });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchTerm !== this.state.searchTerm) {
            this.setState({ initialSearch: false, searchTerm: nextProps.searchTerm, loading: true, repos: [] });   
            this.performSearch(nextProps.searchTerm, this.state.filterType, this.state.filterOrder, this.state.currentPage);
        }

        if (nextProps.filterType !== this.state.filterType || nextProps.filterOrder !== this.state.filterOrder) {
            this.setState({ initialSearch: false, filterType: nextProps.filterType, filterOrder: nextProps.filterOrder, loading: true, repos: []});   
            this.performSearch(this.props.searchTerm, nextProps.filterType, nextProps.filterOrder, this.state.currentPage);
        }
    }

    render() {
        let repos;

        if(this.state.initialSearch === true) {
            repos = <div className='repo-message'><h3>Please enter a search</h3></div>
        } else if (this.state.repos) {
            repos = this.state.repos.map(repo => 
                <RepoItem
                    name={repo.name}
                    url={repo.html_url}
                    description={repo.description}
                    forks={repo.forks}
                    stars={repo.stargazers_count}
                    owner_avatar={repo.owner.avatar_url}
                    key={repo.id}
                />);
        } else {
            repos = <div className='repo-message'><h3>Sorry, no repos match '{this.props.searchTerm}'.</h3></div>
        }
        
        return (
            
            <div className="component">

                {this.props.searchTerm !== '' &&
                    <div className="repo-search-info">
                        <div className="repo-search-info--term">
                            <p><span>Showing Results For: </span>{this.props.searchTerm}</p>
                        </div>
                        <div className="repo-search-info--count">
                            <p><span>Results: </span>{this.state.repoTotalCount}</p>
                        </div>
                    </div>
                }

                <div className="repo-list">
                    
                    {
                        (this.state.loading)
                        ? <div className="repo-message"><h3>Loading...</h3></div>
                        : repos
                    }

                    {this.state.repoTotalCount > 20 &&
                        <Pagination currentPage={this.handlePagination} perPage={this.state.perPage} />
                    }

                </div>
            </div>

        )
    }
}


