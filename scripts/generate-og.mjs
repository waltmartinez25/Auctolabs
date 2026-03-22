import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const logoB64 = readFileSync(join(root, 'src/assets/AuctoLabs_Logo_transparent.png')).toString('base64');
const logoSrc = `data:image/png;base64,${logoB64}`;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    background: #042A2B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    position: relative;
  }

  /* Subtle radial glow */
  .glow {
    position: absolute;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(94,177,191,0.12) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  /* Top-left accent line */
  .accent-line-tl {
    position: absolute;
    top: 60px;
    left: 60px;
    width: 120px;
    height: 2px;
    background: linear-gradient(90deg, #5EB1BF, transparent);
    border-radius: 2px;
  }

  /* Bottom-right accent line */
  .accent-line-br {
    position: absolute;
    bottom: 60px;
    right: 60px;
    width: 120px;
    height: 2px;
    background: linear-gradient(270deg, #5EB1BF, transparent);
    border-radius: 2px;
  }

  /* Corner dots */
  .dot {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #5EB1BF;
    opacity: 0.5;
  }
  .dot-tl { top: 56px; left: 56px; }
  .dot-br { bottom: 56px; right: 56px; }

  /* Border frame */
  .frame {
    position: absolute;
    inset: 40px;
    border: 1px solid rgba(94,177,191,0.12);
    border-radius: 24px;
    pointer-events: none;
  }

  /* Main content */
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
    z-index: 10;
    padding: 0 80px;
  }

  .logo {
    height: 90px;
    width: auto;
    margin-bottom: 28px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }

  .tagline-label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #5EB1BF;
    margin-bottom: 16px;
  }

  .headline {
    font-family: 'DM Serif Display', serif;
    font-size: 62px;
    font-weight: 400;
    line-height: 1.05;
    color: #ffffff;
    margin-bottom: 20px;
  }

  .headline em {
    font-style: italic;
    color: #5EB1BF;
  }

  .sub {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.01em;
  }

  /* Bottom pill */
  .pill {
    position: absolute;
    bottom: 56px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(94,177,191,0.08);
    border: 1px solid rgba(94,177,191,0.2);
    border-radius: 100px;
    padding: 8px 20px;
    z-index: 10;
  }
  .pill-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #5EB1BF;
  }
  .pill-text {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="frame"></div>
  <div class="accent-line-tl"></div>
  <div class="accent-line-br"></div>
  <div class="dot dot-tl"></div>
  <div class="dot dot-br"></div>

  <div class="content">
    <img class="logo" src="${logoSrc}" alt="AuctoLabs" />
    <p class="tagline-label">Automated Client-Generating Systems</p>
    <h1 class="headline">Websites Built<br /><em>To Grow</em></h1>
    <p class="sub">Web Design · AI Automation · Lead Generation</p>
  </div>

  <div class="pill">
    <div class="pill-dot"></div>
    <span class="pill-text">auctolabs.com</span>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle0' });

// wait for fonts to load
await new Promise(r => setTimeout(r, 1500));

mkdirSync(join(root, 'public'), { recursive: true });
const outPath = join(root, 'public', 'og-image.jpg');
await page.screenshot({ path: outPath, type: 'jpeg', quality: 92 });

await browser.close();
console.log('OG image saved to', outPath);
