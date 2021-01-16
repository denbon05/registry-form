import app from './app.js';
import { port } from '../mapping.js';

app().listen(port, () => {
  console.log(`Server was started on 'http://localhost:${port}'`);
});
