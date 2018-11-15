
import React, { Component } from 'react';

import {
    NavLink
} from 'react-router-dom';


class FavoriteTable extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataFromServer: []

        }
        this.head = this.head.bind(this);
        this.body = this.body.bind(this);
    }


    componentDidMount(){
        this.props.facade.fetchMyFavorites()
            .then(res=> {
                this.setState({dataFromServer: res.results})})
            .catch(err => console.log(err));
        console.log(this.state.dataFromServer);
    }



    head() {
        return (
            <thead>
            <tr>
                <th>Name</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Gender</th>
            </tr>

            </thead>
        )
    }

    body(){
        const results = this.state.dataFromServer;
        console.log("favorites: " + results);
        // const inner = results.map((rowData, index) => {
        //     console.log(inner);
        //     return (
        //         <tr key={index}>
        //             <td>{rowData.name}</td>
        //
        //             <td>{rowData.height} cm</td>
        //             <td>{rowData.mass}</td>
        //             <td>{rowData.gender}</td>
        //         </tr>
        //     )
        // })

        return (
            <tbody>

            </tbody>
        )
    }

    render(){
        return(
            <div>
                <table className="table">
                    {this.head()}
                    {this.body()}
                </table>
                <NavLink activeClassName="active" to="/profilepage">
                    <button className="btn btn-default" >Back</button>
                </NavLink>
            </div>
        )
    }
}

export default FavoriteTable;