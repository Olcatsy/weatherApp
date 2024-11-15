import React, { useState }from "react";

const SearchBar = ({ setCity }) => {
  const [inputValue, setInputValue] = useState('')

  const handleCityInput = (e) => setInputValue(e.target.value)

  const handleSearch = (e) => {
    e.preventDefault()
    setCity(inputValue)
  }

  return (
    <form className='searchbar'>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => handleCityInput(e)}
        className='searchbar-input'
        placeholder='Search for a city'
      />
      <button
        onClick={(e) => handleSearch(e)}
        className='searchbar-submit'
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar;
