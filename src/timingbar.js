

class TimingBar {
    #maxLength;

    #barElement;

    #frameTimeout = 100;

    #startedTime;

    #timer = null;

    constructor(elementSelector, maxLength) {
        this.setMaxLength(maxLength);
        this.#barElement = document.querySelector(elementSelector);
        this.#barElement.style.width = '0%';
    }

    setMaxLength(value) {
        this.#maxLength = value;
    }

    startTimer() {
        this.#startedTime = (new Date()).getTime();
        this.setupNewTimer();
    }

    stopTimer() {
        if (this.#timer != null) {
            clearTimeout(this.#timer);
            this.#timer = null
        }
    }

    setupNewTimer() {
        this.#timer = setTimeout(() => {this.drawFrame();}, this.#frameTimeout)
    }

    drawFrame() {
        const newTime = (new Date()).getTime();
        const passedTime = newTime - this.#startedTime;
        if (passedTime > this.#maxLength) {
        this.#barElement.style.width = '100%';
        this.#timer = null;
            return;
        }

        const percent = Math.round(100 * (passedTime / this.#maxLength));
        this.#barElement.style.width = `${percent}%`;
        this.setupNewTimer();
    }
}

export default TimingBar;
