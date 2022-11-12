import MorseNode from "./morsenode";

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
}

export default createMorseTree;
