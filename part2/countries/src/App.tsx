import './App.css';

import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';

import { CountryWhether } from './Whether';

type Country = {
  name: { common: string; official: string };
  tld: string[];
  currencies: { [currency: string]: { name: string; symbol: string } };
  population: number;
  flag: string;
  capital: string;
};

function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json() as Promise<Country[]>)
      .then((responseBody) => setCountries(responseBody));
  }, []);

  return countries;
}

type CountriesFilterState = 'too-many' | 'many' | 'one' | 'empty';

function getCountriesFilterState(numberOfCountries: number): CountriesFilterState {
  if (numberOfCountries === 0) {
    return 'empty';
  }

  if (numberOfCountries === 1) {
    return 'one';
  }

  if (numberOfCountries <= 10) {
    return 'many';
  }

  return 'too-many';
}

function hasSubstring(s: string, t: string) {
  return t && s.toLowerCase().includes(t.toLowerCase());
}

const If = ({ true: test, children }: { true: boolean; children: ReactNode }) => (
  <> {test && (typeof children === 'function' ? children() : children)} </>
);

function App() {
  const countries = useCountries();
  const [searchTerm, setSearchTerm] = useState('');

  const foundCountries = countries.filter(({ name: { common, official } }) =>
    [common, official].some((name) => hasSubstring(name, searchTerm)),
  );

  const countriesFilterState = getCountriesFilterState(foundCountries.length);

  const singleCountry = foundCountries.find((_, index) => index === 0);
  const doesFilterStateMatch = (c: CountriesFilterState): boolean =>
    countriesFilterState === c;

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
        <If true={doesFilterStateMatch('too-many')}>
          <h2>To many countries found, specify search more</h2>
        </If>

        <If true={doesFilterStateMatch('many')}>
          {foundCountries.map((country) => (
            <div key={country.name.common}>
              <span>{country.name.common}</span>
              <button
                className="inline-block margin-left-1"
                onClick={() => setSearchTerm(country.name.common)}>
                Show
              </button>
            </div>
          ))}
        </If>

        <If true={doesFilterStateMatch('one')}>
          {() => (
            <>
              <p>{singleCountry.flag}</p>
              <pre>{JSON.stringify(singleCountry, null, 2)}</pre>
              <CountryWhether
                country={`${singleCountry.capital}, ${singleCountry.name.official}}`}></CountryWhether>
            </>
          )}
        </If>

        <If true={doesFilterStateMatch('empty')}>
          <h2>No country found</h2>
        </If>
      </div>
    </div>
  );
}

export default App;
