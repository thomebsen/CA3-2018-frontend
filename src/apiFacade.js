import decode from "jwt-decode";

const URL = require('../package.json').config.url;

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({status: res.status, fullError: res.json()});
    }
    return res.json();
}

class ApiFacade {
    fetchData = (role) => {
        const options = this.makeOptions("GET", true); //True add's the token
        return fetch(URL + "/api/info/" + role, options)
            .then(handleHttpErrors);
    };

    setToken = token => {
        localStorage.setItem("jwtToken", token);
    };

    getToken = () => {
        return localStorage.getItem("jwtToken");
    };

    loggedIn = () => {
        const loggedIn = this.getToken() != null;
        return loggedIn;
    };

    logout = () => {
        localStorage.removeItem("jwtToken");
    };

    getProfile = () => {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }

    login = (user, pass) => {
        const options = this.makeOptions("POST", true, {
            username: user,
            password: pass
        });

        return fetch(URL + "/api/login", options, true)
            .then(handleHttpErrors)
            .then(res => {
                this.setToken(res.token);
            });
    };


    fetchAllSpaceships = () => {
        const options = this.makeOptions("GET");
        return fetch(URL + "/api/swapi/info/spaceships", options, true)
            .then(handleHttpErrors)
    }
    fetchAllPersons = () => {
        const options = this.makeOptions("GET");
        return fetch(URL + "/api/swapi/person", options, true)
            .then(handleHttpErrors)
    }

    fetchAllDummy = () => {
        const options = this.makeOptions("GET");
        return fetch(URL + "/api/dummy", options, true)
            .then(handleHttpErrors)
    }

    fetchSinglePerson = () => {
        const options = this.makeOptions("GET");
        return fetch(URL + "/api/swapi/persons/1", options, true)
            .then(handleHttpErrors)
    }

    fetchFavorites = () => {
        const options = this.makeOptions("GET");
        return fetch(URL + "/api/swapi/favorit", options, true)
            .then(handleHttpErrors)
    }


    makeOptions(method, addToken, body) {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json"
            }
        };
        if (addToken && this.loggedIn()) {
            opts.headers["x-access-token"] = this.getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
}

const facade = new ApiFacade();
export default facade;
