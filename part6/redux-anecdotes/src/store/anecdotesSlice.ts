import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { Anecdote, AnecdoteCreator } from "../models/anecdote.model";
import { NotificationType } from "../models/notification.model";
import { anecdotesService } from "../services/anecdotesService";
import { Id } from "../utils/get-id";
import { stableSort } from "../utils/stable-sort";
import { showNotification } from "./notificationsSlice";
import {
  anecdotesSliceKey,
  AnecdotesState,
  AppDispatch,
  AppThunk,
} from "./store.model";

const toAnecdotesMap = (anecdotes: Anecdote[]) =>
  anecdotes.reduce((state, anecdote) => {
    state[anecdote.id] = anecdote;
    return state;
  }, {} as AnecdotesState["entities"]);

const initialState: AnecdotesState = {
  filter: undefined,
  entities: toAnecdotesMap([]),
};

export const createGetAnecdotesAsyncThunk = createAsyncThunk<
  Anecdote[],
  void,
  { dispatch: AppDispatch }
>("anecdotes/getAll", async (_, thunkApi) => {
  thunkApi.dispatch(
    showNotification({
      notificationParams: {
        message: "Loading anecdotes",
        type: NotificationType.Info,
      },
      duration: 1000,
    })
  );

  return anecdotesService
    .get()
    .then((result) => {
      thunkApi.dispatch(
        showNotification({
          notificationParams: {
            message: "Anecdotes Loaded",
            type: NotificationType.Info,
          },
          duration: 1000,
        })
      );
      return result;
    })
    .catch((e) => {
      thunkApi.dispatch(
        showNotification({
          notificationParams: {
            message: "Anecdotes Load Failed",
            type: NotificationType.Info,
          },
          duration: 1000,
        })
      );
      throw e;
    });
});

export const createAnecdoteCreateThunk =
  (content: Anecdote["content"]): AppThunk =>
  async (dispatch) => {
    const anecdoteAction = anecdotesSlice.actions.create(content);
    dispatch(anecdoteAction);
    await anecdotesService.create(anecdoteAction.payload);
    dispatch(
      showNotification({
        notificationParams: {
          message: "Anecdote added",
          type: NotificationType.Info,
        },
      })
    );
  };

export const createVoteAnecdoteThunk =
  (id: Anecdote["id"]): AppThunk =>
  async (dispatch, getState) => {
    const anecdoteAction = anecdotesSlice.actions.vote(id);
    dispatch(anecdoteAction);

    const votedAnecdote = getState()[anecdotesSliceKey].entities[id];
    if (votedAnecdote) {
      await anecdotesService.put(votedAnecdote);
      dispatch(
        showNotification({
          notificationParams: {
            message: "Anecdote updated",
            type: NotificationType.Info,
          },
        })
      );
    }
  };

export const anecdotesSlice = createSlice({
  name: anecdotesSliceKey,
  initialState,
  reducers: {
    vote: (state, action: PayloadAction<Id>) => {
      const votedAnecdote = state.entities[action.payload];
      votedAnecdote && (votedAnecdote.votes += 1);
    },
    create: {
      reducer: (state, action: PayloadAction<Anecdote>) => {
        state.entities[action.payload.id] = action.payload;
      },
      prepare: (anecdote: string) => ({
        payload: AnecdoteCreator.fromContent(anecdote),
      }),
    },
    filter: (
      state,
      { payload: filter }: PayloadAction<AnecdotesState["filter"]>
    ) => {
      state.filter = filter;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(
      createGetAnecdotesAsyncThunk.fulfilled,
      (state, { payload: anecdotes }) => {
        state.entities = toAnecdotesMap(anecdotes);
      }
    ),
});

export const selectFilter = (state: { anecdotes: AnecdotesState }) =>
  state.anecdotes.filter;
export const selectAnecdotes = (state: { anecdotes: AnecdotesState }) =>
  state.anecdotes.entities;
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

const hack = { val: [] } as any;
export const selectSortedAnecdotes = createSelector(
  selectFilteredAnecdotes,
  (_: any, lastOrder: string[]) => {
    hack.val = lastOrder;
    return hack;
  },
  (entities, lastOrder) => {
    const { entitiesList, lastSortIds } = stableSort(
      entities,
      lastOrder.val,
      (a, b) => b.votes - a.votes
    );

    return { anecdotesList: entitiesList, lastSortIds };
  }
);
