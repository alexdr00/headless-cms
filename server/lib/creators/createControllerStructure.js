const { makeMessage } = require('../messageMaker');

const createControllerStructure = contentTypeName => {
  // eslint-disable-next-line
  const Model = require(`../../models/${contentTypeName}`);
  const controllerStructure = {};

  controllerStructure.create = async (req, res) => {
    const data = req.body;
    const newItem = new Model(data);
    await newItem.save();

    res.json(makeMessage(`${contentTypeName} created successfully`, 'success'));
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
    res.json(makeMessage(`${contentTypeName} updated successfully`, 'success'));
  };

  controllerStructure.remove = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    await Model.findByIdAndRemove(id, data);
    res.json(makeMessage(`${contentTypeName} removed successfully`, 'success'));
  };

  return controllerStructure;
};

module.exports = createControllerStructure;
