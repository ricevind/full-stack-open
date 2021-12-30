import { anecdotesSlice } from "./anecdotesSlice";

describe("Anecdotes slice", () => {
  const testedReducer = anecdotesSlice.reducer;

  describe("vote", () => {
    it("increase voted count", () => {
      const initialState = anecdotesSlice.getInitialState();
      const anecdoteKeys = Object.keys(initialState);

      const votedAnecdoteId = anecdoteKeys[2];
      const action = anecdotesSlice.actions.vote(votedAnecdoteId);

      const state = testedReducer(initialState, action);

      expect(state[votedAnecdoteId].votes).toEqual(1);
    });

    it("handles voting non existing", () => {
      const initialState = anecdotesSlice.getInitialState();
      const action = anecdotesSlice.actions.vote("non-existent-id");

      const state = testedReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });
});
