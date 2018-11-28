const i18n = require('i18n');

/**
 * Makes and translates a message using i18n library
 * @param {String} msg - The message which i18n translates.
 * @param {String} type - The type can be: warning, success or info.
 * @returns {Object} Returns object with the type and the message translated
 */
const makeMessage = (msg, type) => {
  const message = i18n.__(msg); // eslint-disable-line no-underscore-dangle

  return {
    message: {
      type,
      body: message,
    },
  };
};

/**
 * Makes and translates error messages using i18n library
 * @param {Array} msgs - The messages which i18n translates.
 * @returns {Object} Returns object with type: error and an array of messages translated
 */
const makeErrorMessages = msgs => {
  // eslint-disable-next-line no-underscore-dangle
  const errorMessages = msgs.map(errMsg => i18n.__(errMsg));

  return {
    message: {
      type: 'error',
      errors: errorMessages,
    },
  };
};

module.exports = { makeMessage, makeErrorMessages };
