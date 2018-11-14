
import React, { Component } from 'react';

import {
    NavLink
} from 'react-router-dom';


class PersonTable extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            dataFromServer: [],
            species: []
        }
        this.head = this.head.bind(this);
        this.body = this.body.bind(this);
    }


    componentDidMount(){
       
        this.props.facade.fetchAllPersons()
        .then(res=> {
            this.setState({dataFromServer: res.results})})
        .catch(err => console.log(err));
    }

      

    head() {
        return (
            <thead>
                <tr>
                    <td>Name</td>
                   
                    <td>Height</td>
                    <td>Mass</td>
                    <td>Gender</td>
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
                  
                    <td>{rowData.height}</td>
                    <td>{rowData.mass}</td>
                    <td>{rowData.gender}</td>
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

export default PersonTable;