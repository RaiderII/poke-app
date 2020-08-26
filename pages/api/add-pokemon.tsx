import db from '../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function addPokemon(req: NextApiRequest, res: NextApiResponse) {
  const userId = (
    await db.query('SELECT fk_users_id FROM tokens WHERE token = $1 AND status = true', [
      req.cookies.autho,
    ])
  ).rows[0].fk_users_id;

  await db.query('INSERT INTO pokemons(pokemon_name, fk_users_id, poke_id) VALUES($1, $2, $3)', [
    req.query.pokemon,
    userId,
    req.query.id,
  ]);

  res.status(200).json('pokemon added to your list');
}
