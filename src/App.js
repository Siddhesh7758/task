import React, { useState, useEffect } from "react";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedData);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (event) => {
    const countryName = event.target.name;
    if (event.target.checked) {
      setSelectedCountries([...selectedCountries, countryName]);
    } else {
      setSelectedCountries(
        selectedCountries.filter((name) => name !== countryName)
      );
    }
  };

  const handleShowSelected = () => {
    const filteredCountries = countries.filter((country) =>
      selectedCountries.includes(country.name.common)
    );
    setCountries(filteredCountries);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleShowAll = () => {
    setSearchTerm("")
    setSelectedCountries([])
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedData);
      })
      .catch((error) => console.error(error));
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Search countries"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="ml-3 m-3">
        <button
          className="bg-gray-400 p-2 rounded"
          onClick={handleShowSelected}
        >
          Show selected countries
        </button>
        <button className="bg-gray-400 p-2 rounded ml-2" onClick={handleShowAll}>
          Reset
        </button>
      </div>
      {filteredCountries.map((country) => (
        <div key={country.name.common}>
          <label>
            <input
              type="checkbox"
              name={country.name.common}
              onChange={handleSelect}
              checked={selectedCountries.includes(country.name.common)}
            />
            {country.name.common}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CountryList;
