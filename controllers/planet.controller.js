/* eslint-disable consistent-return */
const axios = require('axios');
const Planet = require('../models/planet.model');

// GET functions

exports.get = (req, res) => {
  Planet.find(req.params, (err, planet) => {
    if (err) return err;
    res.send(planet);
  });
};

exports.travel_to_planet = (req, res) => {
  Planet.find({ name: req.params.name.toUpperCase() }, (err, planet) => {
    if (planet.length !== 0) res.send(planet);
    else res.send('Viajar pelo hiperespaço não é igual passear pelo parquinho não, garoto.');
  });
};

exports.planet_by_id = (req, res) => {
  Planet.findById(req.params.id, (err, planet) => {
    if (err) return err;
    res.send(planet);
  });
};

// POST functions

exports.post = (req, res) => {
  axios.get(`https://swapi.dev/api/planets/?search=${req.body.name.toUpperCase()}`)
    .then((response) => {
      const episodesQnt = response.data.results[0].films;

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

// PUT functions

exports.planet_update = (req, res) => {
  req.body.name = req.body.name.toUpperCase();
  req.body.weather = req.body.weather.toUpperCase();
  req.body.terrain = req.body.terrain.toUpperCase();
  Planet.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) return err;
    res.send('Planeta atualizado!!');
  });
};

exports.planet_populate = (req, res) => {
  axios.get('https://swapi.dev/api/planets/')
    .then((response) => {
      const resp = response.data.results;
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < resp.length; index++) {
        const planet = new Planet(
          {
            name: resp[index].name.toUpperCase(),
            weather: resp[index].climate.toUpperCase(),
            terrain: resp[index].terrain.toUpperCase(),
          },
        );

        planet.save((err) => {
          if (err) {
            return err;
          }
        });
      }
      res.send('Há muito tempo numa galáxia muito muito distante');
    })
    .catch((error) => {
      res.send(error);
    });
};

// DELETE functions

exports.planet_delete = (req, res) => {
  Planet.findByIdAndRemove(req.params.id, (err) => {
    if (err) return err;
    res.send('Me parece que a estrela da morte passou aqui :(');
  });
};
