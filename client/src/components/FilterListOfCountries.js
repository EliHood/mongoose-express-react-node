import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import '../App.css';

class FilterListOfCountries extends Component {
    componentDidMount() {
        console.log(this.props.location.state.response)
        console.log(this.props.location.state.response[0].translations)
    }

    backToHome = (e) => {
        this.props.history.push('/ListOfCountriesPage');
    }

    render() {
        return (
            <div>
                <Container>
                    <p> At the end of the page you will see a back button that takes you back to the previous page</p>
                    {this.props.location.state.response.map((country, i) => {
                        return (
                            <div className="border">
                                <h2 key={i}>Name: {country.name}</h2>
                                <p>Alpha3Code: {country.alpha3Code}</p>
                                <p>Area: {country.area}</p>
                                <p>Capital: {country.capital}</p>
                                <p>Cioc: {country.cioc}</p>
                                <p>Demonym: {country.demonym}</p>
                                <p>NumericCode: {country.numericCode}</p>
                                <p>Population: {country.population}</p>
                                <p>Region: {country.region}</p>
                                <p>NativeName: {country.nativeName}</p>
                                <p>Gini: {country.gini}</p>
                                <p>Subregion: {country.subregion}</p>
                                <img src={country.flag} alt="flag" width="100" height="50" />
                                <p>Timezones: {country.timezones[0]}</p>
                                {country.altSpellings.map(function (name, index) {
                                    return <p key={index}>{name}</p>;
                                })}
                            </div>)
                    })}
                    <Button size="sm" variant="danger" onClick={() => this.backToHome()}>Back</Button>
                </Container>
            </div>
        )
    }
}
export default FilterListOfCountries;