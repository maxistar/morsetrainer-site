import createMorseTree from './createMorseTree';
import createCyrillicMorseTree from './createCyrillicMorseTree';
import {jest} from "@jest/globals";

class MorseReader {

    #buffer = [];

    #currentNode = null;

    #previousNode = null;

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
        this.#buffer.push(this.#currentNode.getChar())
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
        this.#previousNode = this.#currentNode;
        if (this.#currentNode.hasDashNode()) {
            this.#currentNode = this.#currentNode.getDashNode();
        } else {
            this.#pushCharacter();
            this.#currentNode = this.#tree;
        }
    }

    addDot () {
        this.#previousNode = this.#currentNode;
        if (this.#currentNode.hasDotNode()) {
            this.#currentNode = this.#currentNode.getDotNode();
        } else {
            this.#pushCharacter();
            this.#currentNode = this.#tree;
        }
    }

    stepBackward() {
        this.#currentNode = this.#previousNode;
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
            return '';
        }
        if (this.#buffer.length > 0) {
            return this.#buffer.pop();
        }
    }

    addCharacter (character) {
        this.#buffer.push(character);
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

export default MorseReader;
