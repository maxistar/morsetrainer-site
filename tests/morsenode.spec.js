import MorseNode from "../src/morsenode";

describe("morse node", () => {

    it("should remember character", () => {
        const node = new MorseNode("1");

        expect(node.getChar()).toEqual('1');
    })

})

