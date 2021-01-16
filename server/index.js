import app from './app.js';

const port = process.env.PORT || 9000;
app().listen(port, () => {
  console.log(`Server was started on 'http://localhost:${port}'`);
});
