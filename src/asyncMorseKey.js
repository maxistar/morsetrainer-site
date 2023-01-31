export const MODE_IDLE = 0;
export const MODE_DOT = 1;
export const MODE_DASH = 2;
export const MODE_DELETE = 3;
export const MODE_CHANGE_ALPHABET = 4;
export const MODE_PAUSE_LETTER = 5;
export const MODE_PAUSE_SPACE = 6;


/**
 * clicked
 * MODE_DOT --> MODE_DASH --> MODE_DELETE --> MODE_CHANGE_APLHABET --> MODE_IDLE
 * PAUSE_LETTER --> PAUSE_SPACE
 */
export class AsyncMorseKey {

    #debounceTimeout = 10;

    #maxDotDuration = 500;

    #maxDashDuration = 1500;

    #maxDeleteDuration = 2500;

    #maxSwitchAlphabetLength = 3500;

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

    getMode() {
        return this.#currentMode;
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
        return this.#maxSwitchAlphabetLength;
    }

    getCharacterSpacingLength() {
        return this.#characterSpacing;
    }

    getPauseTime() {
        return this.#pauseTime;
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
        this.#scheduleDashTimeout();
        this.#currentMode = MODE_DOT
    }

    releaseKey() {
        if (this.#clickedTime === -1) {
            return;
        }

        this.#clearClickTimeout();
        this.#schedulePauseMode();
        const newTime = this.#releasedTime = (new Date()).getTime();
        const $difference = newTime - this.#clickedTime;
        this.#clickedTime = -1;
        if (this.#currentMode === MODE_DELETE) {
            this.#currentMode = MODE_IDLE;
        } else if (this.#currentMode === MODE_CHANGE_ALPHABET) {
            this.#currentMode = MODE_PAUSE_SPACE;
        } else if (this.#currentMode === MODE_IDLE) {
            //noting todo
        } else {
            this.#currentMode = MODE_PAUSE_LETTER;
        }
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

    #scheduleDashTimeout() {
        this.#currentPressTimeout = setTimeout(
            () => {
                this.#currentPressTimeout = null;
                this.#switchToDash();
            },
            this.#maxDotDuration
        );
    }

    #scheduleDeleteTimeout() {
        this.#currentPressTimeout = setTimeout(
            () => {
                this.#currentPressTimeout = null;
                this.#switchToDelete();
            },
            this.#maxDashDuration - this.#maxDotDuration
        );
    }

    #scheduleSwitchAlphabetTimeout() {
        this.#currentPressTimeout = setTimeout(
            () => {
                this.#currentPressTimeout = null;
                this.#switchAlphabet();
            },
            this.#maxDeleteDuration - this.#maxDashDuration
        );
    }

    #scheduleSwitchIdleTimeout() {
        this.#currentPressTimeout = setTimeout(
            () => {
                this.#currentPressTimeout = null;
                this.#switchToIdleMode();
            },
            this.#maxSwitchAlphabetLength - this.#maxDeleteDuration
        );
    }

    #schedulePauseMode() {
        this.#currentPressTimeout = setTimeout(
            () => {
                this.#currentPressTimeout = null;
                this.#switchSpacePause();
            },
            this.#characterSpacing
        );
    }

    #scheduleIdleMode() {
        this.#currentPressTimeout = setTimeout(
            () => {
                this.#currentPressTimeout = null;
                this.#switchToIdleMode();
            },
            this.#pauseTime - this.#characterSpacing
        );
    }

    #switchSpacePause() {
        this.#scheduleIdleMode();
        this.#currentMode = MODE_PAUSE_SPACE;
    }

    #switchToIdleMode() {
        this.#currentMode = MODE_IDLE;
    }

    #switchToDash() {
        // console.log('swith to dash!!!');
        this.#currentMode = MODE_DASH;
        this.#reader.removeDot();
        this.#reader.addDash();
        this.#scheduleDeleteTimeout();
    }

    #switchToDelete() {
        this.#currentMode = MODE_DELETE;
        this.#reader.removeDash();
        this.#reader.removeLastCharacter();
        this.#scheduleSwitchAlphabetTimeout();
    }

    #switchAlphabet() {
        this.#currentMode = MODE_CHANGE_ALPHABET;
        this.#reader.switchAlphabet();
        this.#scheduleSwitchIdleTimeout()
    }

}

export default { AsyncMorseKey };
