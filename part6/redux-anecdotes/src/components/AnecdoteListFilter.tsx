import React, { ChangeEvent } from "react";
import { useAppDispatch } from "../store";
import { anecdotesSlice } from "../store/anecdotesSlice";

export const AnecdoteListFilter = () => {
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      anecdotesSlice.actions.filter(event.currentTarget.value || undefined)
    );
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};
