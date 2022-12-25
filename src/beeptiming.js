import TimingBar from "./timingbar";

class BeepTiming {
    
    #timingBar;

    constructor (elementSelector, dotLength, dashLength, deleteLength, maxLength) {

        this.#timingBar = new TimingBar(`${elementSelector} .timer-bar--time`, maxLength);
        const dotTimingElement = document.querySelector(`${elementSelector} .timer-bar--dot`);
        const dashTimingElement = document.querySelector(`${elementSelector} .timer-bar--dash`);
        const deleteTimingElement = document.querySelector(`${elementSelector} .timer-bar--delete`);
                 
        const dotPercent = Math.round(100 * (dotLength / maxLength));
        dotTimingElement.style.width = `${dotPercent}%`;
        const dashPercent = Math.round(100 * (dashLength / maxLength));
        dashTimingElement.style.width = `${dashPercent}%`;
        const deletePercent = Math.round(100 * (deleteLength / maxLength));
        deleteTimingElement.style.width = `${deletePercent}%`;
    }

    startTimer() {
        this.#timingBar.startTimer();
    }

    stopTimer() {
        this.#timingBar.stopTimer();
    }
}

export default BeepTiming;