import './App.css';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

type Person = {
  name: string;
};

type Persons = Person[];

function useIncludes<Elem>(arr: Elem[]): [(elem: Elem) => boolean] {
  const includes = (elem: Elem) => arr.includes(elem);

  return [includes];
}

function usePersons() {
  const [persons, setPersons] = useState<Persons>([]);

  useEffect(() => {
    const url = 'http://localhost:3001/persons';

    fetch(url)
      .then((response) => response.json())
      .then((responseBody) => {
        const arePersons = (rb: unknown): rb is Persons =>
          Array.isArray(responseBody) && 'name' in responseBody[0];

        if (arePersons(responseBody)) {
          return responseBody;
        }
        throw new Error('API did not returned compatible response');
      })
      .then((responseBody) => setPersons(responseBody));
  }, []);

  return [persons, setPersons] as const;
}

function App(): JSX.Element {
  const [persons, setPersons] = usePersons();
  const [newName, setName] = useState<string>('');
  const [nameAlreadyExist] = useIncludes(persons.map(({ name }) => name));

  const onAddPerson = (e: FormEvent) => {
    e.preventDefault();

    if (nameAlreadyExist(newName)) {
      alert(`${newName} was already defined`);
      return;
    }

    const newPerson: Person = { name: newName };
    setPersons(persons.concat(newPerson));
    setName('');
  };

  const onNewNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onAddPerson}>
        <div>
          name: <input value={newName} onChange={onNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
}

export default App;
