# Very simple counter

Can do simple operations with counter: increment, decrement, reset, get and
set counter value. 

Install: 

```javascript
npm install counter716
```

Test:

```
npm test
```

Lint: 

```
npm run lint
```

Use: 

```javascript
var counter = require('counter716');

//set value
counter.setValue(42);

//get value
var counterValue = counter.getValue(); 

//increment value
counter.increment();

//decrement value
counter.decrement();

//reset value
counter.reset(); // set counter value to zero
```

