# Morse Trainer Website

Static website for the [Morse Audio Trainer Android app](https://github.com/maxistar/morsetrainer) and its browser-based online Morse key.

Production URL: <https://morse.maxistar.me/>

## Site Structure

The deployed static site lives in `docs/`:

```text
docs/
├── index.html              Android app product page
├── faq/index.html          Product FAQ and open-source links
├── morsekey/index.html     Interactive online Morse key
└── assets/
    ├── bundle.js           Generated online-key JavaScript
    ├── styles.css          Generated site styles
    └── screenshots/        Website-owned Android screenshots
```

The homepage HTML is maintained directly in `docs/index.html`. The FAQ is maintained in `docs/faq/index.html`. The online-key HTML is maintained in `docs/morsekey/index.html`.

JavaScript source is in `src/`. Styles are maintained in `styles/` and imported through `src/main.styles.js`.

## Install

```sh
npm install
```

## Build

Build the online-key JavaScript bundle:

```sh
npm run build
```

Build the generated stylesheet:

```sh
npm run build:styles
```

Generated files are written to `docs/assets/`.

## Test

Run the Jest unit tests:

```sh
npm test
```

Run the Cucumber scenarios:

```sh
npm run test:bdd
```

## Serve Locally

Serve the deployed `docs/` directory:

```sh
npm run serve
```

The default address is usually <http://127.0.0.1:8080/>.

Verify both routes:

- `/`
- `/faq/`
- `/morsekey/`

## Android Screenshots

The product screenshots in `docs/assets/screenshots/` are website-owned copies of the English Google Play screenshots from:

```text
../morsetrainer/fastlane/metadata/android/en-US/images/phoneScreenshots/
```

Stable website filenames are used so homepage references do not depend on Fastlane timestamp-based names:

```text
morse-audio-trainer-home.png
morse-audio-trainer-training.png
morse-audio-trainer-progress.png
```

When Android screenshots are refreshed, replace the website copies and verify the homepage at mobile and desktop widths.

## Online Key Behavior

The online key uses press duration and pause duration to decode Morse:

```text
short press      -> dot
long press       -> dash
longer press     -> delete
longest press    -> switch Latin/Cyrillic alphabet
character pause  -> complete character
word pause       -> insert space
```

The key implementation is covered by the Jest tests in `tests/`. Homepage work should not change the input, timing, decoding, deletion, or alphabet-switching behavior.

## Release Checks

Before publishing:

```sh
npm test
npm run build
npm run build:styles
```

Then serve `docs/` and verify:

- Homepage content and screenshots load.
- Google Play, FAQ, online key, privacy, GitHub source, and GitHub Issues links are correct.
- No horizontal scrolling or overlapping content appears on mobile.
- Keyboard focus is visible.
- The online key remains functional.
