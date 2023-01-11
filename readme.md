# Morse Trainer Website

Simple webpage for [android morsetrainer](https://github.com/maxistar/morsetrainer)

The urls is [morse.maxistar.me](https://morse.maxistar.me/)


## Online Key State Diagram


### Key State Diagram:

```mermaid

stateDiagram
    Idle --> Dot: clicked, reader.addDot()
    
    Dot --> Dash: t >= MaxDotDuration, reader.removeDot(), reader.addDash()

    Dash --> Delete: after DeleteTimeout, morseReader.removeDash(), reader.removeLastCharacter()
    
    Delete --> SwitchAlphabet: after AlpahabetTimeout, reader.morseReaderSwitchAlpahabet()
    
    SwitchAlphabet --> Idle: after IddleTimeout, reader.restoreRemovedCharacter() ,reader.cancelAlphabetSwitch()
    
    Dot --> PauseLetter: release, t < MaxDotDuration
    
    Dash --> PauseLetter: release, t < DeleteTimeout

    Delete --> PauseSpace: release, t < AlpahabetTimeout

    SwitchAlphabet --> PauseSpace: release,t < IddleTimeout

    PauseLetter --> Dot: click, t < SpaceTimeout, reader.addDot()

    PauseLetter --> PauseSpace: t >= SpaceTimeout, reader.addSpace()
    
    PauseSpace --> Idle: t >= IddleTimeout
    
    PauseSpace --> Dot: click, t < IddleTimeout, reader.addDot()

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

