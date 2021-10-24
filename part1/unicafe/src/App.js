import React, { useState } from "react";

const addOneTo = (counterSetter) => () =>
  counterSetter((counter) => counter + 1);

const toPrecision = (value) => value.toPrecision(4);
const toPercentage = (value) => `${toPrecision(value * 100)} %`;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = toPrecision(all && (good - bad) / all);
  const positive = toPercentage(all && good / all);

  return (
    <div>
      <h1>Gib fitBack</h1>
      <div>
        <button onClick={addOneTo(setGood)}>good</button>
        <button onClick={addOneTo(setNeutral)}>neutral</button>
        <button onClick={addOneTo(setBad)}>bad</button>
      </div>

      <h1>Statistics</h1>
      <div>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
      </div>

      <div>
        <p>all: {all}</p>
        <p>average: {average}</p>
        <p>positive: {positive}</p>
      </div>
    </div>
  );
};

export default App;
