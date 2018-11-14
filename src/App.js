import React, { Component } from "react";
import facade from "./apiFacade";
import { HashRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import ShipTable from "./ShipTable";
import PersonTable from "./PersonTable";
import PlanetTable from "./PlanetTable";


class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  login = evt => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };

  render() {
    return (
      <div id="loginBox" className="absolute-center">
        <h3 className="text-center mb-4">Login</h3>
        <form
          className="text-center"
          onSubmit={this.login}
          onChange={this.onChange}
        >
          <div className="form-group mb-4"><input
              className="form-control text-center"
              type="text"
              id="username"
              placeholder="username"
              required
            />
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control text-center"
              type="password"
              id="password"
              placeholder="password"
              required
            />
          </div>
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }
  componentDidMount() {
    facade.fetchData().then(res => this.setState({ dataFromServer: res }));
  }
  render() {
    return (
      <div>
        <h3>{this.state.dataFromServer}</h3>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  };
  login = (user, pass) => {
    facade.login(user, pass).then(res => this.setState({ loggedIn: true }));
  };

  render() {
    return (
      <Router>
        <Switch>
          <div>
            <NavMenu />
            <div className="container-fluid">
              <Route exact path="/" render={() => <div><WelcomeMessage/></div>} />
              <Route path="/profilepage" render={() => <div>
                {!this.state.loggedIn ? (
                <LogIn login={this.login} />
              ) : (
                <div>
                  <LoggedIn />
                  <button onClick={this.logout}>Logout</button>
                </div>
              )}
              </div>}/>
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}

const NavMenu = ({match}) => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark mb-4">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/profilepage">
            Profile Page
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const WelcomeMessage = ({ match }) => {
  return (
    <div>
      <h1>Welcome to CA3</h1>
      <p>
        Click <NavLink to="/profilepage">here</NavLink> to go to your profile page.
      </p>
    </div>
  );
};

export default App;
