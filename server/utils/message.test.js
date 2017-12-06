const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

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

describe('Test generateLocationMessage', () => {
    it('Should return correct location object', () => {
        var from = 'testuser';
        var latitude = 100;
        var longitude = 22.5;
        var expectedUrl = `https://www.google.com/maps?g=${latitude},${longitude}`;
        var msg = generateLocationMessage(from, latitude, longitude);
        expect(msg.from).toBe(from);
        expect(msg.url).toBe(expectedUrl);
        expect(msg.createdAt).toBeA('number');
    })
})