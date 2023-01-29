# Morse Trainer Website

Simple webpage for [android morsetrainer](https://github.com/maxistar/morsetrainer)

The urls is [morse.maxistar.me](https://morse.maxistar.me/)

## How to compile locally

npm install

## How to test

npm test

## Online Key State Diagram


### Key State Diagram:

```mermaid

stateDiagram
    Idle --> Dot: (p1), clicked, reader.addDot()
    
    Dot --> Dash: (p2) t >= MaxDotDuration, reader.removeDot(), reader.addDash()

    Dash --> Delete: (p3) after DeleteTimeout, morseReader.removeDash(), reader.removeLastCharacter()
    
    Delete --> SwitchAlphabet: (p4) after AlpahabetTimeout, reader.morseReaderSwitchAlpahabet()
    
    SwitchAlphabet --> Idle: (p5) after IddleTimeout, reader.restoreRemovedCharacter() ,reader.cancelAlphabetSwitch()
    
    Dot --> PauseLetter: (p6) release, t < MaxDotDuration
    
    Dash --> PauseLetter: (p7) release, t < DeleteTimeout

    Delete --> PauseSpace: (p8) release, t < AlpahabetTimeout

    SwitchAlphabet --> PauseSpace: (p9) release,t < IddleTimeout

    PauseLetter --> Dot: (p10) click, t < SpaceTimeout, reader.addDot()

    PauseLetter --> PauseSpace: (p11) t >= SpaceTimeout, reader.addSpace()
    
    PauseSpace --> Idle: (p12) t >= IddleTimeout
    
    PauseSpace --> Dot: (p13) click, t < IddleTimeout, reader.addDot()

```

### Entity relations Diagram:

```mermaid
erDiagram
    MorsePage ||--o{ MorseReader : creates
    MorsePage ||--|{ MorseKey : creates
    MorsePage }|..|{ BeepTiming : creates
    MorsePage }|..|{ PauseTiming : creates
    MorseKey ||--o{ MorseReader: calls
```

## Issues

[Issues](https://github.com/maxistar/morsetrainer/issues)

