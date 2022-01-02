import React, { FormEvent } from "react";
import { NotificationType } from "../models/notification.model";
import { useAppDispatch } from "../store";
import { anecdotesSlice } from "../store/anecdotesSlice";
import { createWithNotification as withNotification } from "../store/notificationsSlice";

export const AnecdoteForm = () => {
  const dispatch = useAppDispatch();

  const submitNewAnecdote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const anecdoteAction = anecdotesSlice.actions.create(
      event.currentTarget.anecdote.value
    );

    dispatch(
      withNotification({
        notificationParams: {
          message: "Anecdote added",
          type: NotificationType.Info,
        },
        action: anecdoteAction,
      })
    );
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
