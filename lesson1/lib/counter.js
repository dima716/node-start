var counterValue = 0;

function getValue() {
  return counterValue;
}

function setValue(value) {
  counterValue = value;
}

function resetValue() {
  counterValue = 0;
}

function incrementValue() {
  counterValue++;
}

function decrementValue() {
  counterValue--;
}

module.exports = {
  getValue: getValue,
  setValue: setValue,
  resetValue: resetValue,
  incrementValue: incrementValue,
  decrementValue: decrementValue
};
