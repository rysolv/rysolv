RYSOLV API Structure
========================================================================

This document aims to guide the reader to successfully running the
RYSOLV server.


Native Dependencies
--------------------------------------------------

The following dependencies are necessary to build the project. If `npm`
fails to build any packages, check that these dependencies are
available. On most systems, these will already be available and no
action is required.

 - `autoconf`: Produces configure scripts (version 2.69+)
 - `automake`: Compilation automation (version 1.16+)
 - `libtool`: For creating portable compiled libraries (version 2.4.6+)
 - `zlib`: Compression lib. (version 1.2.11+)
 - `libpng`: PNG image lib. (version 1.6.37+)
 - `pkgconfig`: Library query tool for compilation (version 0.29.2+)
 - `nasm`: Netwide Assembler (version 2.14.02+)

### Compiling from source workarounds

These are various workarounds for issues that you may run into when
compiling modules from source.

**pngtest.o: undefined reference to symbol 'stdout@@GLIBC_2.2.5'**

This might happen when compiling the `optipng` package. The workaround
is to export `LD=$CC` before running `npm install`. We can also prepend
it like so:

```
LD=$CC npm install
```

For more context of this workaround, read [this issue](https://github.com/imagemin/optipng-bin/issues/108#issuecomment-540670467).



The `.env` file
--------------------------------------------------

RYSOLV uses a `.env` file to configure the server. It holds values
that are used during runtime to do various tasks such as connecting to
the database and authenticating with 3rd party API's.

It lives at the root of this project and is sourced automatically by
the server on start.

A template for this file has been provided at the root of this project
named `.env.sample`. Copy this file to `.env`:

```
$ cd /path/to/rysolv/repository
$ cp .env.sample .env
```

Edit the values in `.env` to match the desired configuration.

The next sections may refer to the `.env` file and the values that
exist within it.

### Additional Information

The name `env` is short for [Environment Variable][envw], and is a
method of setting dynamic values that a running program can reach
into. They're typically used for configuration.

[envw]: https://en.wikipedia.org/wiki/Environment_variable

RYSOLV uses the [`dotenv`][denv] module to read the project level
`.env` file. Read the `dotenv` documentation for more information on
what's possible (e.g. how overrides with existing environment
variables work).

[denv]: https://github.com/motdotla/dotenv



PostgreSQL Configuration
--------------------------------------------------

RYSOLV uses a PostgreSQL database.

### PostgreSQL (PG) setup

RYSOLV has been tested with version 12 of PostgreSQL.

Setting up PostgreSQL will be different based on what operating system
you are running on. If you're lucky, it will already be packaged for
your system:

 - Download Link: https://www.postgresql.org/download/

Getting PostgreSQL running on your system is left as a task for the
reader to resolve.


### Creating the `rysolv` database within PG

Once we've installed PostgreSQL, we need to create our `rysolv`
database. We will be using the `psql` command line interface (CLI) for
this. The `psql` tool should already be installed on your system after
installing PostgreSQL.

Open a terminal on your system and check that we have the correct
version installed:

```
$ psql --version
psql (PostgreSQL) 12.4
```

Hop into the PostgreSQL REPL by running `$ psql` directly. On some Linux
and macOS systems, you'll have to run the command as a specific user. We
can do this with `sudo -u <user>` as such:

```
$ sudo -u postgres psql
```

Once you're in, you should see a prompt such as:

```
psql (12.4)
Type "help" for help.

postgres=#
```

Now we can create our local user and the rysolv database (replace
`alice` below with your username ~ run `$ whoami` in your terminal for
this information), and a desired password:

```
postgres=# CREATE USER alice WITH PASSWORD 'password';
postgres=# CREATE DATABASE rysolv;
postgres=# GRANT ALL PRIVILEGES ON DATABASE rysolv to alice;
```

Exit the `psql` session with `Ctrl + D`, and re-enter it ensuring
that we can access the `rysolv` database:

