import React, { Component } from 'react';
import RepoItem from './RepoItem';

export default class RepoList extends Component {

    constructor() {
        super();
        this.state = {
            searchTerm: '',
            repos: [],
            loading: true,
            repoTotalCount: 0,
            currentPage: null,
            pageCount: null,
            filterType: '',
            filterOrder: '',
            pageNumber: 1

        };
    }

    performSearch(query, filterType, filterOrder) {
        fetch(`https://api.github.com/search/repositories?q=${query}&page=${this.state.pageNumber}&per_page=20&sort=${filterType}&order=${filterOrder}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.total_count);
                console.log(`https://api.github.com/search/repositories?q=${query}&page=${this.state.pageNumber}&per_page=20&sort=${filterType}&order=${filterOrder}`);
                
                // return data.items;
                this.setState({ 
                    loading: false,
                    repos: data.items,
                    repoTotalCount: data.total_count
                });
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        }); 
    }
    
    componentDidMount() {
        this.setState({ filterType: this.props.filterType, filterOrder: this.props.filterOrder, });   
        this.performSearch(this.props.searchTerm);
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchTerm !== this.state.searchTerm) {
            this.setState({ searchTerm: nextProps.searchTerm, loading: true, repos: [] });   
            this.performSearch(nextProps.searchTerm, this.state.filterType, this.state.filterOrder)
        }

        if (nextProps.filterType !== this.state.filterType || nextProps.filterOrder !== this.state.filterOrder) {
            this.setState({ filterType: nextProps.filterType, filterOrder: nextProps.filterOrder, loading: true, repos: []});   
            this.performSearch(this.props.searchTerm, nextProps.filterType, nextProps.filterOrder)
        }
    }

    render() {
        let repos;

        if (this.state.repos) {
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
        } else if(this.props.searchTerm === '') {
            repos = <div className='repo-message'><h3>Please enter a search</h3></div>
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

                    {
                        (this.state.repoTotalCount > 20)
                        ? <p>pagination</p>
                        : ''
                    }

                </div>
            </div>

        )
    }
}