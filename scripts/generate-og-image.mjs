import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

async function generateOGImage() {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2, // High DPI for crisp rendering
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background: #090d13;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #f0f6fc;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }

    /* Ambient background glow */
    .glow-1 {
      position: absolute;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(9, 13, 19, 0) 70%);
      top: -150px;
      left: -100px;
      filter: blur(40px);
    }
    .glow-2 {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(9, 13, 19, 0) 70%);
      bottom: -100px;
      right: -50px;
      filter: blur(50px);
    }

    /* Grid pattern */
    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
    }

    .card {
      position: relative;
      z-index: 2;
      width: 1100px;
      height: 530px;
      background: rgba(13, 17, 23, 0.85);
      border: 1px solid rgba(240, 246, 252, 0.12);
      border-radius: 16px;
      padding: 44px 52px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 24px 60px rgba(0,0,0,0.6);
      backdrop-filter: blur(12px);
    }

    /* Top bar */
    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .window-controls {
      display: flex;
      gap: 8px;
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .dot-red { background: #ff5f56; }
    .dot-yellow { background: #ffbd2e; }
    .dot-green { background: #27c93f; }

    .site-url {
      font-family: 'JetBrains Mono', monospace;
      font-size: 15px;
      color: #8b949e;
      letter-spacing: 0.5px;
    }
    .status-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: #3fb950;
      background: rgba(63, 185, 80, 0.12);
      border: 1px solid rgba(63, 185, 80, 0.3);
      padding: 4px 12px;
      border-radius: 100px;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #3fb950;
      box-shadow: 0 0 8px #3fb950;
    }

    /* Center Content */
    .card-center {
      margin: 12px 0;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      color: #38bdf8;
      margin-bottom: 12px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .title {
      font-size: 54px;
      font-weight: 800;
      letter-spacing: -1.5px;
      line-height: 1.1;
      color: #ffffff;
      margin-bottom: 12px;
    }
    .role {
      font-size: 26px;
      font-weight: 600;
      color: #c9d1d9;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .role-badge {
      font-size: 15px;
      font-family: 'JetBrains Mono', monospace;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #38bdf8;
      padding: 2px 10px;
      border-radius: 6px;
      font-weight: 500;
    }
    .tagline {
      font-size: 18px;
      color: #8b949e;
      line-height: 1.5;
      max-width: 880px;
    }

    /* Metrics Grid */
    .metrics-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-top: 24px;
    }
    .metric-card {
      background: rgba(22, 27, 34, 0.7);
      border: 1px solid rgba(240, 246, 252, 0.08);
      border-radius: 10px;
      padding: 12px 16px;
    }
    .metric-val {
      font-family: 'JetBrains Mono', monospace;
      font-size: 24px;
      font-weight: 700;
      color: #58a6ff;
    }
    .metric-lbl {
      font-size: 12px;
      color: #8b949e;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }

    /* Bottom Tags */
    .card-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(240, 246, 252, 0.08);
      padding-top: 20px;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: #c9d1d9;
      background: rgba(110, 118, 129, 0.1);
      border: 1px solid rgba(110, 118, 129, 0.2);
      padding: 4px 10px;
      border-radius: 6px;
    }
    .tag-accent {
      color: #a5d6ff;
      border-color: rgba(56, 189, 248, 0.3);
      background: rgba(56, 189, 248, 0.08);
    }
    .org-affiliation {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: #8b949e;
    }
  </style>
</head>
<body>
  <div class="glow-1"></div>
  <div class="glow-2"></div>
  <div class="grid-overlay"></div>

  <div class="card">
    <div class="card-top">
      <div class="window-controls">
        <div class="dot dot-red"></div>
        <div class="dot dot-yellow"></div>
        <div class="dot dot-green"></div>
      </div>
      <div class="site-url">sureshbhandari.com</div>
      <div class="status-badge">
        <span class="status-dot"></span>
        <span>open to relocation</span>
      </div>
    </div>

    <div class="card-center">
      <div class="eyebrow">&gt; senior backend &amp; ai engineer</div>
      <h1 class="title">Suresh Bhandari</h1>
      <div class="role">
        <span>Distributed Systems &amp; Agentic AI</span>
        <span class="role-badge">T-Systems (Deutsche Telekom)</span>
      </div>
      <p class="tagline">
        Building and scaling distributed backends and production AI systems that sustain real-world load with durable queues, idempotency, and high resilience.
      </p>

      <div class="metrics-row">
        <div class="metric-card">
          <div class="metric-val">5M+</div>
          <div class="metric-lbl">MAU Platform Scaled</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">10K</div>
          <div class="metric-lbl">Req/Sec Peak Handled</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">15+</div>
          <div class="metric-lbl">Production AI Agents</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">5+ yrs</div>
          <div class="metric-lbl">Backend &amp; Distributed</div>
        </div>
      </div>
    </div>

    <div class="card-bottom">
      <div class="tags">
        <span class="tag tag-accent">Python</span>
        <span class="tag tag-accent">FastAPI</span>
        <span class="tag tag-accent">Google ADK</span>
        <span class="tag">PostgreSQL</span>
        <span class="tag">RabbitMQ</span>
        <span class="tag">Redis</span>
        <span class="tag">AWS</span>
        <span class="tag">gRPC</span>
      </div>
      <div class="org-affiliation">Mumbai, India · github.com/suresh-3x</div>
    </div>
  </div>
</body>
</html>`;

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const ogPath = path.join(publicDir, 'og-image.png');
  await page.screenshot({ path: ogPath, type: 'png' });
  console.log(`Generated OG Image: ${ogPath}`);

  // Generate apple-touch-icon (180x180)
  const iconPage = await browser.newPage({
    viewport: { width: 180, height: 180 },
    deviceScaleFactor: 2,
  });

  const iconHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 180px;
      height: 180px;
      background: #0d1117;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 36px;
      border: 3px solid rgba(88, 166, 255, 0.3);
      overflow: hidden;
    }
    .monogram {
      font-family: 'JetBrains Mono', monospace;
      font-size: 80px;
      font-weight: 800;
      color: #58a6ff;
      letter-spacing: -2px;
      text-shadow: 0 0 20px rgba(88, 166, 255, 0.4);
    }
  </style>
</head>
<body>
  <div class="monogram">SB</div>
</body>
</html>`;

  await iconPage.setContent(iconHtml, { waitUntil: 'networkidle' });
  await iconPage.evaluate(() => document.fonts.ready);

  const iconPath = path.join(publicDir, 'apple-touch-icon.png');
  await iconPage.screenshot({ path: iconPath, type: 'png' });
  console.log(`Generated Apple Touch Icon: ${iconPath}`);

  await browser.close();
}

generateOGImage().catch((err) => {
  console.error(err);
  process.exit(1);
});
