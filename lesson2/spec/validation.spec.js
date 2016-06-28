const validation = require('../lib/validation');

describe('Validation', () => {
  it('should check empty field', () => {
    expect(validation.checkEmptyField('')).toBe(false);
    expect(validation.checkEmptyField(' ')).toBe(false);
    expect(validation.checkEmptyField(undefined)).toBe(false);
    expect(validation.checkEmptyField('test')).toBe(true);
  });

  it('should check string type', () => {
    expect(validation.checkFieldTypeString(123)).toBe(false);
    expect(validation.checkFieldTypeString('test')).toBe(true);
  });

  it('should check number type', () => {
    expect(validation.checkFieldTypeNumber('test')).toBe(false);
    expect(validation.checkFieldTypeNumber(123)).toBe(true);
  })
});
