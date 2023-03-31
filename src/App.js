import React, { useState, useEffect } from "react";
import { FormControlLabel, Switch } from "@mui/material";
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
    
    <div className="w-screen h-screen flex items-center justify-center">

      <style>
        {`
          ::-webkit-scrollbar {
            width: 0.5rem;
            border-radius: 9999px;
          }

          ::-webkit-scrollbar-track {
            background: transparent;
          }

          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 9999px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>

      <div className="absolute rounded-[14px] bg-white shadow-[9px_32px_35px_rgba(0,_0,_0,_0.05)] flex flex-col p-5 items-start justify-start border-[1px] border-solid border-gainsboro-100">
        <div className="flex flex-col items-start justify-start">
          <input
            className="border-b border-custom-gray font-campton text-base bg-[transparent] self-stretch relative h-8 shrink-0"
            type="text"
            placeholder="Search"
            onChange={handleSearch}
          />
          <div className="w-[454px] flex flex-row py-[23px] px-0 box-border items-center justify-between">
            <FormControlLabel
              className="relative"
              label="Show selected only"
              control={<Switch color="primary" size="medium" />}
              onClick={handleShowSelected}
            />
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-[60px] h-[22px] shrink-0" onClick={handleShowAll}>
              <div className="absolute top-[calc(50%_-_11px)] left-[0%] text-base tracking-[-0.5px] leading-[22px] font-medium font-campton text-black text-left">
                Clear all
              </div>
            </button>
          </div>
          {/* below srcollbar with countries code */}
          <div className="self-stretch relative h-[247px] shrink-0 overflow-y-auto">
              {filteredCountries.map((country) => (
                <div key={country.name.common}>
                  <label className="h-10 flex items-center">
                    <input
                      type="checkbox"
                      name={country.name.common}
                      onChange={handleSelect}
                      checked={selectedCountries.includes(country.name.common)}
                      className="mr-2"
                    />
                    {country.name.common}
                  </label>
                </div>
              ))}
            </div>
          {/* below line code */}
          <div className="relative rounded-xl bg-whitesmoke w-[437.12px] h-px shrink-0" />

          <div className="self-stretch flex flex-col pt-5 px-0 pb-0 items-end justify-center">
            <button className="cursor-pointer [border:none] p-0 bg-green rounded-[50px] flex flex-row items-start justify-start">
              <div className="rounded-[27.5px] flex flex-row py-2 px-[25px] items-center justify-center border-[1px] border-solid border-green">
                <div className="relative text-base tracking-[-0.5px] font-campton-book text-white text-center">
                  Save
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryList;
