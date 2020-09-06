/* eslint-disable camelcase */
import { useState } from 'react';
import Link from 'next/link';
import db from '../lib/db';
import pageAuthentication from '../helpers/pageAuthentication';
import { ApiRoutesTypes } from '../lib/ApiRoutesTypes';
import { Pokemon } from '../lib/PokeTypes';
import NavBar from '../components/NavBar';
import BasicLayout from '../styled-components/GlobalStyle';
import Body from '../styled-components/Burger/Body';
import Burger from '../components/Burger';
import Menu from '../components/Menu';
import PokeCard from '../styled-components/MyPokemon/PokeCard';
import Pokeball from '../styled-components/Index/Pokeball';
import MyPokeBody from '../styled-components/MyPokemon/MyPokeBody';
import DeleteBttn from '../styled-components/MyPokemon/DeleteBttn';
import ensureAuth from '../helpers/ensureAuth';
import updatePoke from '../helpers/updatePoke';

export default function myPokemon({ pokemon, userName, myPokemon }: Pokemon) {
  const { turnOff, findDeleted } = updatePoke(pokemon, myPokemon);

  const [openMenu, turnMenu] = useState(false);
  async function removePokemon({ pokemon_name, fk_users_id }) {
    await fetch(`/api/remove-pokemon?pokemon=${pokemon_name}&id=${fk_users_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <BasicLayout>
      <Body>
        <Burger openMenu={openMenu} turnMenu={turnMenu} />
        <Menu openMenu={openMenu} userName={userName} />
        <MyPokeBody>
          {pokemon.map((poke) => (
            <PokeCard status={findDeleted(poke.pokemon_name)}>
              <Link as={`/${poke.pokemon_name}`} href="/[pokemon]">
                <a>
                  <p>{poke.pokemon_name}</p>

                  <img
                    alt={poke.pokemon_name}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail${poke.poke_id}.png`}
                  />
                </a>
              </Link>

              <DeleteBttn
                onClick={() => {
                  removePokemon(poke);
                  turnOff(poke.pokemon_name);
                }}
              >
                X
              </DeleteBttn>
            </PokeCard>
          ))}
        </MyPokeBody>
      </Body>
    </BasicLayout>
  );
}

function gSSP() {
  return async (ctx: ApiRoutesTypes) => {
    const cookie = ctx.req.headers.cookie.split('=')[1];

    const userId = (
      await db.query('SELECT fk_users_id FROM tokens WHERE token = $1 AND status = True', [cookie])
    ).rows[0].fk_users_id;

    const myPokemon = (
      await db.query('SELECT pokemon_name FROM pokemons WHERE fk_users_id = $1', [userId])
    ).rows;

    const userName = (await db.query('SELECT name FROM users WHERE id = $1', [userId])).rows[0]
      .name;

    const pokemon = (await db.query('SELECT * FROM pokemons WHERE fk_users_id = $1', [userId]))
      .rows;

    return { props: { pokemon, userName, myPokemon } };
  };
}

export const getServerSideProps = ensureAuth(gSSP());
