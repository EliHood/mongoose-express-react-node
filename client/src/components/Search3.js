import React from 'react'

function Search({ handleInputSearch, search }) {
    return (
        <section className="searchbox-wrap">
            <input
                type="text"
                placeholder="Search for a country..."
                className="searchbox"
                onChange={handleInputSearch}
                onKeyPress={search}
            />
        </section>
    )
}

export default Search