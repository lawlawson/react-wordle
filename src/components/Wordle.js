import { React, useEffect } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, isCorrect, usedKeys, turn } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    if (isCorrect) {
      console.log('Congrats you win');
      window.removeEventListener('keyup', handleKeyup);
    }

    if (turn > 5) {
      console.log('Unlucky, out of guesses');
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <>
      <div>Solution - {solution}</div>
      <div>Current Guess - {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
    </>
  );
}
