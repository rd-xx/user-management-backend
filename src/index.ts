import express from 'express';

async function main() {
  const app = express();

  app.listen(3001, () => console.log(`Listening on :${3001}`));
}

main();
