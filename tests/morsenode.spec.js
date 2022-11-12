import MorseNode from "../src/morsenode";
import { jest } from '@jest/globals';

describe("morse node", () => {

    it("should remember character", () => {
        const node = new MorseNode("1");

        expect(node.getChar()).toEqual('1');
    })

})

