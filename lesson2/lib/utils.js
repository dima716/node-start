const parse = require('url-parse');

const deleteDuplicates = (arr) => {
  const result = [];

  arr.forEach( (element, index) => {
    if (result.indexOf(element) === -1) {
      result.push(element);
    }
  });

  return result;
};

const getElementContent = (element) => {
  const elementContent = element.text();

  if ( elementContent.length !== 0) {
    return elementContent;
  }

  return '';
};

const isLinkValid = (linkHref, linkHostName, websiteHostName) => {
  if (linkHref) {
    if (linkHref.startsWith('#') || linkHref.startsWith('tel') || linkHref.startsWith('mailto')) {
      return false;
    }

    // check if link has the same domain as website url
    return linkHostName == websiteHostName;
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
  deleteDuplicates: deleteDuplicates,
  getElementContent: getElementContent,
  isLinkValid: isLinkValid,
  normalizeHref: normalizeHref
};
