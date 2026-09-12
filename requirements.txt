AGRISARTHI WEBSITE - REQUIREMENTS AND RUN INSTRUCTIONS
================================================

Supported desktop systems: Windows, macOS, Linux.
This is a JavaScript website. This file is a setup guide, not a Python
pip requirements file. JavaScript dependencies are in package.json;
package-lock.json records the exact dependency versions.

REQUIRED
--------
- Node.js 22.12 or later in the Node.js 22 release line, or a newer
  compatible Node.js release. Node.js includes npm.
  Official download: https://nodejs.org/
- A modern browser such as Chrome, Edge, Firefox, or Safari.
- WebGL and browser hardware acceleration for the live particle globe.
  A static globe fallback is included if WebGL is unavailable.
- Internet access for installing Node.js and development dependencies.
  The included production build uses local assets and can run offline.

QUICKEST WAY TO RUN THE INCLUDED FINISHED SITE
--------------------------------------------
1. Extract pyko-website.zip.
2. Open a terminal inside the extracted pyko-website folder.
3. Verify Node.js is available:
     node --version
4. Start the included server:
     node preview.mjs
5. Open this address in your browser:
     http://127.0.0.1:4173/

These commands work on Windows, macOS, and Linux. No npm installation
step is needed to run the included dist folder.

On Windows, you can also double-click START-PREVIEW.cmd.
Keep the server terminal open. Press Ctrl+C to stop the server.
Serve the site over HTTP as above; do not open dist/index.html directly.

DEVELOP OR REBUILD THE WEBSITE
-----------------------------
From the pyko-website folder:
  npm ci
  npm run dev

Open the local URL printed by Vite (normally http://localhost:5173/).

After changing source files, rebuild the finished site:
  npm run build
  node preview.mjs

On Windows, if PowerShell blocks npm.ps1, use npm.cmd instead:
  npm.cmd ci
  npm.cmd run build

DEPENDENCIES
------------
npm ci installs the versions recorded in package-lock.json:
- gsap: scroll timelines and transitions
- three: live 3D particle globe
- @fontsource-variable/inter: Inter font package
- @fontsource/instrument-serif: Instrument Serif font package
- vite: development server and production build
- prettier: optional source formatting

No Python, database, API key, or backend service is required.

ANIMATION AND DISPLAY
---------------------
Scroll down to advance and up to reverse the scene sequence.
Choose Play tour to run the approximately 57-second sequence.
Manual scrolling or interacting with the page pauses the tour.

Cinematic scrolling activates at a viewport width of at least 601px
and height of at least 560px, with reduced motion disabled.
Smaller viewports use a stacked mobile layout. If the operating system
or browser requests reduced motion, the site respects that preference.

TROUBLESHOOTING
---------------
- "node is not recognized" / "command not found": install Node.js,
  then close and reopen the terminal.
- Port 4173 already in use: open the existing server if it is this site,
  or choose another port before running the preview:
    PowerShell: $env:PORT = "4174"
                node preview.mjs
    Windows Command Prompt: set PORT=4174
                            node preview.mjs
    macOS/Linux: PORT=4174 node preview.mjs
  Then open http://127.0.0.1:4174/.
- Changes not showing: run npm run build, then refresh the browser.
- Globe is static: check browser WebGL/hardware-acceleration support.
- Cinematic scrolling is absent: check viewport size and the system's
  reduced-motion preference.

The preview server listens only on the computer running it.
For hosting, deploy the contents of dist to a static web host at its
domain root. A subdirectory deployment needs an appropriate Vite base
and asset-path configuration before rebuilding.

Crop profiles, field notes and prepared guidance are local demos.
No trained disease-detection model or live farm monitoring is connected.
Payments, real authentication and email delivery are not connected.
See README.md and REFERENCE-AUDIT.md for details.
