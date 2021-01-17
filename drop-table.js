import { promises as fs } from 'fs';
import knex from 'knex';
// import pg from 'pg';

export default async () => {
  const connection = {
    user: 'dbhudzhjgxosbm',
    password: process.env.DB_PASSWORD,
    database: 'd2e2sjlffkpgrl',
    port: 5432,
    host: 'ec2-52-213-173-172.eu-west-1.compute.amazonaws.com',
    ssl: {
      rejectUnauthorized: false,
    },
  };
  const client = knex({ client: 'pg', connection });
  const initSql = await fs.readFile('init.sql', 'utf-8');
  await client.raw(initSql);
  process.exit();
};
