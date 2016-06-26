var checkEmptyField = (field) => {
  return !!field.trim();
};

var checkFieldType = (field) => {
  return isNaN(Number(field));
};

module.exports = {
  checkEmptyField: checkEmptyField,
  checkFieldType: checkFieldType
};
