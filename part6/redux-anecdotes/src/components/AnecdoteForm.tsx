import React, { FormEvent } from "react";
import { useAppDispatch } from "../store/hooks";
import { createAnecdoteCreateThunk } from "../store/anecdotesSlice";

export const AnecdoteForm = () => {
  const dispatch = useAppDispatch();

  const submitNewAnecdote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(createAnecdoteCreateThunk(event.currentTarget.anecdote.value));
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
