import { useState } from 'react';

export default (pokemon, myPokemon) => {
  const myPokemonArr = myPokemon.map((poke) => poke.pokemon_name);

  const pokeStatus = pokemon.map((poke) => {
    if (!myPokemonArr.includes(poke.pokemon_name)) {
      return { pokemon: poke.pokemon_name, turnedOff: false };
    } else return { pokemon: poke.pokemon_name, turnedOff: true };
  });

  const [status, turnStatus] = useState(pokeStatus);

  const findPoke = (poke) => {
    return status.find((ele) => ele.pokemon === poke).turnedOff;
  };
  const findDeleted = (poke) => {
    return status.find((ele) => ele.pokemon === poke).deleted;
  };

  const turnOff = (poke: string) => {
    turnStatus((prevState) => {
      return prevState.map((ele) => {
        if (ele.pokemon === poke) {
          return { ...ele, turnedOff: true, deleted: true };
        } else return { ...ele };
      });
    });
  };

  return { findPoke, turnOff, findDeleted };
};
