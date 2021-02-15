# The official repo of rysolv.com

Rysolv is a crowdfunding platform designed to accelerate work on open source projects. Users sponsor outstanding issues or feature requests in open source projects. Developers earn bounties by resolving them.

## Development

rysolv is built on a React front end with a Node/Express/GraphQL API and a PostgreSQL database.

### Running

- `npm i` to install dependencies
- `npm run seed` to seed the database
- `npm start` to start the server.

<br>

### Server

rysolv uses a graphql API located at `localhost:3000/graphql`

First follow the instructions in [/server/README.md](/server/README.md)

<br>

### Migrations

To create a new database migration, run `db-migrate create my-migration-name`

This will create three new files in the `/migrations` folder.

- my-migration-name-up.sql
- my-migration-name-down.sql
- my-migration-name.js

Then populate each of the sql files with the appropriate query

- For `up` migrations, add a query to update the db
- For `down` migrations, add the inverse of that query

Then run `db-migrate up` or `db-migrate down` to cycle forward or backwards through the migrations.

To migrate a specific database environment run `db-migrate up -e [local/dev/prod]`
