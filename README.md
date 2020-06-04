# The official repo of rysolv.com

Rysolv is a crowdfunding platform designed to accelerate work on open source projects. Users sponsor outstanding issues or feature requests in open source projects. Developers earn bounties by resolving them.

## Development

rysolv is built on a React front end with a Node/Express/GraphQL API and a PostgreSQL database.

### Running

First follow the instructions in [/server/README.md](README.md)

- `npm i` to install dependencies
- `npm run seed` to seed the database

### Server

rysolv uses a graphql API located at `localhost:3000/graphql`
