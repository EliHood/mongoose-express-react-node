import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import '../App.css';

class SpecificCountry extends Component {
    componentDidMount() {
        // console.log(this.props.location.state.response)
        // console.log(this.props.location.state.response[0].name)
        console.log(this.props.location.state.response[0].translations)
    }

    backToHome = (e) => {
        this.props.history.push('/ListOfCountriesPage');
    }

    render() {
        const { name, alpha3Code, borders, area, nativeName, capital, cioc, gini, demonym, numericCode, population, region, subregion, translations, languages, altSpellings, flag } = this.props.location.state.response[0];

        const translation = Object.keys(translations).map((key) =>
            <p value={key}>{key}: {translations[key]}</p>
        )

        return (
            <div>
                <Container>
                    <div className="border">
                        <h2>Name: {name}</h2>
                        <p>Alpha3Code: {alpha3Code}</p>
                        <p>Area: {area}</p>
                        <p>Capital: {capital}</p>
                        <p>Cioc: {cioc}</p>
                        <p>Demonym: {demonym}</p>
                        <p>NumericCode: {numericCode}</p>
                        <p>Population: {population}</p>
                        <p>Region: {region}</p>
                        <p>NativeName: {nativeName}</p>
                        <p>Gini: {gini}</p>
                        {this.props.location.state.response[0].borders.map((name) => {
                            return <p>{name}</p>;
                        })}
                        <p>Subregion: {subregion}</p>
                        <img src={flag} alt="flag" width="100" height="50" />
                        {altSpellings.map(function (name, index) {
                            return <p key={index}>{name}</p>;
                        })}
                        {languages.map((item, i) => <li key={i}>{item.iso639_1}</li>)}
                        <p>Timezones: {this.props.location.state.response[0].timezones[0]}</p>
                        <p>Translations</p>
                        <hr></hr>
                        {translation}
                    </div>
                </Container>

                <Button size="sm" variant="danger" onClick={() => this.backToHome()}>Back</Button>
            </div>
        )
    }
}
export default SpecificCountry;