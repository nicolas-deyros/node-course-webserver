//Node module to look for path directory
const path = require('path');
//Express NPM module
const express = require('express');
// HBS Module
const hbs = require('hbs');
const app = express();

//HEROKU PORT
const port = process.env.PORT || 3000;

//MODULES CREATED
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

//DEFINE PATH FOR EXPRESS CONFIG
//Directory Path define on a variable
const publicDirectoryPath = path.join(__dirname, '../public');

//Views path directory location
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//use handerbar in express
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Use express to serve content (STATIC DIRECTORY)
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Nico',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About inject',
    name: 'Nico',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'jano',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address was provide',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          ciudad: req.query.address,
          clima: forecastData,
          location: location,
        });
      });
    }
  );
});

//QUERYSTRING FOR SEARCH
app.get('/products', (req, res) => {
  if (!req.query.s) {
    return res.send({
      error: 'you must provide a search term',
    });
  }
  console.log(req.query.s);
  res.send({
    products: [],
  });
});

// MATCH SUBSECTION OF A SECTION

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 estas perdido',
    name: 'help 404',
    errorMessage: 'Help article not found',
  });
});

//ERROR HANDERLLS (ALWAYS LAST BECAUSE THE * (REGEX) MATCH EVERYTHING)
app.get('*', (req, res) => {
  res.render('404', {
    title: '404 estas perdido',
    name: 'juan 404',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log('Server is up on port ', port);
});
