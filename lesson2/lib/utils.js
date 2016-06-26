const parse = require('url-parse');

const deleteDublicates = (arr) => {
  const result = [];

  arr.forEach( (element, index) => {
    if (result.indexOf(element) === -1) {
      result.push(element);
    }
  });

  return result;
};

const getElementsContent = ($, elements) => {
  var contents = [];

  contents = elements.map( (index, element) => {
    const elementContent = $(element).text();

    if ( elementContent.length !== 0) {
      return elementContent;
    }
  }).get();

  return contents;
};

const isLinkValid = (linkHref, baseUrl) => {
  if (linkHref) {
    if (linkHref.startsWith('#') || linkHref.startsWith('tel') || linkHref.startsWith('email')) {
      return false;
    }

    const linkObject = parse(linkHref, baseUrl);
    const reqUrlObject = parse(baseUrl);

    // check if link has the same domain as web-site url
    return linkObject.hostname && linkObject.hostname === reqUrlObject.hostname;
  }
};

const normalizeHref = (href) => {
  if ( href.startsWith('//') ) {
    return href.replace('//', '');
  } else {
    return href;
  }
};


module.exports = {
  deleteDublicates: deleteDublicates,
  getElementsContent: getElementsContent,
  isLinkValid: isLinkValid,
  normalizeHref: normalizeHref
};
