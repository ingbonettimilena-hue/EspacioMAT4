const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const inputFile = process.argv[2] || 'behance-case-study.html';
    const baseName  = path.basename(inputFile, '.html');
    const htmlPath  = path.resolve(__dirname, '../public', inputFile);
    const outPath   = path.resolve(__dirname, '../public', baseName + '.pdf');

  if (!fs.existsSync(htmlPath)) {
    console.error('❌ No se encontró el archivo HTML:', htmlPath);
    process.exit(1);
  }

  console.log('🚀 Iniciando Chromium...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Viewport ancho para que el layout de 900px se vea perfecto
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });

  // Cargar el HTML local como file://
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  console.log('📄 Cargando:', fileUrl);

  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60000 });

  // Esperar a que todas las imágenes base64 estén pintadas
  await page.evaluate(() => {
    return new Promise((resolve) => {
      const imgs = Array.from(document.images);
      if (imgs.every(img => img.complete)) { resolve(); return; }
      let loaded = 0;
      imgs.forEach(img => {
        if (img.complete) { loaded++; if (loaded === imgs.length) resolve(); return; }
        img.addEventListener('load',  () => { loaded++; if (loaded === imgs.length) resolve(); });
        img.addEventListener('error', () => { loaded++; if (loaded === imgs.length) resolve(); });
      });
    });
  });

  // Pequeña pausa extra para render completo
  await new Promise(r => setTimeout(r, 800));

  console.log('🖨️  Generando PDF...');
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,          // incluir fondos y colores
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: false,
    scale: 0.82,                     // escala para que el layout de 900px entre en A4
  });

  await browser.close();

  const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(1);
  console.log(`✅ PDF generado: ${outPath}`);
  console.log(`   Tamaño: ${sizeMB} MB`);
}

generatePDF().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
