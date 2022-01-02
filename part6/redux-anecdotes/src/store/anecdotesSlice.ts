import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from ".";
import { Anecdote, AnecdoteCreator } from "../models/anecdote.model";
import { Id } from "../utils/get-id";
import { stableSort } from "../utils/stable-sort";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const anecdotesMap = anecdotesAtStart
  .map(AnecdoteCreator.fromContent)
  .reduce((state, anecdote) => {
    state[anecdote.id] = anecdote;
    return state;
  }, {} as Record<Id, Anecdote>);

type AnecdotesStateSlice = {
  filter: undefined | string;
  entities: Record<Id, Anecdote>;
};

const initialState: AnecdotesStateSlice = {
  filter: undefined,
  entities: anecdotesMap,
};

export const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    vote: (state, action: PayloadAction<Id>) => {
      const votedAnecdote = state.entities[action.payload];
      votedAnecdote && (votedAnecdote.votes += 1);
      return state;
    },
    create: {
      reducer: (state, action: PayloadAction<Anecdote>) => {
        state.entities[action.payload.id] = action.payload;
        return state;
      },
      prepare: (anecdote: string) => ({
        payload: AnecdoteCreator.fromContent(anecdote),
      }),
    },
    filter: (state, action: PayloadAction<AnecdotesStateSlice["filter"]>) => {
      state.filter = action.payload;
      return state;
    },
  },
});

export const selectFilter = (state: AppState) => state.anecdotes.filter;
export const selectAnecdotes = (state: AppState) => state.anecdotes.entities;
export const selectFilteredAnecdotes = createSelector(
  selectAnecdotes,
  selectFilter,
  (entities, filter) => {
    if (typeof filter === "undefined") {
      return entities;
    }

    const entries = Object.entries(entities);
    const filteredEntries = entries.filter(([_, anecdote]) =>
      anecdote.content.includes(filter)
    );

    return Object.fromEntries(filteredEntries);
  }
);
export const selectSortedAnecdotes = createSelector(
  selectFilteredAnecdotes,
  (_: any, lastOrder: string[]) => lastOrder,
  (entities, lastOrder) => {
    const { entitiesList, lastSortIds } = stableSort(
      entities,
      lastOrder,
      (a, b) => b.votes - a.votes
    );

    return { anecdotesList: entitiesList, lastSortIds };
  }
);
