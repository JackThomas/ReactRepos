import React from 'react';

const Repo = props => (
    <div className="repo-item">
        <img className="repo-item__image" src={props.owner_avatar} alt={props.name} />
        <div className="repo-item__details" >
            <a href={props.url} target="_blank" rel="noopener noreferrer">{props.name}</a>
            <span>{props.description}</span>
            <span className="forks">{props.forks}</span>
            <br />
            <span className="repo-item__stars">{props.stars}</span>
        </div>

    </div>
);

export default Repo;