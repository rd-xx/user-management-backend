/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    /**
     * It is really difficult to use Knex with TypeScript.
     * The only workaround I found was to use the dist folder, so Knex will execute the JavaScript files.
     * Knex will create every migration file there and when that happens, we have to copy it to the src folder (and change the template to a TypeScript file).
     * If we don't do this, Knex will ALWAYS give the error "SyntaxError: Cannot use import statement outside a module".
     */
    directory: './dist/db/migrations',
  },
};
