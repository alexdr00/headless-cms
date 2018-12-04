const express = require('express');

const router = express.Router();
const controller = require('../../lib/creators/createControllerStructure')('product');

router.post('/product/create', controller.create);

router.get('/product/all', controller.readAll);

router.get('/product/:id', controller.readOne);

router.put('/product/update/:id', controller.update);

router.delete('/product/delete/:id', controller.remove);

module.exports = router;
