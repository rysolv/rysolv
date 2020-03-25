# RYSOLV API Structure

### Configuring the DB
RYSOLV uses a postgreSQL database and node pg to connect

Create a `.env` with the following inputs (matching your local db). Will be pulled in by `/db/connect.js`
* `DB_USER=user`
* `DB_PASSWORD=password`
* `DB_PORT=5432`
* `DB_HOST=localhost`
* `DB_NAME=rysolv`

To seed data - run `npm run seed`

#### Running with /graphql dev GUI
Set `graphiql: true,` in `/index.js` // will make .env for this later


### File Structure
* `index.js` - lanches web server and handles routing through /graphql
* `port.js` - set listening port
* `/db` - exports all db functions, schemas, connection pool, and seed data
* `/graphql` - holds `/resolvers` and `/schema`. Resolvers handles all logic

### GraphQl Functions:
* Queries
  * `getIssues` - returns all issues
  * `getUsers` - returns all users
  * `getOrganizations` - returns all organizations
  * `oneIssue` - requires `id: <UUID>` - returns one issue
  * `oneUser` - requires `id: <UUID>` - returns one user
  * `oneOrganization` - requires `id: <UUID>` - returns one organization

* Mutations
  * `createIssue` - requires `issueInput: <type IssueInput>` - returns created issue 
  * `createUser` - requires `userInput: <type UserInput>`- returns created user
  * `createOrganization` - requires `organizationInput: <type OrganizationInput>`- returns created organization
  * `transformIssue` - requires `id: <type ID>, issueInput: <type IssueInput>`- returns transformed issue
  * `transformUser` - requires `id: <type ID>, userInput: <type UserInput>`- returns transformed issue
  * `transformOrganization` - requires `id: <type ID>, organizationInput: <type OrganizationInput>`- returns transformed organization
  * `deleteIssue` - required `id: <type ID>` - returns success or failure string
  * `deleteUser` - required `id: <type ID>` - returns success or failure string
  * `deleteOrganization` - required `id: <type ID>` - returns success or failure string

### GraphQL Types

[coming soon]

### Dependencies
* `"chalk": "^2.4.2"` // idk some logging thing
* `"express": "4.16.4"` // handles routing / listening
* `"express-graphql": "^0.9.0"` // direct all routes through /graphql
* `"graphql": "^14.6.0"`// handles incoming queries / mutations
* `"pg": "^7.18.2"` // Manages node postgres connection
* `"uuid": "^7.0.2"` // generate unique IDs - use V4
* `"minimist": "1.2.0"` // idk what this does
* `"dotenv": "^8.2.0"` // load env variables from .env

### Dev Dependencies
* `"make-runnable": "^1.3.6"` // just for exporting the db seed function - may be removable
