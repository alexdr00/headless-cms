const i18n = require('i18n');
const path = require('path');
const { makeMessage } = require('../../lib/messageMaker');

i18n.configure({
  locales: ['es', 'en'],
  defaultLocale: 'en',
  directory: path.join(__dirname, '../../locales'),
});

describe('Make Message', () => {
  it('Should return a spanish message with type info', () => {
    i18n.setLocale('es');
    const message = makeMessage('Hello World', 'info');

    expect(message).toEqual({
      message: {
        type: 'info',
        body: 'Hola Mundo',
      },
    });
  });

  it('Should return an english message with type info', () => {
    i18n.setLocale('en');
    const message = makeMessage('Hello World', 'info');

    expect(message).toEqual({
      message: {
        type: 'info',
        body: 'Hello World',
      },
    });
  });
});
