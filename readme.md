# Morse Trainer Website

Simple webpage for [android morsetrainer](https://github.com/maxistar/morsetrainer)

The urls is [morse.maxistar.me](https://morse.maxistar.me/)


## Online Key State Diagram


```mermaid

stateDiagram
    Idle --> Dot: if clicked

    Dot --> Dash: after DashTimeout

    Dash --> Delete: after DeleteTimeout
    
    Delete --> SwitchAlphabet: after AlpahabetTimeout
    
    SwitchAlphabet --> Idle: after IddleTimeout
    
    Dot --> PauseLetter: release after t < DashTimeout
    
    Dash --> PauseLetter: release after t < DeleteTimeout

    Delete --> PauseSpace: release after t < AlpahabetTimeout

    SwitchAlphabet --> PauseSpace: release after t < IddleTimeout

    PauseLetter --> PauseSpace: after SpaceTimeout
    
    PauseSpace --> Idle: after IddleTimeout

```


## Issues

[Issues](https://github.com/maxistar/morsetrainer/issues)

