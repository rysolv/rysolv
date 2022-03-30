# The official repo of rysolv.com

Rysolv is a crowdfunding platform designed to accelerate work on open source projects. Users sponsor outstanding issues or feature requests in open source projects. Developers earn bounties by resolving them.

## Development

Keeping track of everything here: https://github.com/rysolv/rysolv/projects/1

## Running

- `npm i` to install dependencies
- `npm run seed` to seed the database
- `npm start` to start the server.

<br>

## Server

rysolv uses a graphql API located at `localhost:3000/graphql`

First follow the instructions in [/server/README.md](/server/README.md)

<br>

## Migrations

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

## NPM Scripts

### Reseed database from schema

`npm run seed:local`

or

`npm run seed:dev`

This should only be used on local, or when dev gets really out of sync.

The script will first run `db-migrate reset` to roll back the migrations table.

### Generate hiring questions

One time script to generate questions & respones for hiring.

`npm run generateQuestions:[local/dev/prod]`
