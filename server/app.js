import Express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import crypto from './encrypt.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Client } = pg;

const client = new Client({
  user: 'dbhudzhjgxosbm',
  password: process.env.DB_PASSWORD,
  database: 'd2e2sjlffkpgrl',
  port: 5432,
  host: 'ec2-52-213-173-172.eu-west-1.compute.amazonaws.com',
  ssl: {
    rejectUnauthorized: false,
  },
});
// heroku pg:psql - connect db
// heroku pg:credentials:url DATABASE - all info
// pg_stat_activity - monitoring all activity in db

export default () => {
  const app = new Express();

  app.use(Express.static(path.join(__dirname, '..', 'build')));
  app.use(cors({ origin: true }));
  app.use(morgan(':method :url :status - :response-time ms'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  client.connect();

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

  app.post('/users', (req, res) => {
    const { username, password } = req.body.data;
    console.log('req-body=>>>', req.body);

    const errors = {};
    if (!username) {
      errors.username = "can't be blank";
    }
    if (!password) {
      errors.password = "can't be blank";
    }
    client.query(
      `SELECT username FROM users WHERE username = '${username}';`,
      async (err, dbRes) => {
        if (err) return console.log('err_in_query_DB->', err);
        if (dbRes.rows.length > 0) errors.username = 'already exist';
        if (Object.keys(errors).length > 0) {
          res.send({ errors: Object.entries(errors).map((err) => err.join(' ')) });
          return;
        }

        client.query(
          `INSERT INTO users (username, password) VALUES ('${username}', '${crypto(password)}');`,
          async (err, dbRes) => {
            if (err) {
              console.log('DB_ERROR->', err);
              // throw err;
            }
            await res.end();
          }
        );
      }
    );
  });

  return app;
};
