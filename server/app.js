import Express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import aws from 'aws-sdk';
// import encrypt from './encrypt.js';
// import User from './entities/User.js';

const s3 = new aws.S3({
  accessKeyId: process.env.DB_PASSWORD
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Client } = pg;

const client = new Client({
  user: "xemyvxgmxpukrg",
  password: s3.DB_PASSWORD,
  database: "de0smb1ggbt1mb",
  port: 5432,
  host: "ec2-34-253-148-186.eu-west-1.compute.amazonaws.com",
  ssl: {
    rejectUnauthorized: false
  }
});
// heroku pg:psql - connect db
// heroku pg:credentials:url DATABASE - all info
// pg_stat_activity - monitoring all activity in db

export default () => {
  const app = new Express();
  app.use(Express.static(path.join(__dirname, '..', 'build')));
  app.use(cors({ origin: true }));
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	client.connect();

  // const users = [new User('admin', encrypt('qwerty'))];
  // const users = [];

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

  app.post('/users', (req, res) => {
    // const { ussername, password } = req.body;
    console.log('req-body=>>>', req.body);
		console.log(req.body);
		client.query('SELECT * FROM test;', async (err, dbRes) => {
		if (err) throw err;
		const rows = [];
		for (let row of dbRes.rows) {
			console.log(JSON.stringify(row));
			const { name, password } = row;
			rows.push(name, password);
		}
		const str = rows.join('');
		await res.send(
			`I received your POST request. This is what you sent me: ${str}`,
		);
	});

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
	
	// if (process.env.NODE_ENV === 'production') {
	// 	// Serve any static files
	// 	app.use(express.static(path.join(__dirname, '..', '/build')));
			
	// 	// Handle React routing, return all requests to React app
	// 	app.get('*', function (req, res) {
	// 		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	// 	});
	// }

  return app;
};
