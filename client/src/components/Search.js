import React from 'react'

function Search({ handleInput, handleInputSearch, handleClearInput }) {
    return (
        <section className="searchbox-wrap">
            <input
                type="text"
                placeholder="Search for a country..."
                className="searchbox"
                onChange={handleInputSearch}
                onKeyPress={handleInput}
            // onKeyPress={search}
            />
            <button onClick={handleClearInput}>Clear input field</button>
        </section>
    )
}

export default Search

