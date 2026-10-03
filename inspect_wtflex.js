const https = require('https');

https.get('https://wtflex.in/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const titles = data.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi) || [];
    console.log('--- HEADINGS ---');
    titles.slice(0, 20).forEach(h => console.log(h.replace(/<[^>]+>/g, '').trim()));

    const imgs = data.match(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi) || [];
    console.log('--- IMAGES ---');
    const uniqueImgs = [...new Set(imgs)].filter(img => img.includes('cdn/shop') || img.includes('wtflex'));
    uniqueImgs.slice(0, 15).forEach(img => console.log(img));
  });
}).on('error', err => console.error(err));
