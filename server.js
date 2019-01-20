const express = require('express'); //node-server
const hbs = require('hbs'); //handlebars
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //directory: where HBS files are located
app.set('view engine', 'hbs');

app.use((req, res, next) => { //next: tell express when middleware is done -> if next is not called, then app doesn't continue
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    };
  });
  next();
}); //app.use = register middleware for Express

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {//1st arg= name of arg, 2nd arg: function to run
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {//1st arg= name of arg, 2nd arg: function to run
  return text.toUpperCase();
});

app.get('/', (request, response) => { //a route -> 1st argument: URL, 2nd argument: which function to call (request,response)
  //response.send('<h1>hello express!</h1>');
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'welcome michi'
  });
  /*response.send({
    name: 'Michi',
    likes: [
      'biking',
      'cities'
    ]
  })*/
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
      pageTitle: 'About Page'
    });
});

app.get('/bad', (request, response) => {
    response.send({
      eorrMessage: 'Unable to fulfill request'
    });
});

app.listen(3000, () => { //function: executed once server is up and running
  console.log('Server is up on port 3000');
}); //host binding --> localhost:3000
