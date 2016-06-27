var config;

if (process.env.NODE_ENV === 'development') {
  config = {
    depth: process.env.DEPTH || 1,
    outputJsonSpaces: 2,
    jsonFileName: 'data.json'
  };
}

if (process.env.NODE_ENV === 'test') {
  config = {
    depth: 1,
    website: 'https://frontendmasters.com/',
    selector: 'a'
  }
}

module.exports = config;

