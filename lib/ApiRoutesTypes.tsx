import { NextApiRequest, NextApiResponse } from 'next';

interface Query {
  pokemons: string;
  pokemon: string;
  token: string;
}

export interface ApiRoutesTypes {
  req: NextApiRequest;
  res: NextApiResponse;
  query: Query;
}
