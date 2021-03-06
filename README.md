# Products



## Database setup 

Change the database credentials and database schema name in config/config.js

development: {
    dialect: 'mysql',
    host: 'your host id',
    username: 'database username',
    password: 'database password',
    database: 'database name'
},


## Starting App

**Without Migrations**

```
npm install
npm start
```

**With Migrations**

```
npm install
node_modules/.bin/sequelize db:migrate
npm start
```

This will start the application and create an sqlite database in your app dir.
Just open [http://localhost:3000](http://localhost:3000).

## Running Tests

We have added some [Mocha](https://mochajs.org) based test. You can run them by `npm test`


## Setup in Details

In order to understand how this application has been built, you can find the
executed steps in the following snippet. You should be able to adjust those
steps according to your needs. Please note that the view and the routes aren't
described. You can find those files in the repo.

#### Express Setup

First we will create a bare Express App using `express-generator` [Express Generator](https://expressjs.com/en/starter/generator.html)
```bash
# install express generator globally
npm install -g express-generator

# create the sample app
express express-example
cd express-example

# install all node modules
npm install
```

#### Sequelize Setup

Now we will install all sequelize related modules.

```bash
# install ORM , CLI and SQLite dialect
npm install sequelize sequelize-cli sqlite3

# generate models
node_modules/.bin/sequelize init
node_modules/.bin/sequelize model:create --name User --attributes username:string
node_modules/.bin/sequelize model:create --name Task --attributes title:string
```

We are using `.sequelizerc` setup change config path for migrations. You can read more about this in [migration docs](http://docs.sequelizejs.com/manual/tutorial/migrations.html#the-sequelizerc-file)

```js
// .sequelizerc
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js')
}
```

You will now have a basic express application with some additional directories
(config, models, migrations). Also you will find two migrations and models.
One for the `Category` and one for the `Product`.

In order to associate the models with each other, you need to change the models
like this:

```js
// task.js
// ...
  Product.associate = function(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);
    Product.belongsTo(models.Category, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
// ...
```

```js
// user.js
// ...
  Category.associate = function(models) {
    Category.hasMany(models.Product);
  }
// ...
```

This association will create an attribute `UserId` in `Task` model. We have to amend our `create-task` migration and add this column.

```js
// xxxxxxx-create-task.js
// ...
  UserId: {
    type: Sequelize.INTEGER,
    onDelete: "CASCADE",
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  }
// ...
```

If you want to use the automatic table creation that sequelize provides,
you have to adjust the `bin/www` file to this:

```js
#!/usr/bin/env node

var app = require('../app');
var debug = require('debug')('init:server');
var http = require('http');
var models = require("../models");

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(function () {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

function normalizePort(val) { /* ... */ }
function onError(error) { /* ... */ }
function onListening() { /* ... */ }
```

And finally you have to adjust the `config/config.js` to fit your environment.
Once thats done, your database configuration is ready!



## Request responses

Categories

To get all categories with corresponding products

API URL - http://localhost:3000/categories/getCategories

Request - not needed

Example Response - 

 [ {
        "name": "Electronics",
        "id": "687d9e70-4327-11ea-9905-b126f109f72d",
        "createdAt": "2020-01-30T06:11:52.000Z",
        "updatedAt": "2020-01-30T06:11:52.000Z",
        "Products": [
            {
                "name": "Samsung EX v2",
                "id": "b6fad9a0-4327-11ea-88c4-bd28b390c20a",
                "createdAt": "2020-01-30T06:14:04.000Z",
                "updatedAt": "2020-01-30T06:14:04.000Z",
                "CategoryId": "687d9e70-4327-11ea-9905-b126f109f72d"
            },
            {
                "name": "IPhone Latest",
                "id": "bc62f990-4327-11ea-88c4-bd28b390c20a",
                "createdAt": "2020-01-30T06:14:13.000Z",
                "updatedAt": "2020-01-30T06:14:13.000Z",
                "CategoryId": "687d9e70-4327-11ea-9905-b126f109f72d"
            }
        ]
    } ]


To create Category

API URL - http://localhost:3000/categories/create

EXAMPLE REQUEST -   {  "name": "Electronics" }


EXAMPLE RESPONSE - {  
  "name": "Electronics", createdAt:"something", updatedAt:"somthing",
   id:"3423434234dwed"
}

To create Product

API URL - http://localhost:3000/products/create

EXAMPLE REQUEST -   {  "name": "IPHONE", CategoryId: "3423434234dwed" }


EXAMPLE RESPONSE - {  
  "name": "IPHONE", createdAt:"something", updatedAt:"somthing",
   id:"34234342sdfsdf",
   "CategoryId": "3423434234dwed"
}
