import React, { Component } from 'react';
import Repo from './repo';

export default class RepoList extends Component {

    // performSearch = (query = this.props.searchTerm) => {
    //     fetch(`https://api.github.com/search/repositories?q=${query}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data.total_count);

    //             return data.items;
    //         });
    //     // .catch(error => {
    //     //   console.log('Error fetching and parsing data', error);
    //     // }); 
    // }

    // if (results.length) {
    //     repos = results.map(repo => <Repo
    //         name={repo.name}
    //         url={repo.html_url}
    //         description={repo.description}
    //         forks={repo.forks}
    //         stars={repo.stargazers_count}
    //         owner_avatar={repo.owner.avatar_url}
    //         key={repo.id}
    //     />);
    // } else {
    //     repos = <div className='no-repos'>
    //         <h3>Sorry, no Repos match your search.</h3>
    //     </div>
    // }

    render() {
        return (
    
        <div className="component">
            <div className="repo-list">
                {/* {repos} */}
                {this.props.searchTerm}
                {this.props.filterType}
            </div>
        </div>

        )
    }
}