```
$ psql rysolv
psql (12.4)
Type "help" for help.

rysolv=>
rysolv=> \d
Did not find any relations.
```

Keep this terminal open (if you'd like). We will run the `\d` command
again once we seed the database with tables & data to ensure everything
is working as expected.


### Environment Variables

The following environment variables are used to connect to the local
development PostgreSQL database:

* `DB_USER_LOCAL=alice`
* `DB_PASSWORD_LOCAL=password`
* `DB_PORT_LOCAL=5432`
* `DB_HOST_LOCAL=localhost`
* `DB_NAME_LOCAL=rysolv`

These can be set in the project-level `.env` file.

You will notice some other `DB_` values in that file as well, but
these do not have to be set for local development. Read the source of
`db/connect.js` for usage of these values.


### Seeding

Initially, our database will be empty. We can load data into (seed)
the database by running:

```
npm run seed:local
```

If you're connection variables are setup correctly, you should now have
a PostgreSQL database that's ready to go. We can verify that the data
has been seeded by running the `\d` command at the `psql` prompt.

```
$ psql rysolv
rysolv=> \d
               List of relations
 Schema |       Name        |   Type   | Owner
--------+-------------------+----------+-------
 public | activity          | table    | alice
 public | attempting        | table    | alice
 public | comments          | table    | alice
 public | cronactivity      | table    | alice
 public | funding           | table    | alice
 public | issues            | table    | alice
 public | languages         | table    | alice
 public | migrations        | table    | alice
 public | migrations_id_seq | sequence | alice
 public | pullrequests      | table    | alice
 public | repos             | table    | alice
 public | users             | table    | alice
 public | watching          | table    | alice
 public | withdrawal        | table    | alice
(14 rows)
```


Running with /graphql dev GUI
--------------------------------------------------

Set `graphiql: true` in `/index.js`

<sub>@todo: make .env for this</sub>



File Structure
--------------------------------------------------

* `index.js` - lanches web server and handles routing through /graphql
* `port.js` - set listening port
* `/db` - exports all db functions, schemas, connection pool, and seed data
* `/graphql` - holds `/resolvers` and `/schema`. Resolvers handles all logic


GraphQl Functions:
--------------------------------------------------
* Queries
  * `getIssues` - returns all issues
  * `getUsers` - returns all users
  * `getRepos` - returns all repos
  * `oneIssue` - requires `id: <UUID>` - returns one issue
  * `oneUser` - requires `id: <UUID>` - returns one user
  * `oneRepo` - requires `id: <UUID>` - returns one repo

* Mutations
  * `createIssue` - requires `issueInput: <type IssueInput>` - returns created issue
  * `createUser` - requires `userInput: <type UserInput>`- returns created user
  * `createRepo` - requires `repoInput: <type RepoInput>`- returns created repo
  * `transformIssue` - requires `id: <type ID>, issueInput: <type IssueInput>`- returns transformed issue
  * `transformUser` - requires `id: <type ID>, userInput: <type UserInput>`- returns transformed issue
  * `transformRepo` - requires `id: <type ID>, repoInput: <type RepoInput>`- returns transformed repo
  * `deleteUser` - required `id: <type ID>` - returns success or failure string

GraphQL Types
--------------------------------------------------

> [coming soon]



Dependencies
--------------------------------------------------

* `"chalk": "^2.4.2"` // idk some logging thing
* `"express": "4.16.4"` // handles routing / listening
* `"express-graphql": "^0.9.0"` // direct all routes through /graphql
* `"graphql": "^14.6.0"`// handles incoming queries / mutations
* `"pg": "^7.18.2"` // Manages node postgres connection
* `"uuid": "^7.0.2"` // generate unique IDs - use V4
* `"minimist": "1.2.0"` // idk what this does
* `"dotenv": "^8.2.0"` // load env variables from .env

Dev Dependencies
--------------------------------------------------

* `"make-runnable": "^1.3.6"` // just for exporting the db seed function - may be removable
