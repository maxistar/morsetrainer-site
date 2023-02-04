import MorseReader from "../src/morsereader";

const applyCommands = (reader, morseCode) => {

    const codes = morseCode.split('');
    for (let ch of codes) {
        if (ch === '.') {
            reader.addDot();
        } else if (ch === '-') {
            reader.addDash();
        } else if (ch === '_') {
            reader.addSpace();
        } else if (ch === 'D') {
            reader.deleteLastCharacter();
        } else if (ch === 'S') {
            reader.toggleAlphabet();
        } else if (ch === 'B') {
            reader.stepBackward();
        } else {
            reader.addPause();
        }
    }
}

describe("morse reader", () => {

    describe("initial state", () => {
        it("should have empty text at the beginning", () => {
            const reader = new MorseReader();
            expect(reader.getBuffer()).toEqual('');
        })
    });


    describe("when type a code I am getting a correct letter in the buffer", () => {

        const testCases = [
            ['a', '.-'],
            ['b', '-...'],
            ['c', '-.-.'],
            ['d', '-..'],
            ['e', '.'],
            ['f', '..-.'],
            ['g', '--.'],
            ['h', '....'],
            ['j', '.---'],
            ['i', '..'],
            ['k', '-.-'],
            ['l', '.-..'],
            ['m', '--'],
            ['n', '-.'],
            ['o', '---'],
            ['p', '.--.'],
            ['q', '--.-'],
            ['r', '.-.'],
            ['s', '...'],
            ['t', '-'],
            ['u', '..-'],
            ['v', '...-'],
            ['w', '.--'],
            ['x', '-..-'],
            ['y', '-.--'],
            ['z', '--..'],


            ['1', ".----"],
            ['2', "..---"],
            ['3', "...--"],
            ['4', "....-"],
            ['5', "....."],
            ['6', "-...."],
            ['7', "--..."],
            ['8', "---.."],
            ['9', "----."],
            ['0', "-----"],


            ['.',".-.-.-"],
            [':',"---..."],
            [',',"--..--"],
            [';',"-.-.-."],
            ['?',"..--.."],
            ['=',"-...-"],
            ['\\', ".----."],
            ['+',".-.-."],
            ['!',"-.-.--"],
            ['-',"-....-"],
            ['/',"-..-."],
            ['_',"..--.-"],
            ['(',"-.--."],
            ['"',".-..-."],
            [')',"-.--.-"],
            ['$',"...-..-"],
            ['&',".-..."],
            ['@',".--.-."],
        ];

        testCases.forEach((test) => {

            it(`${test[1]} should return ${test[0]}`, () => {

                const reader = new MorseReader();
                const morseCode = test[1];
                applyCommands(reader, morseCode);
                expect(reader.getBuffer()).toEqual(test[0]);

            });
        })

    })

    describe("when type a phrase I get the correct text", () => {

        const testCases = [
            ['hi!',".... .. -.-.--"],
            ['hi max!',".... .. _-- .- -..- -.-.--"],
        ];

        testCases.forEach((test) => {

            it(`${test[1]} should return ${test[0]}`, () => {

                const reader = new MorseReader();
                const morseCode = test[1];
                applyCommands(reader, morseCode);
                expect(reader.getBuffer()).toEqual(test[0]);

            });
        })

    })


    describe("when cyrilic letters it works as expected", () => {

        const testCases = [
            ['а',".-"],
            ['б', "-..."],
            ['в', ".--"],
            ['г', "--."],
            ['д', "-.."],
            ['е', "."],
//          ['ё', "."],
            ['ж', "...-"],
            ['з', "--.."],
            ['и', ".."],
            ['й', ".---"],
            ['к', "-.-"],
            ['л', ".-.."],
            ['м', "--"],
            ['н', "-."],
            ['о', "---"],
            ['п', ".--."],
            ['р', ".-."],
            ['с', "..."],
            ['т', "-"],
            ['у', "..-"],
            ['ф', "..-."],
            ['х', "...."],
            ['ц', "-.-."],
            ['ч', "---."],
            ['ш', "----"],
            ['щ', "--.-"],
            ['ъ', "--.--"],
            ['ы', "-.--"],
            ['ь', "-..-"],
            ['э', "..-.."],
            ['ю', "..--"],
            ['я', ".-.-"],
        ];

        testCases.forEach((test) => {

            it(`${test[1]} should return ${test[0]}`, () => {

                const reader = new MorseReader();
                reader.switchToCyrillic();
                const morseCode = test[1];
                applyCommands(reader, morseCode);
                expect(reader.getBuffer()).toEqual(test[0]);

            });
        })

    })


    describe("switch to cyrillic works as expected", () => {

        const testCases = [
            ['hi макс', ".... ..S_-- .- -.- ..."],
            ['макс hi', "S-- .- -.- ...S_.... .."],
        ];

        testCases.forEach((test) => {

            it(`${test[1]} should return ${test[0]}`, () => {

                const reader = new MorseReader();
                const morseCode = test[1];
                applyCommands(reader, morseCode);
                expect(reader.getBuffer()).toEqual(test[0]);

            });
        })
    })

    describe("delete characters", () => {

        const testCases = [
            ['h', ".... ..D"],
            ['h', ".... .. D"],
        ];

        testCases.forEach((test) => {

            it(`${test[1]} should return ${test[0]}`, () => {

                const reader = new MorseReader();
                const morseCode = test[1];
                applyCommands(reader, morseCode);
                expect(reader.getBuffer()).toEqual(test[0]);

            });
        })
    })

    describe("step backward works as expected", () => {
        const testCases = [
            ['t', "-.B"],
            ['t', "--B"],
        ];

        testCases.forEach((test) => {

            it(`${test[1]} should return ${test[0]}`, () => {

                const reader = new MorseReader();
                const morseCode = test[1];
                applyCommands(reader, morseCode);
                expect(reader.getBuffer()).toEqual(test[0]);
            });
        })
    })


})

