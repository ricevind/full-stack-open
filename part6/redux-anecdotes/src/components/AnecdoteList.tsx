import React, { createRef, ForwardedRef, useRef } from "react";
import { useLayoutEffect } from "react";
import { forwardRef } from "react";
import { Anecdote } from "../models/anecdote.model";
import { useAppDispatch, useAppSelector } from "../store";
import { anecdotesSlice, selectSortedAnecdotes } from "../store/anecdotesSlice";
import { AnecdoteListFilter } from "./AnecdoteListFilter";

export const AnecdoteList = () => {
  const sortIds = useRef<string[]>([]);
  const dispatch = useAppDispatch();

  const { anecdotesList, lastSortIds } = useAppSelector((state) =>
    selectSortedAnecdotes(state, sortIds.current)
  );
  sortIds.current = lastSortIds;

  const vote = (id: string) => {
    dispatch(anecdotesSlice.actions.vote(id));
  };

  return (
    <div>
      <AnecdoteListFilter></AnecdoteListFilter>
      <AnimatedList>
        {anecdotesList.map((anecdote) => (
          <AnecdoteComponent
            ref={createRef()}
            key={anecdote.id}
            anecdote={anecdote}
            vote={vote}
          ></AnecdoteComponent>
        ))}
      </AnimatedList>
    </div>
  );
};

const AnecdoteComponent = forwardRef(
  (
    {
      anecdote,
      vote,
    }: {
      anecdote: Anecdote;
      vote: (id: string) => void;
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div style={{ padding: "5px" }} ref={ref}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    );
  }
);

function AnimatedList({ children }: { children: React.ReactNode }) {
  const previousPositions = useRef<Record<string, number> | null>(null);
  const currentPositions = useRef<Record<string, number> | null>(null);

  useLayoutEffect(() => {
    if (currentPositions.current) {
      previousPositions.current = currentPositions.current;
    }

    const positions: Record<string | number, number> = {};
    React.Children.forEach(children, (child) => {
      if (child) {
        const element = (child as any).ref.current as HTMLElement;
        if (element) {
          const offsetTop = element.offsetTop;
          const key = (child as React.Attributes).key;
          key && (positions[key] = offsetTop);
        }
      }
    });
    currentPositions.current = positions;
  }, [children]);

  useLayoutEffect(() => {
    const prevPositions = previousPositions.current;
    const currPositions = currentPositions.current;

    if (prevPositions && currPositions) {
      React.Children.forEach(children, (child) => {
        const element = (child as any).ref.current as HTMLElement;
        if (element) {
          const key = (child as React.Attributes).key;
          const offsetTop = key
            ? prevPositions[key] != null
              ? prevPositions[key] - currPositions[key]
              : 0
            : 0;
          element.style.transition = "";
          element.style.transform = transformMove(offsetTop);
          requestAnimationFrame(() => {
            element.style.transition = transition;
            element.style.transform = transformReset;
          });
        }
      });
    }
  }, [children]);

  return <div style={{ position: "relative" }}>{children}</div>;
}

const transformMove = (y: number) => `translate(0px, ${y}px)`;
const transformReset = "translate(0, 0)";
const transition = `transform 0.5s`;
