const request = require('supertest');
const fs = require('fs');
const mongoose = require('mongoose');
const app = require('../../../index');
const fakeJwtToken = require('../../test_helpers/fakeJwtToken');

const contentTypeName = 'apitest';
const generatedModelsPath = `${__basedir}/models`;
const generatedRoutesPath = `${__basedir}/router/api`;
let token;
let Model;

beforeAll(async done => {
  // Fake Token
  token = await fakeJwtToken();

  // Fake data
  const contentTypeData = {
    contentTypeName,
    shortText: 'title',
    longText: 'description',
  };

  request(app)
    .post('/content_type/create')
    .set('authorization', token)
    .send(contentTypeData)
    .end(() => {
      // imports the generated file for api routes
      const router = require(`${generatedRoutesPath}/${contentTypeName}`);
      // imports the generated file for the Model
      Model = require(`${generatedModelsPath}/${contentTypeName}`);

      // Fakes the api routes
      app.use('/api', router);

      // Deletes generated files
      fs.unlinkSync(`${generatedModelsPath}/${contentTypeName}.js`);
      fs.unlinkSync(`${generatedRoutesPath}/${contentTypeName}.js`);
      done();
    });
});

afterEach(done => {
  // Erases all data created in the db.
  mongoose.connection.dropCollection('contenttypes', () => {
    done();
  });
});

describe('Generated REST API', () => {
  describe('Create', () => {
    it('Creates a new Content Type instance in the database', done => {
      const title = 'this is a title';

      request(app)
        .post(`/api/${contentTypeName}/create`)
        .set('authorization', token)
        .send({
          title,
          description: 'This is a description',
        })
        .end((err, res) => {
          expect(res.body.title).toBe(title);
          done();
        });
    });
  });

  describe('Read', () => {
    let item1;
    let item1Saved;

    beforeAll(async () => {
      // First, saves two Content Type instances in the database
      // so they can be read by the tests later on.
      item1 = new Model({ title: 'item one' });
      const item2 = new Model({ title: 'item two' });
      item1Saved = await item1.save();
      await item2.save();
    });

    it('Reads a single Content Type instace from the database', async done => {
      request(app)
        .get(`/api/${contentTypeName}/${item1Saved._id}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body.title).toBe('item one');
          done();
        });
    });

    it('Reads many Content Type instances from the database', async done => {
      request(app)
        .get(`/api/${contentTypeName}/all`)
        .set('authorization', token)
        .end((err, res) => {
          // 3 records including the one created in the create section
          expect(res.body).toHaveLength(3);
          done();
        });
    });
  });

  describe('Update', () => {
    it('Updates the given Content Type instance', async done => {
      const itemToUpdate = new Model({ title: 'to update' });
      const itemToUpdateSaved = await itemToUpdate.save();

      request(app)
        .put(`/api/${contentTypeName}/update/${itemToUpdateSaved._id}`)
        .set('authorization', token)
        .send({
          title: 'new title',
        })
        .end((err, res) => {
          expect(res.body.title).toBe('new title');
          done();
        });
    });
  });

  describe('Delete', () => {
    it('Deletes the given Content Type instance', async done => {
      const itemToDelete = new Model({ title: 'to delete' });
      const itemToDeleteSaved = await itemToDelete.save();

      request(app)
        .delete(`/api/${contentTypeName}/delete/${itemToDeleteSaved._id}`)
        .set('authorization', token)
        .end(async () => {
          const item = await Model.findById(itemToDeleteSaved._id);
          expect(item).toBeNull();
          done();
        });
    });
  });
});
