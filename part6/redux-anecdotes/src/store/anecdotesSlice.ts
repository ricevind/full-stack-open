import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);
type Id = ReturnType<typeof getId>;

const asObject = (anecdote: string) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};
type Anecdote = ReturnType<typeof asObject>;

const initialState = anecdotesAtStart
  .map(asObject)
  .reduce((state, anecdote) => {
    state[anecdote.id] = anecdote;
    return state;
  }, {} as Record<string, Anecdote>);

export const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    vote: (state, action: PayloadAction<Id>) => {
      const votedAnecdote = state[action.payload];
      votedAnecdote && (votedAnecdote.votes += 1);
      return state;
    },
    create: {
      reducer: (state, action: PayloadAction<Anecdote>) => {
        state[action.payload.id] = action.payload;
        return state;
      },
      prepare: (anecdote: string) => ({
        payload: asObject(anecdote),
      }),
    },
  },
});
