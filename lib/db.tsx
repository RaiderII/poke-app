//const { Pool } = require('pg');
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: '35.238.156.4',
  database: 'postgres',
  password: 'utn1436764',
  port: 5432,
});

export default pool;
