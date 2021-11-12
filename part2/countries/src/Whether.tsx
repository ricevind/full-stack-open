import React, { useEffect, useState } from 'react';

const api_key = import.meta.env.VITE_WHEATHER_API;

export function useWeather(query: string) {
  const [whether, setWhether] = useState<any>(null);

  const { signal, abort } = new AbortController();
  const q = `query=${query}`;

  useEffect(() => {
    setWhether(null);
    console.log(query);
    fetch(`http://api.weatherstack.com/current?access_key=${api_key}&${q.toString()}`, {
      signal,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        setWhether({ data });
      })
      .catch((error) => setWhether({ error }));

    return () => abort();
  }, [query]);

  return [whether];
}

export function CountryWhether({ country }: { country: string }) {
  const [weather] = useWeather(country);

  if (weather && weather.data) {
    return <pre> {JSON.stringify(weather.data, null, 2)}</pre>;
  }

  if (weather && weather.error) {
    return <pre> {JSON.stringify(weather.error, null, 2)}</pre>;
  }

  return <p>...Loading</p>;
}
