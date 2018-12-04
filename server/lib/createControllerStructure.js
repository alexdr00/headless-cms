const { makeMessage } = require('./messageMaker');

// Capitilize first letter
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Creates a basic REST API for the given Content Type (which is the db model)
 *
 * @param {String} contentTypeName - Model to create the REST API for
 * @returns {Object} - returns the object controller that handles all the CRUD
 */
const createControllerStructure = contentTypeName => {
  // eslint-disable-next-line
  const Model = require(`../../models/${contentTypeName}`);
  const controllerStructure = {};

  controllerStructure.create = async (req, res) => {
    const data = req.body;
    const newItem = new Model(data);
    await newItem.save();

    res.json(makeMessage(`${capitalize(contentTypeName)} created successfully`, 'success'));
  };

  controllerStructure.readAll = async (req, res) => {
    const allItems = await Model.find({});

    res.json(allItems);
  };

  controllerStructure.readOne = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const item = await Model.findById(id);

    res.json(item);
  };

  controllerStructure.update = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    await Model.findByIdAndUpdate(id, data);

    res.json(makeMessage(`${capitalize(contentTypeName)} updated successfully`, 'success'));
  };

  controllerStructure.remove = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    await Model.findByIdAndRemove(id, data);

    res.json(makeMessage(`${capitalize(contentTypeName)} removed successfully`, 'success'));
  };

  return controllerStructure;
};

module.exports = createControllerStructure;
