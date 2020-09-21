/* eslint-disable consistent-return */
const axios = require('axios');
const Planet = require('../models/planet.model');

exports.get = (req, res) => {
  Planet.find(req.params, (err, planet) => {
    if (err) return err;
    res.send(planet);
  });
};

exports.post = (req, res) => {
  let episodesQnt;
  axios.get(`https://swapi.dev/api/planets/?search=${req.body.name.toUpperCase()}`)
    .then((response) => {
      episodesQnt = response.data.results[0].films;

      const planet = new Planet(
        {
          name: req.body.name.toUpperCase(),
          weather: req.body.weather.toUpperCase(),
          terrain: req.body.terrain.toUpperCase(),
          episodes: episodesQnt.length,
        },
      );

      planet.save((err) => {
        if (err) {
          return err;
        }
        res.send('Planeta Criado!!');
      });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {
      res.send('Planeta não existe na franquia :( Planeta não criado.');
    });
};

exports.planet_by_id = (req, res) => {
  Planet.findById(req.params.id, (err, planet) => {
    if (err) return err;
    res.send(planet);
  });
};

exports.planet_by_name = (req, res) => {
  Planet.find({ name: req.params.name }, (err, planet) => {
    if (err) return err;
    res.send(planet);
  });
};

exports.planet_update = (req, res) => {
  req.body.name = req.body.name.toUpperCase();
  req.body.weather = req.body.weather.toUpperCase();
  req.body.terrain = req.body.terrain.toUpperCase();
  Planet.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) return err;
    res.send('Planeta atualizado!!');
  });
};

exports.planet_delete = (req, res) => {
  Planet.findByIdAndRemove(req.params.id, (err) => {
    if (err) return err;
    res.send('Me parece que a estrela da morte passou aqui :(');
  });
};
