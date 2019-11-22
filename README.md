# Compendium API

## Resources

- [Creating a RESTful Web API](https://medium.com/@metehansenol/creating-a-restful-web-api-with-node-js-and-express-js-from-scratch-9ba6e21d58b9)
- [Using Swagger](http://www.acuriousanimal.com/2018/10/20/express-swagger-doc.html)
- [Using sequalize.js](https://stackabuse.com/using-sequelize-js-and-sqlite-in-an-express-js-app/)
- [Exmaple providing JWTs](https://dev.to/santypk4/you-don-t-need-passport-js-guide-to-node-js-authentication-26ig)
- [Lightship health checks](https://github.com/gajus/lightship#lightship-usage-examples-using-with-express-js)
- [Security best practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Setting up tests](https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6)

## Database

This project uses sequelize for the sqlite database generation, code generation, migrations, and seeding.
See [Using sequalize.js](https://stackabuse.com/using-sequelize-js-and-sqlite-in-an-express-js-app/).

### Seeding and migrating

This is all that should be needed from now on, assuming the initial migration and seeders have been created:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

#### From Scratch

```bash
node_modules/.bin/sequelize model:generate --name Contact --attributes firstName:string,lastName:string,phone:string,email:string
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize model:generate --name Contact --attributes firstName:string,lastName:string,phone:string,email:string
node_modules/.bin/sequelize db:seed:all
```

[optional] undo the seeds:
`node_modules/.bin/sequelize db:seed:undo:all`

## Public Key

The public key needs to be retrieved from the Ticketbooth server. This key is used to validate the JWTs on incoming requests.

## Deploying on Docker Locally

### Build and start

``` bash
rm -rf keys
mkdir keys
docker build -t compendium-api .
docker container create --name compendium-api -p 3040:3040 compendium-api
docker cp keys/. compendium-api:/data/keys
#rm -r keys
docker container start compendium-api
```

### Stop and Remove Container

```bash
docker container stop compendium-api
docker container rm compendium-api
docker image rm compendium-api
```

To ssh into the container run `docker exec -it compendium-api /bin/bash`.

## Database Schema

+----------------+         +----------------+        +-----------------+
|users           |         |users_characters|        |characters       |
+----------------+         +----------------+        +-----------------+
|id              |         |user_id         |        |id               |
|email           +---------+character_id    +--------+name             |
+----------------+         +----------------+        |level            |
                                                     |class            |
                                                     |description      |
                                                     +-------+---------+
                                                             |
                                                             |
                                                             |
                           +----------------+        +-------+---------+
                           |spells          |        |characters_spells|
                           +----------------+        +-----------------+
                           |id              |        |character_id     |
                           |                +--------+spell_id         |
                           +----------------+        +-----------------+


