const expect = require('expect');
const {generateMessage} = require('./message');

describe('Test generateMessage', () => {
    it('Should return correct message object', () => {
        var from = 'punit';
        var text = 'message';
        var msg = generateMessage(from, text);
        expect(msg.from).toBe(from);
        expect(msg.text).toBe(text);
        expect(msg.createdAt).toExist();
        expect(msg.createdAt).toBeA('number');
    });
});