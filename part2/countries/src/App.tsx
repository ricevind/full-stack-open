import './App.css';

import React, { ChangeEvent, useEffect, useState } from 'react';

type Country = {
  name: { common: string; official: string };
  tld: string[];
  currencies: { [currency: string]: { name: string; symbol: string } };
  population: number;
  flag: string;
};

function useCountries() {
  const [countries, setCountries] = useState<Country[] | null>(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json() as Promise<Country[]>)
      .then((responseBody) => setCountries(responseBody));
  }, []);

  return countries;
}

type CountriesFilterState = 'too-many' | 'many' | 'one';

function App() {
  const countries = useCountries();
  const [searchTerm, setSearchTerm] = useState('');

  const foundCountries = countries?.filter(
    (country) =>
      !!country?.name?.common?.includes(searchTerm) ||
      !!country?.name?.official?.includes(searchTerm),
  );

  const countriesFilterState: CountriesFilterState | null = !foundCountries
    ? null
    : foundCountries.length === 1
    ? 'one'
    : foundCountries.length < 10
    ? 'many'
    : 'too-many';

  const singleCountry = foundCountries?.[0];

  return (
    <div>
      <div>
        Search Country:{' '}
        <input
          type="text"
          value={searchTerm}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(event.target.value)
          }></input>
      </div>

      <div>
        {countriesFilterState === 'too-many' && (
          <h2>To many countries found, specify search more</h2>
        )}
        {countriesFilterState === 'many' &&
          foundCountries &&
          foundCountries.map((country) => (
            <p key={country.name.common}>{country.name.common}</p>
          ))}
        {countriesFilterState === 'one' && singleCountry && (
          <>
            <p>{singleCountry.flag}</p>
            <pre>{JSON.stringify(singleCountry, null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
