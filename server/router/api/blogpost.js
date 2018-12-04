const express = require('express');

const router = express.Router();
const controller = require('../../lib/creators/createControllerStructure')('blogpost');

router.post('/blogpost/create', controller.create);

router.get('/blogpost/all', controller.readAll);

router.get('/blogpost/:id', controller.readOne);

router.put('/blogpost/update/:id', controller.update);

router.delete('/blogpost/delete/:id', controller.remove);

module.exports = router;
