const util = require('util');

const checkEmptyField = (field) => {
  return !util.isUndefined(field) && !!field.trim();
};

const checkFieldTypeString = (field) => {
  return !checkFieldTypeNumber(field);
};

const checkFieldTypeNumber = (field) => {
  return !isNaN(Number(field));
};

module.exports = {
  checkEmptyField: checkEmptyField,
  checkFieldTypeString: checkFieldTypeString,
  checkFieldTypeNumber: checkFieldTypeNumber
};
