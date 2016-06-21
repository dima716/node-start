'use strict';

var counter = require('../lib/counter');

describe('counter', function() {
  it('should get counter value', function() {
    //initial value for counter is 0
    expect(counter.getValue()).toBe(0);
  });

  it('should set counter value', function() {
    counter.setValue(42);
    expect(counter.getValue()).toBe(42);
  });

  it('should reset counter value', function() {
    counter.resetValue();
    expect(counter.getValue()).toBe(0);
  });

  it('should increment counter value', function() {
    counter.setValue(0);
    counter.incrementValue();
    expect(counter.getValue()).toBe(1);
  });

  it('should decrement counter value', function() {
    counter.setValue(0);
    counter.decrementValue();
    expect(counter.getValue()).toBe(-1);
  });
});
