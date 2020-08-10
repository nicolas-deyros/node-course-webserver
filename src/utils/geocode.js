const request = require('request');

const lang = '&language=es';

const geocode = (address, callback) => {
  const geoKey =
    '?access_token=pk.eyJ1IjoidGVzdDIxNDN1MTA5bjBkOW5xIiwiYSI6ImNrZDhuYnQyZzBheHQzMW1rajQ4eXZ5NzEifQ.mqAF-JAa9Fq6GBW6GkuCxQ';
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    `.json${geoKey}${lang}&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!');
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search!');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
