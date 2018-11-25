const i18n = require('i18n');

/**
 * Makes and translates  a message using i18n library
 * @param {String} msgCode - The message code which i18n library looks for to translate.
 * @param {String} type - The type can be: error, warning, success or info.
 * @returns {Object} Returns object with the type and the message translated
 */
const makeMessage = (msgCode, type) => {
  const message = i18n.__(msgCode); // eslint-disable-line no-underscore-dangle

  return {
    message: {
      type,
      body: message,
    },
  };
};

module.exports = makeMessage;
