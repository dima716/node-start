var utils = require('../lib/utils');

describe('Utils', () => {
  describe('deleteDuplicates', () => {
    it('should delete duplicates of items in a array', () => {
      const arr = [1,1,2,2,3,3,'test','test'];
      expect(utils.deleteDuplicates(arr)).toEqual([1,2,3,'test']);
    });

    it('should leave array unchanged if there are no duplicates', () => {
      const arr = [1,2,3,'test'];
      expect(utils.deleteDuplicates(arr)).toEqual([1,2,3,'test']);
    });
  });

  describe('getElementContent', () => {
    var text = 'text';
    var element = {
      text: () => {}
    };

    it('track that $(element).text() was called', () => {
      spyOn(element, 'text').and.returnValue(text);
      utils.getElementContent(element);
      expect(element.text).toHaveBeenCalledWith();
    });

    it('should return element content', () => {
      spyOn(element, 'text').and.returnValue(text);
      expect(utils.getElementContent(element)).toBe('text');
    });

    it('should return undefined if element has no content', () => {
      spyOn(element, 'text').and.returnValue('');
      expect(utils.getElementContent(element)).toBeUndefined();
    });
  });

  describe('isLinkValid', () => {
    it('should filter email link', () => {
      expect(utils.isLinkValid('mailto:test@example.com', 'test.com', 'test.com')).toBe(false);
    });

    it('should filter tel link', () => {
      expect(utils.isLinkValid('tel:+000000000', 'test.com', 'test.com')).toBe(false);
    });

    it('should filter anchor link', () => {
      expect(utils.isLinkValid('#test', 'test.com', 'test.com')).toBe(false);
    });

    it('should filter link with different domain', () => {
      expect(utils.isLinkValid('#test', 'test2.com', 'test.com')).toBe(false);
    });

    it('should not filter link if it is a link to the page and has the same domain as website url', () => {
      expect(utils.isLinkValid('/test', 'test.com', 'test.com')).toBe(true); // tested link is test.com/test
    });
  });

  describe('normalizeHref', () => {
    it('should remove // in the beginning of the href', () => {
      expect(utils.normalizeHref('//test.com')).toBe('test.com');
    });

    it('should not remove // if it is not in the beginning of the href', () => {
      expect(utils.normalizeHref('http://test.com')).toBe('http://test.com');
    });
  });
});


