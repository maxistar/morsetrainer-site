import { jest } from '@jest/globals';
import AsyncMorseKey from "../src/asyncMorseKey";
// import morseReader from "./__mocks__/MorseReader";


describe("morse key", () => {

    let reader, key;

    beforeEach(() => {
        jest.useFakeTimers();

        reader = {
            addDot: function() {}
        }
        key = new AsyncMorseKey(reader);
    });

    afterEach(() => {
        jest.useRealTimers();
    })

    it("should at least to be initiated", () => {
        key.pressKey()
        // expect(reader.getBuffer()).toEqual('');
    })


    


})
