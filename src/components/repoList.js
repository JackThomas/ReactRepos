import React from 'react';
import Repo from './repo';

const RepoList = props => {

    const results = props.data;
    let repos;
    if (results.length) {
        repos = results.map(repo => <Repo
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
            <div className="repo-list">
                {repos}
            </div>
        </div>
    );
}

export default RepoList;
