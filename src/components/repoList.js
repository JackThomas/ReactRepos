import React from 'react';
import Repo from './repo';
import NoRepos from './noRepos';

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
        repos = <NoRepos />
    }

    return (
        <ul className="repo-list">
            {repos}
        </ul>
    );
}

export default RepoList;
