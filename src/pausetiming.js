import TimingBar from "./timingbar";

class PauseTiming {
    
    #timingBar;

    constructor (elementSelector, charLength, maxLength) {

        this.#timingBar = new TimingBar(`${elementSelector} .timer-bar--time`, maxLength);

        const charTimingElement = document.querySelector(`${elementSelector} .timer-bar--char`);
        
        const charPercent = Math.round(100 * (charLength / maxLength));
        
        charTimingElement.style.width = `${charPercent}%`;
    }

    startTimer() {
        this.#timingBar.startTimer();
    }

    stopTimer() {
        this.#timingBar.stopTimer();
    }
}

export default PauseTiming;