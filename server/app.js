import Express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// import encrypt from './encrypt.js';
// import User from './entities/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default () => {
  const app = new Express();
  app.use(Express.static(path.join(__dirname, '..', 'build')));
  app.use(cors({ origin: true }));
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // const users = [new User('admin', encrypt('qwerty'))];
  // const users = [];

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

  app.post('/users', (req, res) => {
    // const { ussername, password } = req.body;
    console.log('req-body=>>>', req.body);
    return res.send('pong');

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
