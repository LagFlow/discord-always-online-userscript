# [Discord] Force Always Online

A lightweight Tampermonkey userscript that prevents Discord from automatically changing your status to "Idle" by simulating periodic user activity.

## Features

- **Activity Simulation:** Dispatches a virtual mouse event every 2 minutes to keep your session active.
- **Smart Resets:** The internal timer automatically resets whenever you move your mouse, ensuring it only triggers when you are truly away.
- **Minimal UI:** Adds a small, unobtrusive toggle button to the top-left of the Discord interface.
- **Status Indicator:**
  - 👻 **Active:** Status tampering is ON.
  - 😴 **Inactive:** Status tampering is OFF.

## Installation

1. Install a userscript manager extension like [Tampermonkey](https://www.tampermonkey.net/), [Greasemonkey](https://www.greasespot.net/), or [Violentmonkey](https://violentmonkey.github.io/).
2. Create a new script in your manager's dashboard.
3. Copy the contents of `script.js` into the editor and save.
4. Refresh your Discord tab.

## Usage

Once installed, you will see a small emoji button in the top-left corner of Discord.

- **Click the button** to toggle the "Always Online" mode.
- When enabled, the button will occasionally "pulse" to indicate it has successfully simulated activity.

## How it Works

The script uses `unsafeWindow` to dispatch a `mouseup` MouseEvent to the document at random coordinates within your browser window. This mimics natural interaction enough to prevent Discord's idle detection from triggering.

## Disclaimer

This script is intended for personal convenience. While it simulates basic mouse events, use it responsibly according to Discord's Terms of Service.
