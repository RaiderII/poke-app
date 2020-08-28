import Link from 'next/link';
import { useState } from 'react';
import Body from '../styled-components/Index/Body';
// import PokeList from '../styled-components/Index/PokeList';
import PokeCard from '../styled-components/Index/PokeCard';
import Pokeball from '../styled-components/Index/Pokeball';

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
  search: any;
}

interface AddPokemon {
  name: string;
  id?: string;
}

export default function PokeList({ pokemons, myPokemon, turnSearch, search }: PokeListProps) {
  interface Pokemon {
    pokemon_name: string;
  }
  const pokemonArr = myPokemon.map((pokemon: Pokemon) => pokemon.pokemon_name);
  const [pokemonNames, setNames] = useState(pokemonArr);

  async function addPokemon(poke: AddPokemon) {
    if (!pokemonNames.includes(poke.name)) {
      setNames((prevState: string[]) => [poke.name, ...prevState]);
      await fetch(`http://localhost:3000/api/add-pokemon?pokemon=${poke.name}&id=${poke.id}`, {
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
          <Pokeball onClick={() => addPokemon(poke)} />
        </PokeCard>
      ))}
    </Body>
  );
}
