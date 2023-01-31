import { jest } from '@jest/globals';
import {
    AsyncMorseKey,
    MODE_DOT,
    MODE_DASH,
    MODE_DELETE,
    MODE_CHANGE_ALPHABET,
    MODE_PAUSE_LETTER,
    MODE_PAUSE_SPACE, MODE_IDLE
} from "../src/asyncMorseKey";
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

    it("p1: when key pressed: dot is added", () => {
        key.pressKey()
        expect(reader.addDot.mock.calls).toHaveLength(1)
        expect(key.getMode()).toEqual(MODE_DOT)
    })

    it("p1, p6, p10: when key pressed the released and added again: two dots are added", () => {
        key.pressKey();
        expect(reader.addDot.mock.calls).toHaveLength(1);
        key.releaseKey();
        key.pressKey();
        expect(reader.addDot.mock.calls).toHaveLength(2);

        expect(key.getMode()).toEqual(MODE_DOT)

    })


    it("p1, p6: when key pressed then released pass to waiting state", () => {
        key.pressKey();
        expect(reader.addDot.mock.calls).toHaveLength(1);
        key.releaseKey();

        jest.advanceTimersByTime(key.getCharacterSpacingLength() - 100);
        //expect(reader.addDot.mock.calls).toHaveLength(2);

        expect(key.getMode()).toEqual(MODE_PAUSE_LETTER)

    })


    it("p1, p6, p11: when key pressed then released after long time changes to waiting state", () => {
        key.pressKey();
        expect(reader.addDot.mock.calls).toHaveLength(1);
        key.releaseKey();

        jest.advanceTimersByTime(key.getCharacterSpacingLength() + 100);

        expect(key.getMode()).toEqual(MODE_PAUSE_SPACE)

    })

    it("p1, p6, p11, p12: when key pressed then released after longer time changes to idle state", () => {
        key.pressKey();
        expect(reader.addDot.mock.calls).toHaveLength(1);
        key.releaseKey();

        jest.advanceTimersByTime(key.getPauseLength() + 100);
        //expect(reader.addDot.mock.calls).toHaveLength(2);

        expect(key.getMode()).toEqual(MODE_IDLE)

    })

    it("p1, p2: when key pressed long time: dot is removed, dash is added", () => {
        key.pressKey()
        jest.advanceTimersByTime(key.getMaxDotDuration() + 100);

        expect(reader.removeDot.mock.calls).toHaveLength(1)
        expect(reader.addDash.mock.calls).toHaveLength(1)

        expect(key.getMode()).toEqual(MODE_DASH)
    })

    it("p1, p2, p3: when key pressed longer then max dash time: remove Dash, the complete last character is removed", () => {
        key.pressKey()
        jest.advanceTimersByTime(key.getMaxDotDuration() + 100);

        expect(reader.removeDot.mock.calls).toHaveLength(1)
        expect(reader.addDash.mock.calls).toHaveLength(1)

        jest.advanceTimersByTime(key.getMaxDashDuration() - key.getMaxDotDuration());

        expect(reader.removeDash.mock.calls).toHaveLength(1)
        expect(reader.removeLastCharacter.mock.calls).toHaveLength(1)

        expect(key.getMode()).toEqual(MODE_DELETE)
    })

    it("p1, p2, p7, p10: when key pressed longer then max dash time: remove Dash, the complete last character is removed", () => {
        key.pressKey()
        jest.advanceTimersByTime(key.getMaxDotDuration() + 100);

        expect(reader.removeDot.mock.calls).toHaveLength(1)
        expect(reader.addDash.mock.calls).toHaveLength(1)

        key.releaseKey()

        expect(key.getMode()).toEqual(MODE_PAUSE_LETTER)

        key.pressKey()

        expect(key.getMode()).toEqual(MODE_DOT)
    })

    it("p1, p2, p3, p4, p9: when key pressed longer then max delete time: switch alpahbet", () => {
        key.pressKey()
        jest.advanceTimersByTime(key.getMaxDotDuration() + 100);

        expect(reader.removeDot.mock.calls).toHaveLength(1)
        expect(reader.addDash.mock.calls).toHaveLength(1)

        jest.advanceTimersByTime(key.getMaxDashDuration() - key.getMaxDotDuration());

        expect(reader.removeDash.mock.calls).toHaveLength(1)
        expect(reader.removeLastCharacter.mock.calls).toHaveLength(1)

        jest.advanceTimersByTime(key.getMaxDeleteDuration() - key.getMaxDashDuration());

        expect(reader.switchAlphabet.mock.calls).toHaveLength(1)
        expect(key.getMode()).toEqual(MODE_CHANGE_ALPHABET)

        key.releaseKey()
        expect(key.getMode()).toEqual(MODE_PAUSE_SPACE)
    })

    it("p1, p2, p3, p4, p5, p14: when key pressed longer then max delete time: switch alpahbet", () => {
        key.pressKey()
        jest.advanceTimersByTime(key.getMaxDotDuration() + 100);

        expect(reader.removeDot.mock.calls).toHaveLength(1)
        expect(reader.addDash.mock.calls).toHaveLength(1)

        jest.advanceTimersByTime(key.getMaxDashDuration() - key.getMaxDotDuration());

        expect(reader.removeDash.mock.calls).toHaveLength(1)
        expect(reader.removeLastCharacter.mock.calls).toHaveLength(1)

        jest.advanceTimersByTime(key.getMaxDeleteDuration() - key.getMaxDashDuration());

        expect(reader.switchAlphabet.mock.calls).toHaveLength(1)
        expect(key.getMode()).toEqual(MODE_CHANGE_ALPHABET)

        jest.advanceTimersByTime(key.getSwitchAlphabetLength() - key.getMaxDeleteDuration());

        expect(key.getMode()).toEqual(MODE_IDLE)

        key.releaseKey()

        expect(key.getMode()).toEqual(MODE_IDLE)
    })

    it("p1, p2, p3, p8: when key pressed longer then max dash time then released, call delete last character and switch to idle", () => {
        key.pressKey()
        jest.advanceTimersByTime(key.getMaxDotDuration() + 100);

        expect(reader.removeDot.mock.calls).toHaveLength(1)
        expect(reader.addDash.mock.calls).toHaveLength(1)

        jest.advanceTimersByTime(key.getMaxDashDuration() - key.getMaxDotDuration());

        expect(reader.removeDash.mock.calls).toHaveLength(1)
        expect(reader.removeLastCharacter.mock.calls).toHaveLength(1)
        expect(key.getMode()).toEqual(MODE_DELETE)

        key.releaseKey()

        expect(key.getMode()).toEqual(MODE_IDLE)
    })

})
