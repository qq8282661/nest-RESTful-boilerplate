import { createServer as server } from 'http';
import { on } from 'events';

async function test() {
  for await (const [{ url }, res] of on(server().listen(3000), 'request')) {
    if (url === '/hello') res.end('Hello Node.js!');
    else res.end('OK!');
  }
}

test();
