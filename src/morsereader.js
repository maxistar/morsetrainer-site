import createMorseTree from './createMorseTree';
import createCyrillicMorseTree from './createCyrillicMorseTree';

class MorseReader {
    #buffer = [];

    #currentNode = null;

    #tree = null;

    #latinTree = null;

    #cyrillicTree = null;

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
    }

    switchToLatin() {
        this.#pushCharacter();
        this.#tree = this.#latinTree;
        this.#currentNode = this.#tree;
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
}

export default MorseReader;
