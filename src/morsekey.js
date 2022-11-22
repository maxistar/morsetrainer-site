const MODE_IDLE = 0;
const MODE_DOT = 1;
const MODE_DASH = 2;
const MODE_DELETE = 3;
const MODE_CHANGE_ALPHABET = 4;
const PAUSE_LETTER = 5;
const PAUSE_SPACE = 6;

class MorseKey {

    #debounceTimeout = 10;

    #pointLength = 500;

    #dashLength = 1500;

    #deleteLength = 2500;

    #switchAlphabetLength = 3500;

    #characterSpacing = 800;

    #pauseTime = 1500;

    #reader;

    #clickedTime = -1;

    #releasedTime = -1;

    #currentMode = MODE_IDLE;

    constructor(reader) {
        this.#reader = reader;
    }

    getDotLength() {
        return this.#pointLength;
    }

    getDashLength() {
        return this.#dashLength;
    }

    getDeleteLength() {
        return this.#deleteLength;
    }

    getSwitchAlphabetLength() {
        return this.#switchAlphabetLength;
    }

    getCharacterSpacingLength() {
        return this.#characterSpacing;
    }

    getPauseLength() {
        return this.#pauseTime;
    }


    pressKey() {
        if (this.#clickedTime !== -1) {
            return;
        }
        this.#clickedTime = (new Date()).getTime();

        if (this.#releasedTime !== -1) {
            if (this.#clickedTime - this.#releasedTime > this.#pauseTime) {
                this.#reader.addPause();
                this.#reader.addSpace();
            } else if (this.#clickedTime - this.#releasedTime > this.#characterSpacing) {
                this.#reader.addPause();
            }
        }
    }

    releaseKey() {
        if (this.#clickedTime === -1) {
            return;
        }
        const newTime = (new Date()).getTime();
        if (newTime - this.#clickedTime < this.#pointLength) {
            this.#reader.addDot();
        } else if (newTime - this.#clickedTime < this.#dashLength) {
            this.#reader.addDash();
        } else if (newTime - this.#clickedTime < this.#deleteLength) {
            this.#reader.deleteLastCharacter();
        } else {
            this.#reader.toggleAlphabet();
        }
        this.#releasedTime = newTime;
        this.#clickedTime = -1;
    }

}

export default MorseKey;
