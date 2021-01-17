import Express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
// import encrypt from './encrypt.js';

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
    // client.query(
    //   `INSERT INTO users (username, password) VALUES (${ussername}, ${password});`,
    //   async (err, dbRes) => {
    //     if (err) throw err;
    //     const rows = [];
    //     for (const row of dbRes.rows) {
    //       console.log('JSON.stringify(row)=>', JSON.stringify(row));
    //       const { name, password } = row;
    //       rows.push(name, password);
    //     }
    //     const str = rows.join('');
    //     await res.send({ data: `I received your POST request. This is what you sent me: ${str}` });
    //   }
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

  app.post('/users', (req, res) => {
    const { username, password } = req.body.data;
    console.log('req-body=>>>', req.body);
    client.query(
      `INSERT INTO users (username, password) VALUES ('${username}', '${password}');`,
      async (err, dbRes) => {
        if (err) {
          console.log('DB_ERROR->', err);
          // throw err;
        }
        console.log('dbRes=>', dbRes);
        await res.end();
      }
    );

    // const errors = {};
    // if (!nickname) {
    // 	errors.nickname = "Can't be blank";
    // } else {
    // 	const isUniq = !users.some((user) => user.nickname === nickname);
    // 	if (!isUniq) {
    // 		errors.nickname = 'Already exist';
    // 	}
    // }

    // if (!password) {
    // 	errors.password = "Can't be blank";
    // }

    // if (Object.keys(errors).length > 0) {
    // 	res.status(422);
    // 	res.render('users/new', { form: req.body, errors });
    // 	return;
    // }

    // const user = new User(nickname, encrypt(password));
    // users.push(user);
    // res.redirect('/');
  });

  return app;
};
