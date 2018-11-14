
import React, { Component } from 'react';

import {
    NavLink
} from 'react-router-dom';


class PlanetTable extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            dataFromServer: []
            
        }
        this.head = this.head.bind(this);
        this.body = this.body.bind(this);
    }


    componentDidMount(){
       
        this.props.facade.fetchAllPlanets()
        .then(res=> {
            this.setState({dataFromServer: res.results})})
        .catch(err => console.log(err));
    }

      

    head() {
        return (
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Gravity</td>
                    <td>Climate</td>
                    <td>Terrain</td>
                </tr>
                
            </thead>
        )
    }

    body(){
        const results = this.state.dataFromServer;
        const inner = results.map((rowData, index) => {
            return (
                <tr key={index}>
                    <td>{rowData.name}</td>
                    <td>{rowData.gravity}</td>
                    <td>{rowData.climate}</td>
                    <td>{rowData.terrain}</td>
                </tr>
            )
        })

        return (
            <tbody>
                {inner}
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
                <NavLink activeClassName="active" to="/loginPage">
                    <button className="btn btn-default" >Back</button>
                </NavLink>
            </div>
        )
    }
}

export default PlanetTable;