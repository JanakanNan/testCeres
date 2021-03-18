const getParams = require ('./table');
const sizeCase = require('./table');

describe('getParms', () => {
    it('should pass', () => {
        const location = {
            ...window.location,
            search: '?height=200&width=200',
        };
        Object.defineProperty(window, 'location', {
            writable: true,
            value: location,
        });
        const actual = getParams();
        expect(actual).toBe('200');
    });
});

describe('sizeCase', () => {
    it('should return 10 for 400', function () {
        expect(sizeCase(400)).toEqual(10)
    });
});