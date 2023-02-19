
import TimingBar from "../src/timingbar";
import { jest } from '@jest/globals';

describe("morse timer", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        document.body.innerHTML =
    '<div id="beeptimer">' +
    '  <div class="timer-bar--time">' +
    '  </div>' +
    '</div>';
    });

    afterEach(() => {
        jest.useRealTimers();
    })

    it("should be initialised", () => {
        const node = new TimingBar("#beeptimer .timer-bar--time", 3500);
        expect(document.querySelector('.timer-bar--time').style.width).toEqual('0%');
    })


    it("should change bar with time", () => {
        const node = new TimingBar("#beeptimer .timer-bar--time", 3500);
        node.startTimer();
        jest.advanceTimersByTime(1750);
        jest.runOnlyPendingTimers();
        expect(document.querySelector('.timer-bar--time').style.width).toEqual('51%');
    })


    it("should have 100% when time is up", () => {
        const node = new TimingBar("#beeptimer .timer-bar--time", 3500);

        node.startTimer();
        jest.advanceTimersByTime(3500);
        jest.runOnlyPendingTimers();
        expect(document.querySelector('.timer-bar--time').style.width).toEqual('100%');
    })
})

