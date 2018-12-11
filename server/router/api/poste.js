const express = require('express');

const router = express.Router();

// Relative to /router/api
const controller = require('../../lib/createControllerStructure')('poste');

router.post('/poste/create', controller.create);

router.get('/poste/all', controller.readAll);

router.get('/poste/:id', controller.readOne);

router.put('/poste/update/:id', controller.update);

router.delete('/poste/delete/:id', controller.remove);

module.exports = router;
