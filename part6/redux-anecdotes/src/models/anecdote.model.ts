import { getId, Id } from "../utils/get-id";

export type Anecdote = {
  readonly content: string;
  readonly id: Id;
  readonly votes: number;
};

export class AnecdoteCreator {
  static fromContent(content: string): Anecdote {
    return { content, id: getId(), votes: 0 };
  }
}
