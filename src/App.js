import React, { useState, useEffect } from "react";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <input className="w-40 border-black"
        type="text"
        placeholder="Search countries"
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredCountries.map((country) => (

        <div key={country.name.common} class="flex items-center">
          <input
            id="link-checkbox"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="link-checkbox"
            class="ml-2 text-sm font-medium text-gray-600 "
          >
            <h2>{country.name.common}</h2>
          </label>
        </div>
      ))}
    </div>
  );
}

export default CountryList;
