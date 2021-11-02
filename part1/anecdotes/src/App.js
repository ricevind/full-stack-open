import React, { useState, useRef } from "react";

const arrayMaxIndex = (array) =>
  array.reduce(
    (currentMaxIndex, candidateValue, i) =>
      candidateValue > array[currentMaxIndex] ? i : currentMaxIndex,
    0
  );

function useMostVotedIndex(votes) {
  const lastMostVotedRef = useRef([null, null]); // [index, value]
  const  [lastMostVotedIndex, lastMostVotedValue]  = lastMostVotedRef.current;
  
  const nextMostVotedIndex = arrayMaxIndex(votes);
  const nextMostVotedValue = votes[nextMostVotedIndex];

 if (nextMostVotedValue > lastMostVotedValue) {
  lastMostVotedRef.current = [nextMostVotedIndex, nextMostVotedValue];
  return nextMostVotedIndex
 }

 return lastMostVotedIndex
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.from({ length: anecdotes.length }, () => 0)
  );
  const mostVotedIndex = useMostVotedIndex(votes);

  const nextAnecdote = () => {
    let nextAnecdoteIndex;

    while (true) {
      nextAnecdoteIndex = Math.floor(Math.random() * anecdotes.length);
      if (nextAnecdoteIndex !== selected) {
        break;
      }
    }

    setSelected(nextAnecdoteIndex);
  };

  const vote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const mostVotedAnecdote = anecdotes[mostVotedIndex];

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <button onClick={nextAnecdote}>next anecdote</button>
        <button onClick={vote}>vote</button>
        <p>{anecdotes[selected]}</p>
        <p>votes: {votes[selected]}</p>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{mostVotedAnecdote}</p>
      </div>
    </>
  );
};

export default App;
