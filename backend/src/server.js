import { createApp } from './app.js';
import { createFixtureCatalogue } from './fixtures.js';

const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be 1-65535');
const app = createApp({
  loadCatalogue: createFixtureCatalogue,
  cursorSecret: process.env.CURSOR_SECRET,
});
app.listen(port, '127.0.0.1', () => {
  console.log(`PA2 synthetic catalogue: http://127.0.0.1:${port}/places`);
});
