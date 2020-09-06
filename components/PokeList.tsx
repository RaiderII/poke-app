import Link from 'next/link';
import { useState } from 'react';
import Body from '../styled-components/Index/Body';
// import PokeList from '../styled-components/Index/PokeList';
import PokeCard from '../styled-components/Index/PokeCard';
import Pokeball from '../styled-components/Index/Pokeball';
import updatePoke from '../helpers/updatePoke';
import { useSelector } from 'react-redux';

interface Pokemon {
  name: string;
  userName?: string;
  id?: string;
  url?: string;
}

interface PokeListProps {
  pokemons: Pokemon[];
  myPokemon: any;
  userName?: string;
  turnSearch: any;
}

interface AddPokemon {
  name: string;
  id?: string;
}

export default function PokeList({ pokemons, myPokemon, turnSearch }: PokeListProps) {
  interface Pokemon {
    pokemon_name: string;
  }
  const pokemonArr = myPokemon.map((pokemon: Pokemon) => pokemon.pokemon_name);
  const [pokemonNames, setNames] = useState(pokemonArr);

  const pokeNames = pokemons.map((poke) => ({ pokemon_name: poke.name }));

  const { findPoke, turnOff } = updatePoke(pokeNames, myPokemon);

  async function addPokemon(poke: AddPokemon) {
    // check if user pokemon list doesn't include the added pokemon
    if (!pokemonNames.includes(poke.name)) {
      // updates user personal list of pokemon state
      setNames((prevState: string[]) => [poke.name, ...prevState]);
      await fetch(`/api/add-pokemon?pokemon=${poke.name}&id=${poke.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  return (
    <Body onClick={() => turnSearch(false)}>
      {pokemons.map((poke) => (
        <PokeCard>
          <Link as={`/${poke.name}`} href="/[pokemon]">
            <a>
              <p>{poke.name}</p>
              <img
                alt={poke.name}
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail${poke.id}.png`}
              />
            </a>
          </Link>
          <Pokeball
            onClick={() => {
              addPokemon(poke);
              turnOff(poke.name);
            }}
            turnedOff={findPoke(poke.name)}
          />
        </PokeCard>
      ))}
    </Body>
  );
}
