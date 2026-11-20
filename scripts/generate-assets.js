const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateAssets() {
  const brandDir = path.join(__dirname, '..', 'public', 'brand');
  const publicDir = path.join(__dirname, '..', 'public');
  const imagesDir = path.join(publicDir, 'images');
  const projectsDir = path.join(imagesDir, 'projects');
  const servicesDir = path.join(imagesDir, 'services');

  [brandDir, imagesDir, projectsDir, servicesDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  const iconSvgPath = path.join(brandDir, 'icon.svg');
  const iconBuffer = fs.readFileSync(iconSvgPath);

  // 1. Générer favicon & icones PWA
  await sharp(iconBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(iconBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
  await sharp(iconBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));
  await sharp(iconBuffer).resize(48, 48).png().toFile(path.join(publicDir, 'favicon.ico'));

  // 2. Générer Open Graph Image 1200x630
  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#073740" />
        <stop offset="100%" stop-color="#0B4F5C" />
      </linearGradient>
      <linearGradient id="peachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFCBA4" />
        <stop offset="100%" stop-color="#f5a46d" />
      </linearGradient>
    </defs>

    <rect width="1200" height="630" fill="url(#bgGrad)" />

    <path d="M 100 150 L 400 150 L 550 300 L 900 300 L 1100 100" stroke="#137e93" stroke-width="2" fill="none" opacity="0.3" />
    <path d="M 50 480 L 350 480 L 500 350 L 950 350 L 1150 550" stroke="#137e93" stroke-width="2" fill="none" opacity="0.3" />
    <circle cx="400" cy="150" r="6" fill="#FFCBA4" opacity="0.6" />
    <circle cx="550" cy="300" r="8" fill="#FFCBA4" opacity="0.8" />
    <circle cx="500" cy="350" r="7" fill="#FFCBA4" opacity="0.7" />

    <g transform="translate(120, 110)">
      <rect width="330" height="42" rx="21" fill="#145564" />
      <circle cx="24" cy="21" r="7" fill="#FFCBA4" />
      <text x="44" y="27" font-family="'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="bold" fill="#F4FAFA">
        SIÈGE À TUNIS • TOUTE L&apos;AFRIQUE
      </text>
    </g>

    <text x="120" y="260" font-family="'Segoe UI', Roboto, sans-serif" font-size="80" font-weight="900" fill="#F4FAFA">
      Be<tspan fill="#FFCBA4">T</tspan>A <tspan fill="#ffffff" font-weight="300">Engineering</tspan>
    </text>

    <text x="120" y="340" font-family="'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="500" fill="#FFCBA4">
      Du réseau à l&apos;automatisme, nous connectons votre performance.
    </text>

    <g transform="translate(120, 420)">
      <text x="0" y="30" font-family="'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#d3eded">
        • Réseaux Informatiques  • Électricité Bâtiment  • Électricité Industrielle
      </text>
      <text x="0" y="70" font-family="'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#d3eded">
        • Automatisme SCADA/PLC  • Services Informatiques &amp; Cybersécurité
      </text>
    </g>

    <text x="120" y="560" font-family="'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="bold" fill="#69b0c2">
      www.beta-engineering.com
    </text>
  </svg>
  `;

  await sharp(Buffer.from(ogSvg)).jpeg({ quality: 90 }).toFile(path.join(publicDir, 'og-image.jpg'));

  // 3. Visuels pour les 5 services
  const servicesData = [
    {
      id: 'reseaux-informatiques',
      title: 'Réseaux Informatiques &amp; CCTV',
      sub: 'Câblage optique, Baies, Wi-Fi Pro, Vidéosurveillance IP',
      color1: '#073740',
      color2: '#0e6373'
    },
    {
      id: 'electricite-batiment',
      title: 'Électricité Bâtiment &amp; Tertiaire',
      sub: 'Tableaux, Éclairage LED, Mise en conformité NF C 15-100',
      color1: '#0a424e',
      color2: '#125a6b'
    },
    {
      id: 'electricite-industrielle',
      title: 'Électricité Industrielle &amp; Armoires',
      sub: 'Conception &amp; Fabrication sur-mesure, Puissance, Variateurs',
      color1: '#073740',
      color2: '#0B4F5C'
    },
    {
      id: 'automatisme',
      title: 'Automatisme &amp; SCADA/PLC',
      sub: 'Automates programmables, IHM, Robotique, Rénovation lignes',
      color1: '#093c47',
      color2: '#176577'
    },
    {
      id: 'services-informatiques',
      title: 'Services IT &amp; Cybersécurité',
      sub: 'Développement Web/App, Audit sécurité, Cloud, Conseil IT',
      color1: '#052930',
      color2: '#0d4b58'
    }
  ];

  for (const s of servicesData) {
    const serviceSvg = `
    <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad_${s.id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${s.color1}" />
          <stop offset="100%" stop-color="${s.color2}" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#grad_${s.id})" />
      
      <circle cx="700" cy="100" r="250" fill="none" stroke="#1b7185" stroke-width="2" opacity="0.4" />
      <circle cx="700" cy="100" r="180" fill="none" stroke="#FFCBA4" stroke-width="1.5" opacity="0.3" />
      <circle cx="100" cy="500" r="220" fill="none" stroke="#1b7185" stroke-width="2" opacity="0.4" />
      
      <rect x="60" y="80" width="140" height="8" rx="4" fill="#FFCBA4" />
      <text x="60" y="240" font-family="'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="900" fill="#F4FAFA">
        ${s.title}
      </text>
      <text x="60" y="300" font-family="'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#d3eded">
        ${s.sub}
      </text>

      <g transform="translate(60, 460)">
        <rect width="260" height="50" rx="10" fill="#0B4F5C" stroke="#FFCBA4" stroke-width="1.5" />
        <text x="25" y="32" font-family="'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="bold" fill="#F4FAFA">
          BeTA Engineering • Tunis
        </text>
      </g>
    </svg>
    `;
    await sharp(Buffer.from(serviceSvg)).webp({ quality: 85 }).toFile(path.join(servicesDir, `${s.id}.webp`));
  }

  // 4. Visuels projets
  const projectsData = [
    {
      slug: 'deploiement-fibre-campus-tunis',
      title: 'Câblage Fibre Optique &amp; Baies 42U',
      location: 'Tunis, Tunisie'
    },
    {
      slug: 'fabrication-armoires-agroalimentaire-sfax',
      title: 'Fabrication de 12 Armoires TGBT',
      location: 'Sfax, Tunisie'
    },
    {
      slug: 'supervision-scada-cimenterie-abidjan',
      title: 'Système SCADA &amp; Siemens S7-1500',
      location: 'Abidjan, Côte d&apos;Ivoire'
    },
    {
      slug: 'securite-reseau-cctv-logistique-dakar',
      title: 'Surveillance CCTV IP 120 Caméras',
      location: 'Dakar, Sénégal'
    },
    {
      slug: 'electrification-tertiaire-tour-affaires-alger',
      title: 'Installation Électrique Tour 18 Étages',
      location: 'Alger, Algérie'
    },
    {
      slug: 'plateforme-iot-supervision-energie',
      title: 'Plateforme Web &amp; IoT Télé-Supervision',
      location: 'Tunis &amp; Afrique Centrale'
    }
  ];

  for (const p of projectsData) {
    const projectSvg = `
    <svg width="800" height="550" viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pgrad_${p.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#073740" />
          <stop offset="100%" stop-color="#0e4a57" />
        </linearGradient>
      </defs>
      <rect width="800" height="550" fill="url(#pgrad_${p.slug})" />

      <g transform="translate(60, 60)">
        <rect width="240" height="36" rx="18" fill="#145564" />
        <circle cx="20" cy="18" r="6" fill="#FFCBA4" />
        <text x="36" y="23" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="bold" fill="#F4FAFA">
          ${p.location}
        </text>
      </g>

      <text x="60" y="240" font-family="'Segoe UI', Roboto, sans-serif" font-size="36" font-weight="bold" fill="#F4FAFA">
        ${p.title}
      </text>
      
      <rect x="60" y="280" width="80" height="4" rx="2" fill="#FFCBA4" />

      <text x="60" y="340" font-family="'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="400" fill="#d3eded">
        Réalisation clé en main par les ingénieurs de BeTA Engineering
      </text>

      <g transform="translate(60, 440)">
        <text x="0" y="20" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#69b0c2">
          CONFORMITÉ NORMES EUROPÉENNES &amp; INTERNATIONALES
        </text>
      </g>
    </svg>
    `;
    await sharp(Buffer.from(projectSvg)).webp({ quality: 85 }).toFile(path.join(projectsDir, `${p.slug}.webp`));
  }

  console.log('✅ Tous les assets visuels ont été générés avec succès !');
}

generateAssets().catch(err => {
  console.error('Erreur génération assets:', err);
  process.exit(1);
});
