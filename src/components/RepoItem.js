import React from 'react';

const RepoItem = props => (
    <div className="repo-item">
        <a href={props.url} target="_blank" rel="noopener noreferrer">
            <div className="repo-item__inner">
                <img className="repo-item__image" src={props.owner_avatar} alt={props.name} />
                <div className="repo-item__details" >
                    <p className="repo-item-details__name">{props.name}</p>
                    <p className="repo-item-details__description"><span>{props.description}</span></p>
                    <span className="repo-item-details__forks"><span>Forks: </span>{props.forks}</span>
                    <span className="repo-item-details__stars"><span>Stars: </span>{props.stars}</span>
                </div>
            </div>
        </a>
    </div>
);

export default RepoItem;