/* eslint-disable no-shadow */
import axios from 'axios';
import convertString from '../helpers/convertString';
// eslint-disable-next-line import/named
import pageAuthentication from '../helpers/pageAuthentication';
import db from '../lib/db';
import { ApiRoutesTypes } from '../lib/ApiRoutesTypes';
import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import BasicLayout from '../styled-components/GlobalStyle';
import Body from '../styled-components/Pokemon/Body';
import TypeIcon from '../styled-components/Pokemon/TypeIcon';
import IconWrapper from '../styled-components/Pokemon/IconWrapper';
import PokeTypes from '../styled-components/Pokemon/PokeTypes';
import TypesContainer from '../styled-components/Pokemon/TypesContainer';
import WeightHeight from '../styled-components/Pokemon/WeightHeight';
import Abilities from '../styled-components/Pokemon/Abilities';
import Card from '../styled-components/Pokemon/Card';
import Container from '../styled-components/Pokemon/Container';
import Pokeball from '../styled-components/Index/Pokeball';
import Back from '../styled-components/Pokemon/Back';
import Title from '../styled-components/Pokemon/Title';

export default function pokemon({ pokemon, myPokemon, userName }) {
  // array of pokemon types
  const typesArr = pokemon.types.map((types) => types.type.name);

  interface Pokemon {
    pokemon_name: string;
  }

  interface AddPokemon {
    name: string;
    id: string;
  }

  const colorTypes = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  console.log(colorTypes['Grass']);
  // first make an array of the pokemon names
  const pokemonArr = myPokemon.map((pokemon: Pokemon) => pokemon.pokemon_name);

  // then set the state so I don't add them every time I click add pokemon
  const [pokemonNames, setNames] = useState(pokemonArr);

  async function addPokemon(poke: AddPokemon) {
    if (!pokemonNames.includes(poke.name)) {
      setNames((prevState: string[]) => [poke.name, ...prevState]);
      await fetch(
        `https://raider-poke-app.vercel.app/api/add-pokemon?pokemon=${
          poke.name
        }&id=/${convertString(poke.id)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }

  return (
    <BasicLayout>
      <Body>
        <Link as={`/`} href="/">
          <Back />
        </Link>
        <Card>
          <img
            alt={pokemon.id}
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${convertString(
              pokemon.id
            )}.png`}
          />
          <Title name>
            <h1>{pokemon.name}</h1>
          </Title>

          <Container>
            <WeightHeight>
              <h1>{pokemon.base_experience}</h1>
              <p>EXP.</p>
            </WeightHeight>
            <TypesContainer>
              {typesArr.map((type) => (
                <PokeTypes>
                  <IconWrapper colorType={colorTypes[type]}>
                    <TypeIcon type={type} />
                  </IconWrapper>
                  <p>{type}</p>
                </PokeTypes>
              ))}
            </TypesContainer>
            <WeightHeight>
              <h1>{pokemon.weight}</h1>
              <p>WEIGHT</p>
            </WeightHeight>
          </Container>
          <Abilities>
            <Title>
              <h1>Abilities</h1>
            </Title>
            <ul>
              {pokemon.abilities.map((ability) => (
                <li>{ability.ability.name}</li>
              ))}
            </ul>
          </Abilities>
          <Pokeball onClick={() => addPokemon(pokemon)} />
        </Card>
      </Body>
    </BasicLayout>
  );
}

export async function getServerSideProps(ctx: ApiRoutesTypes) {
  pageAuthentication(ctx, db);

  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${ctx.query.pokemon}`);

  const cookie = ctx.req.headers.cookie.split('=')[1];

  const query = {
    text: 'SELECT fk_users_id FROM tokens WHERE token = $1 AND status = true',
    values: [cookie],
    //  rowMode: "array",
  };
  const userId = (await db.query(query)).rows[0].fk_users_id;

  const userName = (await db.query('SELECT name FROM users WHERE id = $1', [userId])).rows[0].name;

  const myPokemon = (
    await db.query('SELECT pokemon_name FROM pokemons WHERE fk_users_id = $1', [userId])
  ).rows;

  return { props: { pokemon: res.data, myPokemon, userName } };
}
