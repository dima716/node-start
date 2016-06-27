var util = require('util');

var checkEmptyField = (field) => {
  return  !util.isUndefined(field) && !!field.trim();
};

var checkFieldTypeString = (field) => {
  return !checkFieldTypeNumber(field);
};

var checkFieldTypeNumber = (field) => {
  return !isNaN(Number(field))
}

module.exports = {
  checkEmptyField: checkEmptyField,
  checkFieldTypeString: checkFieldTypeString,
  checkFieldTypeNumber: checkFieldTypeNumber
};
