(function () {
    'use strict';

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

    class MorseNode {
        dotNode = null;
        dashNode = null;

        constructor(ch, dotNode, dashNode) {
            this.ch = ch;
            if (dotNode) {
                this.dotNode = dotNode;
            }
            if (dashNode) {
                this.dashNode = dashNode;
            }
        }

        getDotNode () {
            return this.dotNode;
        }

        getDashNode () {
            return this.dashNode;
        }

        getChar () {
            return this.ch;
        }

        hasDashNode() {
            return this.dashNode !== null;
        }

        hasDotNode() {
            return this.dotNode !== null;
        }
    }

    const createMorseTree = () => {
        return new MorseNode(
            '',
            new MorseNode(
                'e',
                new MorseNode(
                    'i',
                    new MorseNode(
                        's',
                        new MorseNode(
                            'h',
                            new MorseNode('5'),
                            new MorseNode('4')
                        ),
                        new MorseNode(
                            'v',
                            new MorseNode(
                                '',
                                new MorseNode(
                                    '',
                                    null,
                                    new MorseNode('$')
                                )
                            ),
                            new MorseNode('3')
                        )
                    ),
                    new MorseNode(
                        'u',
                        new MorseNode('f'),
                        new MorseNode(
                            '',
                            new MorseNode(
                               '',
                                new MorseNode('?'),
                                new MorseNode('_')
                            ),
                            new MorseNode('2')
                        )
                    )
                ),
                new MorseNode(
                    'a',
                    new MorseNode(
                        'r',
                        new MorseNode(
                            'l',
                            new MorseNode("&"),
                            new MorseNode("\"")
                        ),
                        new MorseNode(
                            '',
                            new MorseNode(
                                '+',
                                null,
                                new MorseNode('.')

                            ),
                        ),
                    ),
                    new MorseNode(
                        'w',
                        new MorseNode(
                            'p',
                            null,
                            new MorseNode(
                                '',
                                new MorseNode('@')
                            )
                        ),
                        new MorseNode(
                            'j',
                            null,
                            new MorseNode(
                                '1',
                                new MorseNode('\\')
                            )
                        )
                    )
                )
            ),
            new MorseNode(
                't',
                new MorseNode(
                    'n',
                    new MorseNode(
                        'd',
                        new MorseNode(
                            'b',
                            new MorseNode(
                                '6',
                                null,
                                new MorseNode('-')
                            ),
                            new MorseNode('=')
                        ),
                        new MorseNode(
                            'x',
                            new MorseNode('/')
                        )
                    ),
                    new MorseNode(
                        'k',
                        new MorseNode(
                            'c',
                            null,
                            new MorseNode(
                                '',
                                new MorseNode(';'),
                                new MorseNode('!')
                            ),
                        ),
                        new MorseNode(
                            'y',
                            new MorseNode(
                                '(',
                                null,
                                new MorseNode(')')
                            )
                        )
                    )
                ),
                new MorseNode(
                    'm',
                    new MorseNode(
                        'g',
                        new MorseNode(
                            'z',
                            new MorseNode('7'),
                            new MorseNode(
                                '',
                                null,
                                new MorseNode(',')
                            )
                        ),
                        new MorseNode('q')
                    ),
                    new MorseNode(
                        'o',
                        new MorseNode(
                            '',
                            new MorseNode(
                                '8',
                                new MorseNode(
                                  ':'
                                )
                            )
                        ),
                        new MorseNode(
                            '',
                            new MorseNode('9'),
                            new MorseNode('0')
                        )
                    )
                )
            )
        );
    };

    const createCyrillicMorseTree = () => {
        return new MorseNode(
            '',
            new MorseNode(
                'е',
                new MorseNode(
                    'и',
                    new MorseNode(
                        'с',
                        new MorseNode(
                            'х',
                            new MorseNode('5'),
                            new MorseNode('4')
                        ),
                        new MorseNode(
                            'ж',
                            new MorseNode(
                                '',
                                new MorseNode(
                                    '',
                                    null,
                                    new MorseNode('$')
                                )
                            ),
                            new MorseNode('3')
                        )
                    ),
                    new MorseNode(
                        'у',
                        new MorseNode(
                            'ф',
                            new MorseNode('э')
                        ),
                        new MorseNode(
                            'ю',
                            new MorseNode(
                               '',
                                new MorseNode('?'),
                                new MorseNode('_')
                            ),
                            new MorseNode('2')
                        )
                    )
                ),
                new MorseNode(
                    'а',
                    new MorseNode(
                        'р',
                        new MorseNode(
                            'л',
                            new MorseNode("&"),
                            new MorseNode("\"")
                        ),
                        new MorseNode(
                            'я',
                            new MorseNode(
                                '+',
                                null,
                                new MorseNode('.')

                            ),
                        ),
                    ),
                    new MorseNode(
                        'в',
                        new MorseNode(
                            'п',
                            null,
                            new MorseNode(
                                '',
                                new MorseNode('@')
                            )
                        ),
                        new MorseNode(
                            'й',
                            null,
                            new MorseNode(
                                '1',
                                new MorseNode('\\')
                            )
                        )
                    )
                )
            ),
            new MorseNode(
                'т',
                new MorseNode(
                    'н',
                    new MorseNode(
                        'д',
                        new MorseNode(
                            'б',
                            new MorseNode(
                                '6',
                                null,
                                new MorseNode('-')
                            ),
                            new MorseNode('=')
                        ),
                        new MorseNode(
                            'ь',
                            new MorseNode('/')
                        )
                    ),
                    new MorseNode(
                        'к',
                        new MorseNode(
                            'ц',
                            null,
                            new MorseNode(
                                '',
                                new MorseNode(';'),
                                new MorseNode('!')
                            ),
                        ),
                        new MorseNode(
                            'ы',
                            new MorseNode(
                                '(',
                                null,
                                new MorseNode(')')
                            )
                        )
                    )
                ),
                new MorseNode(
                    'м',
                    new MorseNode(
                        'г',
                        new MorseNode(
                            'з',
                            new MorseNode('7'),
                            new MorseNode(
                                '',
                                null,
                                new MorseNode(',')
                            )
                        ),
                        new MorseNode(
                            'щ',
                            null,
                            new MorseNode('ъ')
                        )
                    ),
                    new MorseNode(
                        'о',
                        new MorseNode(
                            'ч',
                            new MorseNode(
                                '8',
                                new MorseNode(
                                  ':'
                                )
                            )
                        ),
                        new MorseNode(
                            'ш',
                            new MorseNode('9'),
                            new MorseNode('0')
                        )
                    )
                )
            )
        );
    };

    class MorseReader {
        #buffer = [];

        #currentNode = null;

        #tree = null;

        #latinTree = null;

        #cyrillicTree = null;

        #onChangeMode = () => {};

        constructor () {
            this.#tree = this.#latinTree = createMorseTree();
            this.#cyrillicTree = createCyrillicMorseTree();
            this.#currentNode = this.#tree;
        }

        #pushCharacter () {
            this.#buffer.push(this.#currentNode.getChar());
        }

        switchToCyrillic() {
            this.#pushCharacter();
            this.#tree = this.#cyrillicTree;
            this.#currentNode = this.#tree;
            this.#onChangeMode('CYR');
        }

        switchToLatin() {
            this.#pushCharacter();
            this.#tree = this.#latinTree;
            this.#currentNode = this.#tree;
            this.#onChangeMode('LAT');
        }

        toggleAlphabet() {
            if (this.#tree === this.#cyrillicTree) {
                this.switchToLatin();
            } else {
                this.switchToCyrillic();
            }
        }

        addDash () {
            if (this.#currentNode.hasDashNode()) {
                this.#currentNode = this.#currentNode.getDashNode();
            } else {
                this.#pushCharacter();
                this.#currentNode = this.#tree;
            }
        }

        addDot () {
            if (this.#currentNode.hasDotNode()) {
                this.#currentNode = this.#currentNode.getDotNode();
            } else {
                this.#pushCharacter();
                this.#currentNode = this.#tree;
            }
        }

        addPause () {
            this.#pushCharacter();
            this.#currentNode = this.#tree;
        }

        addSpace () {
            this.#buffer.push(' ');
        }

        deleteLastCharacter () {
            if (this.#currentNode !== this.#tree) {
                this.#currentNode = this.#tree;
                return;
            }
            if (this.#buffer.length > 0) {
                this.#buffer.pop();
            }
        }

        getBuffer () {
            const buffer = this.#buffer.join('');
            const currentChar = this.#currentNode.getChar();
            return buffer + currentChar;
        }

        setOnChangeModeCallback(callback) {
            this.#onChangeMode = callback;
        }
    }

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
                this.#timer = null;
            }
        }

        setupNewTimer() {
            this.#timer = setTimeout(() => {this.drawFrame();}, this.#frameTimeout);
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

    let pressed = false;
    let button;
    let message;
    let beeptimer;
    let pausetimer;
    let typingAlphabetLabel;

    const reader = new MorseReader();
    const key = new MorseKey(reader);
    reader.setOnChangeModeCallback(changeMode);

    function startBeep(e) {
      e.preventDefault();
      if (pressed) {
          return;
      }
      pressed = true;
      button.classList.add("key-button--clicked");
      key.pressKey();
      beeptimer.startTimer();
      pausetimer.stopTimer();
    }

    function stopBeep(e) {
      e.preventDefault();
      if (!pressed){
          return;
      }
      pressed = false;
      button.classList.remove("key-button--clicked");
      key.releaseKey();
      message.innerText = reader.getBuffer();
      pausetimer.startTimer();
      beeptimer.stopTimer();
    }

    function changeMode(newMode) {
      typingAlphabetLabel.innerText = newMode;
    }

    const onDocumentLoad = () => {
        button = document.getElementById("button");
        message = document.getElementById("message");
        typingAlphabetLabel = document.querySelector("#button .js-key-button--aplphabet");
        beeptimer = new BeepTiming(
          '#beeptimer',
          key.getDotLength(),
          key.getDashLength(),
          key.getDeleteLength(),
          key.getSwitchAlphabetLength()
        );
        pausetimer = new PauseTiming(
          '#pausetimer',
          key.getCharacterSpacingLength(),
          key.getPauseLength()
        );
        button.addEventListener("mousedown", startBeep);
        button.addEventListener("mouseup", stopBeep);
        button.addEventListener("touchstart", startBeep);
        button.addEventListener("touchend", stopBeep);
        button.addEventListener("click", stopBeep);
    };

    onDocumentLoad();

})();
