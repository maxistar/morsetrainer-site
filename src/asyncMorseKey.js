const MODE_IDLE = 0;
const MODE_DOT = 1;
const MODE_DASH = 2;
const MODE_DELETE = 3;
const MODE_CHANGE_ALPHABET = 4;
const PAUSE_LETTER = 5;
const PAUSE_SPACE = 6;


/**
 * clicked
 * MODE_DOT --> MODE_DASH --> MODE_DELETE --> MODE_CHANGE_APLHABET --> MODE_IDLE
 * PAUSE_LETTER --> PAUSE_SPACE
 */
class AsyncMorseKey {

    #debounceTimeout = 10;

    #maxDotDuration = 500;

    #maxDashDuration = 1500;

    #maxDeleteDuration = 2500;

    #switchAlphabetLength = 3500;

    #characterSpacing = 800;

    #pauseTime = 1500;

    #reader;

    #clickedTime = -1;

    #releasedTime = -1;

    #currentMode = MODE_IDLE;

    #currentPressTimeout = null;

    constructor(reader) {
        this.#reader = reader;
    }

    getMaxDotDuration() {
        return this.#maxDotDuration;
    }

    getMaxDashDuration() {
        return this.#maxDashDuration;
    }

    getMaxDeleteDuration() {
        return this.#maxDeleteDuration;
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

        //if (this.#releasedTime !== -1) {
        //    if (this.#clickedTime - this.#releasedTime > this.#pauseTime) {
        //        this.#reader.addPause();
        //        this.#reader.addSpace();
        //    } else if (this.#clickedTime - this.#releasedTime > this.#characterSpacing) {
        //        this.#reader.addPause();
        //    }
        //}
        this.#reader.addDot();
        this.#sheduleDashTimeout();
    }

    releaseKey() {
        if (this.#clickedTime === -1) {
            return;
        }
 
        this.#clearClickTimeout();
        const newTime = this.#releasedTime = (new Date()).getTime();
        const $difference = newTime - this.#clickedTime;
        this.#clickedTime = -1;


        /*
        if ($difference < this.#maxDotDuration) {
            this.#reader.addDot();
        } else if ($difference < this.#maxDashDuration) {
            this.#reader.addDash();
        } else if ($difference < this.#deleteLength) {
            this.#reader.deleteLastCharacter();
        } else {
            this.#reader.toggleAlphabet();
        } */

    }

    #clearClickTimeout() {
        if (this.#currentPressTimeout !== null) {
            clearTimeout(this.#currentPressTimeout);
            this.#currentPressTimeout = null;
        }
    }

    #sheduleDashTimeout() {
        this.#currentPressTimeout = setTimeout(
            () => {
                this.#currentPressTimeout = null;
                this.#switchToDash();
            }, 
            this.#maxDotDuration
        ); 
    }

    #sheduleDeleteTimeout() {
        this.#currentPressTimeout = setTimeout(
            () => {
                this.#currentPressTimeout = null;
                this.#switchToDelete();
            }, 
            this.#maxDashDuration - this.#maxDotDuration
        );
    }

    #sheduleSwitchAlphabetTimeout() {
        this.#currentPressTimeout = setTimeout(
            () => {
                this.#currentPressTimeout = null;
                this.#switchAlphabet();
            }, 
            this.#maxDeleteDuration - this.#maxDashDuration
        );
    }

    #switchToDash() {
        // console.log('swith to dash!!!');
        this.#reader.removeDot(); 
        this.#reader.addDash();
        this.#sheduleDeleteTimeout();
    }

    #switchToDelete() {
        this.#reader.removeDash();
        this.#reader.removeLastCharacter();
        this.#sheduleSwitchAlphabetTimeout();
    }

    #switchAlphabet() {
        this.#reader.switchAlphabet();
    }

}

export default AsyncMorseKey;
