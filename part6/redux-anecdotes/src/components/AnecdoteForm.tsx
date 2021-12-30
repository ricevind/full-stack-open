import React, { FormEvent } from "react";
import { useAppDispatch } from "../store";
import { anecdotesSlice } from "../store/anecdotesSlice";

export const AnecdoteForm = () => {
  const dispatch = useAppDispatch();

  const create = (anecdote: string) => {
    dispatch(anecdotesSlice.actions.create(anecdote));
  };

  const submitNewAnecdote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    create(event.currentTarget.anecdote.value);
    event.currentTarget.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};
