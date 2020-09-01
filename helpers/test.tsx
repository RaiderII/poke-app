// function ensureAuth(gssp) {
//     return async (ctx) => {
//         const cookie = parseCookies(ctx).autho;

//         if (!cookie) {
//           ctx.res.writeHead(302, { Location: '/login' });
//           ctx.res.end();
//           return { props: {} };
//         }

//         const validQuery = {
//             text: 'SELECT fk_users_id FROM tokens WHERE token = $1 AND status = true',
//             values: [cookie],
//           };
//           const isValidUser = await db.query(validQuery);

//           // no user with valid token is found
//           if (isValidUser.rows.length === 0) {
//             ctx.res.writeHead(302, { Location: '/login' });
//             ctx.res.end();
//             return { props: {} };
//           }
//         return gssp(ctx);
//     }
// }

// function getApiData() {
//     return async (ctx) => {
//         const cookie = parseCookies(ctx).autho;

//         if (!cookie) {
//           ctx.res.writeHead(302, { Location: '/login' });
//           ctx.res.end();
//           return { props: {} };
//         }

//         const validQuery = {
//           text: 'SELECT fk_users_id FROM tokens WHERE token = $1 AND status = true',
//           values: [cookie],
//         };
//         const isValidUser = await db.query(validQuery);

//         // no user with valid token is found
//         if (isValidUser.rows.length === 0) {
//           ctx.res.writeHead(302, { Location: '/login' });
//           ctx.res.end();
//           return { props: {} };
//         }

//         const query = {
//           text: 'SELECT fk_users_id FROM tokens WHERE token = $1 AND status = true',
//           values: [cookie],
//         };
//         const userId = (await db.query(query)).rows[0]?.fk_users_id;

//         const userName = (await db.query('SELECT name FROM users WHERE id = $1', [userId])).rows[0].name;

//         const myPokemon = (
//           await db.query('SELECT pokemon_name FROM pokemons WHERE fk_users_id = $1', [userId])
//         ).rows;

//         const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=150');
//         const pokemons = res.data.results.map((pokemon: Pokemon) => {
//           //  Get individual URL to get the name and id

//           const { url } = pokemon;
//           // Get the last item in the URL
//           // const id = convertString(url.match(/\/([a-z0-9_-]*[\/]?)$/g));
//           const id = convertString(url.match(/\/([a-z0-9_-]*[/]?)$/g));

//           //  store.dispatch(getPokemons({ pokemon: pokemon.name }));
//           return { name: pokemon.name, id };
//         });

//         return { props: { pokemons, userName, myPokemon } };
//     }
// }

// export const getServerSideProps = ensureAuth(getApiData());

export function getApiData() {}
