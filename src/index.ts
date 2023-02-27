import express from 'express';

async function main() {
  const app = express();

  app.listen(4000, () => console.log(`Listening on : 4000`));
}

main();
