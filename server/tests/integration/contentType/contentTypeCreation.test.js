const request = require('supertest');
const fs = require('fs');
const app = require('../../../index');
const fakeJwtToken = require('../../test_helpers/fakeJwtToken');
const ContentType = require('../../../models/core/ContentType');

describe('Post to /content_type/create', () => {
  const generatedModelsPath = `${__basedir}/models`;
  const generatedRoutesPath = `${__basedir}/router/api`;
  const contentTypeName = 'apitest';
  let token;
  let contentTypeData;

  beforeAll(async done => {
    // Fake Token
    token = await fakeJwtToken();

    // Fake data
    contentTypeData = {
      contentTypeName,
      shortText: 'test title',
    };

    // Creates content type
    request(app)
      .post('/content_type/create')
      .set('authorization', token)
      .send(contentTypeData)
      .end(() => {
        done();
      });
  });

  it('Creates a Content Type in the db', async done => {
    const contentType = await ContentType.findOne({ contentTypeName });
    expect(contentType.contentTypeName).toBe(`${contentTypeName}`);
    done();
  });

  it('Generates a model', done => {
    const files = fs.readdirSync(generatedModelsPath);
    expect(files).toContain(`${contentTypeName}.js`);

    // Deletes generated model
    fs.unlink(`${generatedModelsPath}/${contentTypeName}.js`, () => {
      done();
    });
  });

  it('Generates a route', done => {
    const files = fs.readdirSync(generatedRoutesPath);
    expect(files).toContain(`${contentTypeName}.js`);

    // Deletes genereated router
    fs.unlink(`${generatedRoutesPath}/${contentTypeName}.js`, () => {
      done();
    });
  });
});
