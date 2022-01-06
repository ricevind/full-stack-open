import { Anecdote } from "../models/anecdote.model";
import { AppError } from "../models/app-error.model";

const RESOURCE_URL = "http://localhost:3001/anecdotes";

const get = async () => {
  const response = await fetch(RESOURCE_URL, { method: "GET" });
  const data = (await response.json()) as Anecdote[];

  if (response.ok) {
    return data;
  }

  throw new AppError(data);
};

const create = async (anecdote: Anecdote) => {
  const response = await fetch(RESOURCE_URL, {
    method: "POST",
    headers: { "content-type": "Application/JSON" },
    body: JSON.stringify(anecdote),
  });
  const data = (await response.json()) as Anecdote[];

  if (response.ok) {
    return data;
  }

  throw new AppError(data);
};

const put = async (anecdote: Anecdote) => {
  const response = await fetch(`${RESOURCE_URL}/${anecdote.id}`, {
    method: "PUT",
    headers: { "content-type": "Application/JSON" },
    body: JSON.stringify(anecdote),
  });
  const data = (await response.json()) as Anecdote[];

  if (response.ok) {
    return data;
  }

  throw new AppError(data);
};

export const anecdotesService = { get, create, put };
