// Copies the web game into the Android app and tells it which ads to use.
// ADS=test (default) -> Google test ads, safe for test builds. ADS=live -> real ads (Google Play release).
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const live = process.env.ADS === 'live';
rmSync('www', { recursive: true, force: true });
mkdirSync('www');
for (const f of ['index.html', 'fonts.css']) cpSync('../' + f, 'www/' + f);
for (const d of ['fonts', 'img']) cpSync('../' + d, 'www/' + d, { recursive: true });
const html = readFileSync('www/index.html', 'utf8');
const cfg = `<script>window.CULEBRILLA_ADS={test:${live ? 'false' : 'true'}};</script>\n`;
writeFileSync('www/index.html', html.replace('<head>\n', '<head>\n' + cfg));
console.log('web copied, ads:', live ? 'LIVE' : 'test');
