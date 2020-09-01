/* eslint-disable linebreak-style */
import Router from 'next/router';
import Link from 'next/link';
import { useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import convertString from '../helpers/convertString';
import PokeList from '../components/PokeList';
import db from '../lib/db';
import { getPokemons } from '../reducers/appSlice';
import pageAuthentication from '../helpers/pageAuthentication';
import { RootState, AppDispatch } from './_app';
import { ApiRoutesTypes } from '../lib/ApiRoutesTypes';
import BasicLayout from '../styled-components/GlobalStyle';
import Burger from '../components/Burger';
import Menu from '../components/Menu';
import Body from '../styled-components/Burger/Body';
import PokeballBlack from '../styled-components/TypeAhead/PokeballBlack';
import TypeAhead from '../styled-components/TypeAhead/TypeAhead';
import List from '../styled-components/TypeAhead/List';
import InputTest from '../styled-components/TypeAhead/InputTest';
import ArrowTop from '../styled-components/Index/ArrowTop';
import { parseCookies } from 'nookies';

interface Pokemon {
  name: string;
  pokemon_name?: string;
  id?: string;
  url?: string;
}

interface HomeProps {
  pokemons: Pokemon[];
  userName: string;
  myPokemon: Pokemon[];
  redirect?: Boolean;
}

export default function Homepage({ pokemons, userName, myPokemon, redirect }: HomeProps): any {
  if (redirect) {
    Router.push('/login');
  }

  const store = useSelector((store: RootState) => store.pokeStore);
  const [openMenu, turnMenu] = useState(false);
  const [search, turnSearch] = useState(false);
  const [name, setName] = useState('');
  const [scroll, setScroll] = useState(0);
  const [showScroll, setShowScroll] = useState(false);

  const searchRef = useRef(null);

  const filteredPoke = pokemons.map((poke) => {
    return poke.name.slice(0, name.length) === name && poke.name;
  });

  console.log('filteredPoke', filteredPoke);
  useEffect(() => {
    document.addEventListener('scroll', () => {
      const scrollCheck: any = window.scrollY < 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
    window.addEventListener('scroll', checkScrollTop);
  });

  //console.log(scroll);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (store.length < 150) {
      dispatch(getPokemons(pokemons.map((poke) => poke.name)));
    }
  });

  if (userName === 'placeholder' && pokemons.length === 0) {
    Router.push('/login');
  }

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BasicLayout>
      <Body>
        <TypeAhead>
          <InputTest
            ref={searchRef}
            search={search}
            onClick={() => {
              turnSearch(true);
            }}
            onChange={(e) => setName(e.target.value)}
          />
          <PokeballBlack
            onClick={() => {
              turnSearch(true);
              searchRef.current.focus();
            }}
          />

          <List search={search}>
            {filteredPoke.map((poke) => {
              return (
                <ul>
                  <Link as={`/${poke}`} href="/[pokemon]">
                    <li>{poke}</li>
                  </Link>
                </ul>
              );
            })}
          </List>
        </TypeAhead>
        <Burger openMenu={openMenu} turnMenu={turnMenu} turnSearch={turnSearch} />
        <Menu openMenu={openMenu} userName={userName} />
        <ArrowTop onClick={scrollTop} showScroll={showScroll} />
        <PokeList
          pokemons={pokemons}
          myPokemon={myPokemon}
          turnSearch={turnSearch}
          search={search}
        />
      </Body>
    </BasicLayout>
  );
}

export async function getServerSideProps(ctx: ApiRoutesTypes) {
  const cookie = parseCookies(ctx).autho;

  if (!cookie) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return { props: {} };
  }

  const query = {
    text: 'SELECT fk_users_id FROM tokens WHERE token = $1 AND status = true',
    values: [cookie],
    //  rowMode: "array",
  };
  const userId = (await db.query(query)).rows[0].fk_users_id;

  if (!userId) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return { props: {} };
  }

  const userName = (await db.query('SELECT name FROM users WHERE id = $1', [userId])).rows[0].name;

  const myPokemon = (
    await db.query('SELECT pokemon_name FROM pokemons WHERE fk_users_id = $1', [userId])
  ).rows;

  const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=150');
  const pokemons = res.data.results.map((pokemon: Pokemon) => {
    //  Get individual URL to get the name and id

    const { url } = pokemon;
    // Get the last item in the URL
    // const id = convertString(url.match(/\/([a-z0-9_-]*[\/]?)$/g));
    const id = convertString(url.match(/\/([a-z0-9_-]*[/]?)$/g));

    //  store.dispatch(getPokemons({ pokemon: pokemon.name }));
    return { name: pokemon.name, id };
  });

  return { props: { pokemons, userName, myPokemon } };
}
