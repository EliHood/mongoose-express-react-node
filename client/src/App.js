import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ListOfCountriesPage from "./components/ListOfCountriesPage";
import NotFoundPage from "./components/NotFoundPage";
import SpecificCountry from "./components/SpecificCountry";
import FilterListOfCountries from "./components/FilterListOfCountries";
import SlotGame from "./components/SlotGame";
import SearchApi from "./components/SearchApi";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h2>New Mern Development learning</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to={"/"} className="nav-link">
                  Log in
                </Link>
              </li>
              <li>
                <Link to={"/RegisterPage"} className="nav-link">
                  Register
                </Link>
              </li>
              <li>
                <Link to={"/ListOfCountriesPage"} className="nav-link">
                  ListOfCountriesPage
                </Link>
              </li>
              <li>
                <Link to={"/SlotGame"} className="nav-link">
                  SlotGame
                </Link>
              </li>
              <li>
                <Link to={"/SearchApi"} className="nav-link">
                  *NewSearch
                </Link>
              </li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/RegisterPage" component={RegisterPage} />
            <Route
              path="/ListOfCountriesPage"
              component={ListOfCountriesPage}
            />
            <Route path="/NotFoundPage" component={NotFoundPage} />
            <Route path="/SpecificCountry" component={SpecificCountry} />
            <Route
              path="/FilterListOfCountries"
              component={FilterListOfCountries}
            />
            <Route path="/SlotGame" component={SlotGame} />
            <Route path="/SearchApi" component={SearchApi} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
