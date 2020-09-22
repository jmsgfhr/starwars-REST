const express = require('express');

const router = express.Router();

const planetController = require('../controllers/planet.controller');

router.get('/planets', planetController.get);
router.get('/travel/:name', planetController.travel_to_planet);
router.get('/planet/:id', planetController.planet_by_id);
router.post('/planets/populate', planetController.planet_populate);
router.post('/planet', planetController.post);
router.put('/planet/:id/update', planetController.planet_update);
router.delete('/planet/:id/delete', planetController.planet_delete);

module.exports = router;
