import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  deleteNotification,
} from '../reducers/notificationReducer';
import trimString from '../helpers/trimString';

function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterText = useSelector((state) => state.filter);

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    trimString(anecdote.content).includes(trimString(filterText))
  );

  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(setNotification(`You voted for ${anecdote.content}`));

    setTimeout(() => {
      dispatch(deleteNotification());
    }, 3000);
  };

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default AnecdoteList;
