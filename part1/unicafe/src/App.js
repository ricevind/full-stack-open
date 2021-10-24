import React, { useState } from "react";

const addOneTo = (counterSetter) => () =>
  counterSetter((counter) => counter + 1);

const toPrecision = (value) => value.toPrecision(4);
const toPercentage = (value) => `${toPrecision(value * 100)} %`;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div style={{ padding: "0 1rem" }}>
      <h1>Gib fitBack</h1>
      <div>
        <Button onClickHandle={addOneTo(setGood)}>good</Button>
        <Button onClickHandle={addOneTo(setNeutral)}>neutral</Button>
        <Button onClickHandle={addOneTo(setBad)}>bad</Button>
      </div>

      <Statistics {...{ good, bad, neutral }}></Statistics>
    </div>
  );
};

export default App;

const Button = ({ onClickHandle, children }) => (
  <button onClick={onClickHandle}>{children}</button>
);

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = toPrecision(all && (good - bad) / all);
  const positive = toPercentage(all && good / all);

  if (all === 0) {
    return <p>No fitBack gibed</p>;
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />

          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};
