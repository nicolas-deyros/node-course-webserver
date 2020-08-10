const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const key = '';
  const url =
    'http://api.weatherstack.com/current?access_key=d9fcc01261c1951eb6e3381e2465313e&query=' +
    latitude +
    ',' +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather location services!', undefined);
    } else if (body.error) {
      callback(
        'Unable to find weather location. Try another search!' +
          body.error.info,
        undefined
      );
    } else {
      callback(undefined, {
        tiempo: body.current.weather_descriptions,
        hora: body.current.observation_time,
        temperatura: body.current.temperature,
      });
    }
  });
};

module.exports = forecast;
