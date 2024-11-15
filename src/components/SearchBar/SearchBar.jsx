import React, { useState }from "react";

const SearchBar = ({ setCity, fetchData }) => {
  const [inputValue, setInputValue] = useState('')

  const handleCityInput = (e) => setInputValue(e.target.value)

  const handleSearch = (e) => {
    e.preventDefault()
    setCity(inputValue)
    fetchData()
  }

  return (
    <form>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => handleCityInput(e)}
      />
      <button onClick={(e) => handleSearch(e)}>
        Search
      </button>
    </form>
  )
}

export default SearchBar;
