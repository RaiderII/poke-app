import db from '../../lib/db';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function addPokemon(req: NextApiRequest, res: NextApiResponse) {
  await db.query('DELETE FROM pokemons WHERE fk_users_id = $1 AND pokemon_name = $2', [
    req.query.id,
    req.query.pokemon,
  ]);

  res.status(200).json(`${req.query.pokemon} removed`);
}
