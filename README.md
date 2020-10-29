# Social Wall

This is a small web application built for beginners that highlights essential web programming topics such as:

- The HTTP request response life cycle
- Node's [Express][url-expressjs] web application framework
- Fundamental patterns in computer programming (loops, branching, variables)
- Data persistence using a SQL database
- HTML templating using [Handlebars][url-handlebarsjs]
- Deploying an application using Heroku

## Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
- [Installing PostgreSQL](#installing-postgresql)
  - [Mac](#mac)
  - [Windows](#windows)
    - [No Password Prompt](#no-password-prompt)
    - [Default To `postgres` User](#default-to-postgres-user)
- [Templating With Handlebars](#templating-with-handlebars)
- [Interacting With The Database](#interacting-with-the-database)
- [GET vs POST](#get-vs-post)
- [Iterations](#iterations)
- [Deploying To Heroku](#deploying-to-heroku)

## Getting Started

**Note**: This project requires you to install PostgreSQL. See [Installing PostgreSQL](#Installing-PostgreSQL) for instructions.

1. Fork this repository
1. Clone your fork
1. Run `npm install` inside the project directory
1. Get started on the [Iterations](#Iterations)

`npm run db:create` will create local databases for development and testing.

Look at `loadRoutes.js` to see the code that renders the website.

## Installing PostgreSQL

### Mac

You can install PostgreSQL on a Mac with `brew`:

```console
brew install postgresql
```

Once installed, start the database server with

```console
brew services start postgresql
```

### Windows

Download the Windows edition of PostgreSQL from <https://www.enterprisedb.com/downloads/postgres-postgresql-downloads>.

We want to run our own local instance of PostgreSQL. By default, the Windows version of PostgreSQL creates a new user called "postgres" on your computer and wants you to (1) connect with that user and (2) type the password you specified during installation.

This makes development awkward, so we'll change (1) and (2).

#### No Password Prompt

To remove the password prompt, open the following file in VS Code:

```text
C:\Program Files\PostgreSQL\13\data\pg_hba.conf
```

Change all instances of `scram-sha-256` to `trust` and save the file.

#### Default To `postgres` User

Run PowerShell **as administrator** (right-click power shell and select "Run As Adminnistrator"). From inside the administrator shell, run the following two commands:

```console
setx PGUSER postgres
Restart-Service postgresql-x64-13
```

The first command will tell PostgreSQL to connect to your local instance as the "postgres" user. The second command tells Windows to restart the PostgreSQL service so that the new settings can take place.

You might have to open a new GitBASH terminal for the above settings to take effect.

## Templating With Handlebars

We use [Handlebars.js][url-handlebarsjs] for templating instead of using JavaScript template literals. This allows us to keep the logic about what the page looks like separate.

The templates are called "views" and live in the `views/` directory. They use a special syntax that permits basic programming constructs like looping, conditionals, etc. from inside the template itself. In a Handlebars template, the Handlebars-specific parts are marked by double curly brackets `{{...}}`.

The idea is you create a template like

```handlebars
Hello, my name is {{name}} and I am {{age}} years old.
```

Then you pass in an object to the template that has a `name` and `age` field and Handlebars will replace `{{name}}` and `{{age}}` with the values from the object.

You can pass in arrays of values and use `{{#each ...}}` to repeat a section of the template once for each value in the array.

See `index.hbs` for the main page.

## Interacting With The Database

We are using one [Knex.js][url-knexjs] to interact with the database.

## GET vs POST

Say we visit `http://localhost:3000/potato`. We might say we're making an HTTP request to `/potato`.

One invisible fact is that HTTP requests come in multiple flavors. Every request has something called a "method" associated with it. The default method is called `GET`, but there's also a `POST` method.

From the web server's perspective, `GET /potato` and `POST /potato` are different requests and you can respond to them independently.

Historically, HTTP was about sharing documents. `GET` requests are meant to represent asking the server for a particular document. `POST` requests are meant to represent sending a new document from the client to the server.

`POST` requests are typically used when inserting new data into a database, e.g., posting a new message to the social wall.

In Express, anywhere you'd normally see `app.get` or `router.get` or the like, you could instead write `app.post` or `router.post` to listen for a `POST` request.

## Iterations

### [v0.1] Start The Core App <!-- omit in toc -->

To create the local development database, run the following command inside the project directory:

```console
npm run db:create
```

If this fails it means your PostgreSQL installation is broken. Find an instructor and get help! If PostgreSQL isn't set up correctly, nothing will work.

Next, run the following command to create the initial tables:

```console
npm run db:migrate
```

Finally, run the following to start the server:

```console
npm start
```

Visit <http://localhost:3000> to see the app! Look at `loadRoutes.js` to see the code that renders the website.

### [v0.2] Deploy App To Heroku <!-- omit in toc -->

See [Deploying To Heroku](#Deploying-To-Heroku) below for instructions on how to make the application available to the public. You can skip this step for now, if you want.

### [v1.0] Posting Messages <!-- omit in toc -->

- :heavy_check_mark: A guest may create a message
- :heavy_check_mark: A guest may see a list of all messages

### [v1.1] Your Choice <!-- omit in toc -->

Come up with a list of features you're interested in implementing. Pick one to implement. Pick something small with the goal of better familiarizing yourself with the app.

Do not spend more than ~10 minutes coming up with ideas and deciding on which one to attempt. Start with something simple enough. You'll have better ideas once you've worked on a simple feature a bit.

## Deploying To Heroku

[Heroku][url-heroku] is a service that allows us to host our application and make it available to the whole world. Every time we have a new version of our application, we push it to Heroku (a process called *deploying*).

One nice feature of Heroku is that we use `git` to publish new versions of your application.

Before anything else, do the following:

1. Create an account on [Heroku][url-heroku]
1. [Download and install the Heroku command line tool][url-heroku-install-cli]
1. Once the `heroku` command is available, log into your Heroku account with the following command:

   ```console
   heroku login
   ```

1. Inside the project directory, run the following command to create a new Heroku application (replace `some-example-app` with a *unique* name for your application):

    ```console
    heroku create some-example-app
    ```

1. Add PostgreSQL to your Heroku instance with the following command:

    ```console
    heroku addons:create heroku-postgresql:hobby-dev
    ```

You're now ready to deploy to Heroku using `git`:

```console
git push heroku master
```

Once `git push` has finished, run the following command to ensure the database is up to date:

```console
heroku run npm run db:migrate
```

Finally, run

```console
heroku domains
```

to see the domain for your application. Open it up in your browser of choice!

[url-expressjs]: https://expressjs.com/
[url-handlebarsjs]: https://handlebarsjs.com/
[url-chocolatey]: https://chocolatey.org
[url-chocolatey-postgresql]: https://chocolatey.org/packages/postgresql
[url-knexjs]: http://knexjs.org/
[url-objectionjs]: https://vincit.github.io/objection.js/
[url-heroku]: https://heroku.com
[url-heroku-install-cli]: https://devcenter.heroku.com/articles/heroku-cli#download-and-install
