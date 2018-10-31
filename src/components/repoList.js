import React, { Component } from 'react';
import Repo from './repo';

export default class RepoList extends Component {

    constructor() {
        super();
        this.state = {
            searchTerm: 'x',
            repos: [],
            loading: true,
            repoTotalCount: 0,
            currentPage: null,
            pageCount: null,
            filterType: 'forks',
            filterOrder: 'desc',
            pageNumber: 1

        };
    }

    performSearch(query) {
        fetch(`https://api.github.com/search/repositories?q=${query}&page=${this.state.pageNumber}&per_page=20&sort=${this.state.filterType}&order=${this.state.filterOrder}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.total_count);
                console.log(`https://api.github.com/search/repositories?q=${query}&page=${this.state.pageNumber}&per_page=20&sort=${this.state.filterType}&order=${this.state.filterOrder}`);
                
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
        this.performSearch(this.props.searchTerm);
        this.setState({ filterType: this.props.filterType, filterOrder: this.props.filterOrder, });   
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchTerm !== this.state.searchTerm) {
            this.setState({ searchTerm: nextProps.searchTerm, loading: true });   
            this.performSearch(nextProps.searchTerm)
        }

        if (nextProps.filterType !== this.state.filterType) {
            this.setState({ filterType: nextProps.filterType, loading: true });   
            this.performSearch(this.props.searchTerm)
        }

        if (nextProps.filterOrder!== this.state.filterOrder) {
            this.setState({ filterOrder: nextProps.filterOrder, loading: true });   
            this.performSearch(this.props.searchTerm)
        }
    }

    render() {
        let repos;

        if (this.state.repos) {
            repos = this.state.repos.map(repo => 
                <Repo
                    name={repo.name}
                    url={repo.html_url}
                    description={repo.description}
                    forks={repo.forks}
                    stars={repo.stargazers_count}
                    owner_avatar={repo.owner.avatar_url}
                    key={repo.id}
                />);
        } else {
            repos = <div className='no-repos'>
                <h3>Sorry, no Repos match your search.</h3>
            </div>
        }

        
        return (
            
        <div className="component">

            <p>
                {this.props.searchTerm}
            </p>
            <p>
                {this.props.filterType} - {this.props.filterOrder}
            </p>
            <p>
                {this.state.repoTotalCount}
            </p>
            <div className="repo-list">
                
                {
                    (this.state.loading)
                    ? <p>Loading...</p>
                    : repos
                }

            </div>
        </div>

        )
    }
}