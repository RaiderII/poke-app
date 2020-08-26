export interface PokeTypes {
  pokemon_name: string;
  fk_users_id: string;
  poke_id: string;
  pk_id: string;
}

export interface Pokemon {
  pokemon: PokeTypes[];
  userName: string;
}
