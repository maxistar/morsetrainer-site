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


export default MorseNode;
