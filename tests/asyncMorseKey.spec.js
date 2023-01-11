import { jest } from '@jest/globals';
import AsyncMorseKey from "../src/asyncMorseKey";
// import morseReader from "./__mocks__/MorseReader";


describe("morse key", () => {

    let reader, key;

    beforeEach(() => {
        jest.useFakeTimers();

        reader = {
            addDot: jest.fn(),
            removeDot: jest.fn(),
            addDash: jest.fn(),
            removeDash: jest.fn(),
            removeLastCharacter: jest.fn(),
            switchAlphabet: jest.fn(),
        }
        key = new AsyncMorseKey(reader);
    });

    afterEach(() => {
        jest.useRealTimers();
    })

    it("when key pressed: dot is added", () => {
        key.pressKey()
        expect(reader.addDot.mock.calls).toHaveLength(1)
    })

    it("when key pressed the released and added again: two dots are added", () => {
        key.pressKey()
        expect(reader.addDot.mock.calls).toHaveLength(1)
        key.releaseKey()
        key.pressKey()
        expect(reader.addDot.mock.calls).toHaveLength(2)
    })

    it("when key pressed long time: dot is removed, dash is added", () => {
        key.pressKey()
        jest.advanceTimersByTime(key.getMaxDotDuration() + 100);

        expect(reader.removeDot.mock.calls).toHaveLength(1)
        expect(reader.addDash.mock.calls).toHaveLength(1)
    })

    it("when key pressed longer then max dash time: remove Dash, the complete last character is removed", () => {
        key.pressKey()
        jest.advanceTimersByTime(key.getMaxDotDuration() + 100);
        
        expect(reader.removeDot.mock.calls).toHaveLength(1)
        expect(reader.addDash.mock.calls).toHaveLength(1)

        jest.advanceTimersByTime(key.getMaxDashDuration() - key.getMaxDotDuration());
        
        expect(reader.removeDash.mock.calls).toHaveLength(1)
        expect(reader.removeLastCharacter.mock.calls).toHaveLength(1)
    })

    it("when key pressed longer then max delete time: switch alpahbet", () => {
        key.pressKey()
        jest.advanceTimersByTime(key.getMaxDotDuration() + 100);
        
        expect(reader.removeDot.mock.calls).toHaveLength(1)
        expect(reader.addDash.mock.calls).toHaveLength(1)

        jest.advanceTimersByTime(key.getMaxDashDuration() - key.getMaxDotDuration());
        
        expect(reader.removeDash.mock.calls).toHaveLength(1)
        expect(reader.removeLastCharacter.mock.calls).toHaveLength(1)

        jest.advanceTimersByTime(key.getMaxDeleteDuration() - key.getMaxDashDuration());

        expect(reader.switchAlphabet.mock.calls).toHaveLength(1)
    })

})
