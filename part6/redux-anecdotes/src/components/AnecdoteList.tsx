import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { anecdotesSlice } from "../store/anecdotesSlice";
import { stableSort } from "../utils/stable-sort";

export const AnecdoteList = () => {
  const sortedIds = useRef<string[]>([]);
  const dispatch = useAppDispatch();

  const anecdotes = useAppSelector((state) => {
    const { entitiesList, lastSortIds } = stableSort(
      state.anecdotes,
      sortedIds.current,
      (a, b) => b.votes - a.votes
    );
    sortedIds.current = lastSortIds;
    return entitiesList;
  });

  const vote = (id: string) => {
    dispatch(anecdotesSlice.actions.vote(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
