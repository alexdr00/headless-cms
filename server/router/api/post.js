const express = require('express');

const router = express.Router();

// Relative to /router/api
const controller = require('../../lib/createControllerStructure')('post');

router.post('/post/create', controller.create);

router.get('/post/all', controller.readAll);

router.get('/post/:id', controller.readOne);

router.put('/post/update/:id', controller.update);

router.delete('/post/delete/:id', controller.remove);

module.exports = router;
