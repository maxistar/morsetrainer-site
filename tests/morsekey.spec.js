import MorseKey from "../src/morsekey";
import MorseReader from "../src/morsereader";
import { jest } from '@jest/globals';

describe("morse key", () => {

    let reader, key;

    beforeEach(() => {
        jest.useFakeTimers();
        reader = new MorseReader();
        key = new MorseKey(reader);
    });

    afterEach(() => {
        jest.useRealTimers();
    })

    it("should at least to be initiated", () => {
        expect(reader.getBuffer()).toEqual('');
    })


    it("should get dot length", () => {
        expect(key.getDotLength()).toEqual(500);
    })


    it("should get dash length", () => {
        expect(key.getDashLength()).toEqual(1500);
    })


    it("should get delete length", () => {
        expect(key.getDeleteLength()).toEqual(2500);
    })


    it("should get switch alphabet length", () => {
        expect(key.getSwitchAlphabetLength()).toEqual(3500);
    })


    it("should get character pauselength", () => {
        expect(key.getCharacterSpacingLength()).toEqual(1000);
    })


    it("should get pause length", () => {
        expect(key.getPauseLength()).toEqual(1500);
    })


    it("should be able to recognise short clicks", () => {
        key.pressKey();
        jest.advanceTimersByTime(400);
        key.releaseKey();
        expect(reader.getBuffer()).toEqual('e');
    })


    it("should be able to recognise two short clicks", () => {
        key.pressKey();
        jest.advanceTimersByTime(400);
        key.releaseKey();

        key.pressKey();
        jest.advanceTimersByTime(400);
        key.releaseKey();

        expect(reader.getBuffer()).toEqual('i');
    })

    it("should be able to recognise long clicks", () => {
        key.pressKey();
        jest.advanceTimersByTime(800);
        key.releaseKey();
        expect(reader.getBuffer()).toEqual('t');
    })

    it("should be able to recognise two long clicks", () => {
        key.pressKey();
        jest.advanceTimersByTime(800);
        key.releaseKey();


        key.pressKey();
        jest.advanceTimersByTime(800);
        key.releaseKey();

        expect(reader.getBuffer()).toEqual('m');
    })

    it("should be able to recognise pauses between clicks", () => {
        key.pressKey();
        jest.advanceTimersByTime(800);
        key.releaseKey();


        jest.advanceTimersByTime(1100);

        key.pressKey();
        jest.advanceTimersByTime(800);
        key.releaseKey();

        expect(reader.getBuffer()).toEqual('tt');
    })

    it("should be able to recognise pauses between words", () => {
        key.pressKey();
        jest.advanceTimersByTime(800);
        key.releaseKey();


        jest.advanceTimersByTime(1800);

        key.pressKey();
        jest.advanceTimersByTime(800);
        key.releaseKey();

        expect(reader.getBuffer()).toEqual('t t');
    })

    it("should be able to recognise delete clicks", () => {
        key.pressKey();
        jest.advanceTimersByTime(800);
        key.releaseKey();


        jest.advanceTimersByTime(1200);

        key.pressKey();
        jest.advanceTimersByTime(1800);
        key.releaseKey();

        expect(reader.getBuffer()).toEqual('');
    })

   it("should be able to recognise switch alphabet clicks", () => {
        key.pressKey();
        jest.advanceTimersByTime(800);
        key.releaseKey();


        jest.advanceTimersByTime(1200);

        key.pressKey();
        jest.advanceTimersByTime(2800);
        key.releaseKey();

        jest.advanceTimersByTime(1200);


        key.pressKey();
        jest.advanceTimersByTime(800);
        key.releaseKey();

        expect(reader.getBuffer()).toEqual('tт');
    })


})
