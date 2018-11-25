const i18n = require('i18n');
const path = require('path');
const makeMessage = require('../../lib/makeMessage');

i18n.configure({
  locales: ['es', 'en'],
  defaultLocale: 'en',
  directory: path.join(__dirname, '../../locales'),
  objectNotation: true,
});

describe('Make Message', () => {
  it('Should return a spanish message with type info', () => {
    i18n.setLocale('es');
    const message = makeMessage('msg.test.helloWorld', 'info');

    expect(message).toEqual({
      message: {
        type: 'info',
        body: 'Hola Mundo',
      },
    });
  });

  it('Should return an english message with type info', () => {
    i18n.setLocale('en');
    const message = makeMessage('msg.test.helloWorld', 'info');

    expect(message).toEqual({
      message: {
        type: 'info',
        body: 'Hello World',
      },
    });
  });
});
