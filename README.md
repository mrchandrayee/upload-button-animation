# Upload Button Animation Lab

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://mrchandrayee.github.io/upload-button-animation/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org) [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

A standalone responsive frontend recreation of the 9.13-second screen recording.

## Run
1. Extract `upload-button-animation.zip`.
2. Open `index.html` in a modern browser.
3. Choose any local file, then click one of the four upload buttons.
4. No npm install, bundler, backend, server or API key is required.

## Recreated design
- Black canvas with the “Upload Button Animation” heading.
- Pale blue demo panel.
- Purple split Upload button with a separate arrow cell.
- Dark square upload button.
- White square upload button with purple arrow.
- Wide dark split Upload button.
- Three code-reference panels for `index.html`, `app.css` and `app.js`.
- Credit line: `_code_and_chill_`.

## Animation and behavior
- Real local file selection through the browser File API.
- Each button independently reads the selected file in chunks using `Blob.slice()` and `arrayBuffer()`.
- Liquid rises as progress advances.
- Button label transitions from Upload to Uploading to Uploaded.
- Success checkmark replaces the arrow when complete.
- Progress text reports bytes read.
- Reset demos returns the buttons to their initial state.
- If no file is selected, a small generated sample file is used for the animation demo; it is not sent anywhere.

## Visible code transcription
The source panels in the recording are tiny but partly readable. The project includes a best-effort transcription of the visible HTML/CSS/JS ideas:
- `keel__well`, `keel__liquid`, `keel__head`, `keel__leg--l`, `keel__leg--r`, and `keel__float`.
- Liquid dome sizing and border radius, with progress-driven `translateY` and `scaleY`.
- `setP(v)` writes a numeric `--p` custom property.
- `readBlob(blob)` reads the Blob in chunks and computes progress from loaded bytes.

These panels are reference excerpts, not a claim that every character of the original source was recoverable. The functional app code is the runnable implementation in this project.

## Privacy / limitations
Files are read locally in your browser for the visual demo and are not uploaded to a server. This is a frontend animation demonstration, not a connected cloud upload service.

## 👨‍💻 Author

**mrchandrayee** · [GitHub](https://github.com/mrchandrayee)

## 📄 License

[MIT License](./LICENSE)
