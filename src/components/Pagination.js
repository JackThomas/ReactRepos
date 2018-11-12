import React, { Component } from 'react';


export default class Pagination extends Component {

    constructor() {
        super();
        this.state = {
            currentPage: 1
        };

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(e) {
        this.props.currentPage(e.target.value);

        this.setState({
            currentPage: e.target.value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentPage !== this.state.currentPage) {
            // this.setState({ currentPage: nextProps.currentPage });   
        }
    }

    render() {
        // Search API only returns 1000 results
        const githubSearchReturns = (this.props.totalItems > 1000)? 1000 : this.props.totalItems;
        const paginationItems = Math.floor(githubSearchReturns / this.props.perPage);
        const result = Array.from({length: paginationItems},(v,k)=>k+1);

        return (
            <div className="pagination">
                <div className="component">
                    <ul >
                        <li className={this.state.currentPage === 1 ? 'disabled' : ''} onClick={this.handlePageChange} value={1}>&larr;</li>
                        { result.map(function(i){
                            if(i > this.state.currentPage - 4 && i < this.state.currentPage + 4){
                                return <li className={this.state.currentPage === i ? 'active' : ''}  key={ i } onClick={this.handlePageChange} value={i} > {i} </li>
                            } else {
                                return false
                            }
                        }, this) }

                        <li className={this.state.currentPage === paginationItems ? 'disabled' : ''} onClick={this.handlePageChange} value={paginationItems}>&rarr;</li>
                    </ul>
                </div>
            </div>
        );
    }
}
