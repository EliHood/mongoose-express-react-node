import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import CountryName from './CountryName';
const axios = require('axios');

const SearchApi = () => {
    const [listOfCountries, setListOfCountries] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const filterByValue = (array, string) => {
        let data
        return data = array.filter((country) => {
            return country.name.toLowerCase().includes(string.toLowerCase());
        });
    }

    const ClearInput = () => {
        setSearchQuery('');
    }

    const fetchNews = () => {
        let url = `/api/countries/filterBySearch/?search=${searchQuery}`;
        axios({
            method: 'get',
            url,
        })
            .then((response) => {
                console.log(response.data);
                let result = filterByValue(response.data, searchQuery);
                setListOfCountries(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchNews()
    }, [searchQuery])

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div>
            <Container>
                <form>
                    <p>Search for a Country name</p>
                    <input type="text" value={searchQuery} onChange={handleChange} />
                    <button onClick={ClearInput}>Clear input field</button>
                </form>
                {listOfCountries.map(country => (
                    <CountryName country={country} />
                ))}

            </Container>
        </div>
    )
}

export default SearchApi;