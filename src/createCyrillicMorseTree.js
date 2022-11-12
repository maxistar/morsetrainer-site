import MorseNode from "./morsenode";

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
}

export default createCyrillicMorseTree;
