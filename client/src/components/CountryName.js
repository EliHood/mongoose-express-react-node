import React from 'react'

function CountryName(props) {
    return (
        <>
            <li>{props.country.name}</li>
        </>
    )
}

export default CountryName;