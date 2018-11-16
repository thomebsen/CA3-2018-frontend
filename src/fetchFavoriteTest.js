import React, { Component } from "react";

import { NavLink } from "react-router-dom";

class PersonTable extends Component {
  constructor() {
    super();
    this.state = { theFetchedData : [] };
  }
  componentDidMount() {
    fetch("http://localhost:8084/jwtbackend/api/swapi/favorit")
    .then(results => {
      return results.json();
    }).then(data => {
        let pictures = data.map((t, index) => {
            console.log(data)
            return(
                <ul key={index}>
                  <li>{t.name}</li>
                </ul>
            )
        })
        this.setState({theFetchedData : pictures})
        console.log(this.state.theFetchedData)
      })
  }
  render() {
    return (
      <div>
        <h3>Favorite characters:</h3>
        <div>
            {this.state.theFetchedData}
            {console.log(this.state)}
        </div>
          <NavLink activeClassName="active" to="/profilepage">
              <button className="btn btn-default" >Back</button>
          </NavLink>
      </div>
    );
  }
}

export default PersonTable;
