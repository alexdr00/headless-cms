module.exports = contentTypeName => `const express = require('express');

const router = express.Router();

// Relative to /router/api
const controller = require('../../lib/createControllerStructure')('${contentTypeName}');

router.post('/${contentTypeName}/create', controller.create);

router.get('/${contentTypeName}/all', controller.readAll);

router.get('/${contentTypeName}/:id', controller.readOne);

router.put('/${contentTypeName}/update/:id', controller.update);

router.delete('/${contentTypeName}/delete/:id', controller.remove);

module.exports = router;
`;
