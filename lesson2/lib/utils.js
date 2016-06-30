const deleteDuplicates = (arr) => {
  const result = [];

  arr.forEach((element) => {
    if (result.indexOf(element) === -1) {
      result.push(element);
    }
  });

  return result;
};

const getElementContent = (element) => {
  const elementContent = element.text();

  if (elementContent.length !== 0) {
    return elementContent;
  }
};

const stripTrailingSlash = (str) => {
  if (str.slice(-1) == '/') {
    return str.slice(0, str.length - 1);
  }
  return str;
};

const isLinkValid = (linkHref) => {
  if (linkHref) {
    const invalidSchemes = ['data', 'geo', 'javascript', 'mailto', 'sms', 'tel', '#'];

    const isLinkValid = invalidSchemes.every((scheme) => {
      return !linkHref.startsWith(scheme);
    });

    return isLinkValid;
  } else {
    return false;
  }
};

const normalizeHref = (href) => {
  href = stripTrailingSlash(href);

  if (href.startsWith('//')) {
    return href.replace('//', '');
  } else {
    return href;
  }
};


module.exports = {
  stripTrailingSlash: stripTrailingSlash,
  deleteDuplicates: deleteDuplicates,
  getElementContent: getElementContent,
  isLinkValid: isLinkValid,
  normalizeHref: normalizeHref
};
