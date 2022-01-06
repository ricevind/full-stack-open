import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { Anecdote } from "../models/anecdote.model";
import { Id } from "../utils/get-id";
import { Notification } from "../models/notification.model";

export const anecdotesSliceKey = "anecdotes";
export const notificationsSliceKey = "notifications";

export type AppState = {
  [anecdotesSliceKey]: AnecdotesState;
  [notificationsSliceKey]: NotificationState;
};
export type AppDispatch = ThunkDispatch<AppState, unknown, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>;
export type AnecdotesState = {
  filter: undefined | string;
  entities: Record<Id, Anecdote>;
};

export type NotificationState = Notification[];
