let Router = require('express-promise-router');

/**
 * Our router needs access to our database, so we define
 * a function that takes the knex object as an argument
 * and returns a new set of routes.
 */

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
} 

function loadRoutes(knex) {
  let router = new Router();

  // GET /
  router.get('/', async(request, response) => {
    let messages = await knex('messages').select('*').orderBy('created_at', 'DESC').limit(10);
    console.log(messages)
    let viewName = 'index';
    let viewData = {color: getRandomColor(), messages:messages};
    console.log(viewData);
    response.render(viewName, viewData);
  });

  // POST /messages
  router.post('/messages', async(request, response) => {
    //let messageBody = request.body.body;
    let messageTime = new Date();

    getRandomColor();

    let messageData = {
      color: getRandomColor(), 
      created_at: messageTime,
    };

    // There is no error handling here.
    await knex('messages').insert(messageData);
    response.redirect('/');
  });

  return router;
}

module.exports = loadRoutes;
