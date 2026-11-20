const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Démarrage du seed de BeTA Engineering...');

  // Nettoyage préalable pour éviter les doublons lors des re-runs
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.subService.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.service.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.user.deleteMany();

  // 1. Utilisateur Admin par défaut
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Admin@2026!BeTA', salt);
  const admin = await prisma.user.create({
    data: {
      nom: 'Directeur Technique BeTA',
      email: 'admin@beta-engineering.com',
      passwordHash: passwordHash,
      role: 'admin',
    },
  });
  console.log(`✅ Admin créé : ${admin.email}`);

  // 2. Services et Sous-Prestations
  const servicesData = [
    {
      slug: 'reseaux-informatiques',
      titre: 'Réseaux Informatiques & Télécoms',
      sousTitre: 'Infrastructures réseaux haute performance, câblage certifié et vidéosurveillance IP',
      description: 'Conception, déploiement et sécurisation de réseaux d\'entreprise fiables et évolutifs. Du câblage structuré cuivre et fibre optique jusqu\'à la téléphonie IP et la vidéosurveillance CCTV.',
      icone: 'Network',
      image: '/images/services/reseaux-informatiques.webp',
      ordre: 1,
      subs: [
        { titre: 'Installation de caméras de surveillance (IP & CCTV)', description: 'Systèmes de vidéosurveillance haute définition, caméras thermiques, dômes motorisés PTZ, enregistreurs NVR et télé-surveillance distante.' },
        { titre: 'Câblage structuré (Cuivre & Fibre Optique)', description: 'Certification de liens Cat 6A / Cat 7 et liaisons inter-bâtiments en fibre optique monomode et multimode, soudures à fusion.' },
        { titre: 'Switches, Routeurs & Baies de brassage', description: 'Architecture réseau managée L2/L3, routage dynamique, VLANs, aménagement et organisation thermique des baies 19 pouces.' },
        { titre: 'Wi-Fi Professionnel & Contrôle d\'accès', description: 'Bornes Wi-Fi 6 haute densité avec contrôleur centralisé, gestion de portails captifs, lecteurs de badges RFID et biométrie.' },
        { titre: 'VoIP, Téléphonie IP & Firewalls UTM', description: 'Solutions IPBX logicielles et matérielles, pare-feu nouvelle génération, VPN sécurisés inter-sites et filtrage de flux.' },
        { titre: 'Supervision & Maintenance réseau 24/7', description: 'Contrats de maintenance préventive et curative avec monitoring proactif de la disponibilité et des bandes passantes.' }
      ]
    },
    {
      slug: 'electricite-batiment',
      titre: 'Électricité Bâtiment & Tertiaire',
      sousTitre: 'Installations électriques complètes pour immeubles de bureaux, complexes tertiaires et résidentiels',
      description: 'Nous assurons l\'étude, le dimensionnement et la réalisation d\'installations électriques robustes, sûres et économes en énergie, strictement conformes à la norme NF C 15-100.',
      icone: 'Zap',
      image: '/images/services/electricite-batiment.webp',
      ordre: 2,
      subs: [
        { titre: 'Installations électriques tertiaires et commerciales', description: 'Distribution électrique générale pour centres commerciaux, sièges sociaux, hôtels et établissements de santé.' },
        { titre: 'Tableaux électriques et colonnes montantes', description: 'Conception et câblage de tableaux divisionnaires, équilibrage des phases, disjoncteurs différentiels et protections parafoudres.' },
        { titre: 'Éclairage architectural et LED intelligent', description: 'Gestion d\'éclairage DALI, détecteurs de présence et régulation de luminosité pour l\'efficacité énergétique.' },
        { titre: 'Mise à la terre et mise en conformité', description: 'Mesures de résistance de terre, installation de colonnes de terre, liaisons équipotentielles et mise en conformité réglementaire.' },
        { titre: 'Réseaux courants faibles bâtiment', description: 'Interphonie, sonorisation de sécurité, alarme incendie (SSI), détection intrusion et gestion technique du bâtiment (GTB).' },
        { titre: 'Dépannage d\'urgence et maintenance', description: 'Interventions rapides en cas de disjonction, coupure générale, surchauffe ou défaut d\'isolement.' }
      ]
    },
    {
      slug: 'electricite-industrielle',
      titre: 'Électricité Industrielle & Tableauterie',
      sousTitre: 'Conception et fabrication sur-mesure d\'armoires de commande, distribution et forte puissance',
      description: 'Atelier de fabrication intégré à Tunis pour vos TGBT, armoires de distribution et coffrets de commande. Intervention sur sites miniers, usines chimiques, cimenteries et industries agroalimentaires partout en Afrique.',
      icone: 'Cpu',
      image: '/images/services/electricite-industrielle.webp',
      ordre: 3,
      subs: [
        { titre: 'Conception et FABRICATION d\'armoires sur-mesure', description: 'Études sur logiciels de CAO (SEE Electrical, Caneco), tôlerie industrielle certifiée, intégration de jeux de barres et schéma conforme.' },
        { titre: 'TGBT & Armoires de puissance forte intensité', description: 'Tableaux Généraux Basse Tension jusqu\'à 4000A avec inverseurs de source automatiques (Normal/Secours Groupes électrogènes).' },
        { titre: 'Variateurs de vitesse & Démarreurs progressifs', description: 'Intégration et paramétrage de variateurs de fréquence pour moteurs asynchrones, pompes, ventilateurs et convoyeurs lourds.' },
        { titre: 'Câblage industriel en caniveaux et chemins de câbles', description: 'Pose de chemins de câbles en tôle perforée ou fil d\'acier, câblage blindé CEM, raccordement moteurs et capteurs de puissance.' },
        { titre: 'Compensation d\'énergie réactive & Condensateurs', description: 'Batteries de condensateurs automatiques anti-harmoniques pour éliminer les pénalités de cosinus phi sur les factures électriques.' },
        { titre: 'Maintenance préventive par thermographie infrarouge', description: 'Audit thermographique des armoires sous charge pour détecter les échauffements anormaux avant la panne critique.' }
      ]
    },
    {
      slug: 'automatisme',
      titre: 'Automatisme & Régulation SCADA',
      sousTitre: 'Automatisation de procédés industriels, programmation PLC, robotique et IHM',
      description: 'Optimisez vos cadences de production et fiabilisez vos lignes industrielles. Nos automaticiens maîtrisent l\'ensemble des plateformes leaders (Siemens TIA Portal, Schneider EcoStruxure, Rockwell Allen-Bradley, Omron).',
      icone: 'Cog',
      image: '/images/services/automatisme.webp',
      ordre: 4,
      subs: [
        { titre: 'Programmation d\'Automates Programmables (PLC)', description: 'Développement d\'architectures logiques sécurisées selon la norme IEC 61131-3 (Ladder, Grafcet, Structured Text).' },
        { titre: 'Supervision SCADA & Interfaces Homme-Machine (IHM)', description: 'Écrans tactiles pupitres et plateformes SCADA multipostes avec archivage de données, traçabilité et gestion d\'alarmes temps réel.' },
        { titre: 'Instrumentation, Capteurs & Boucles de régulation', description: 'Régulation PID avancée de température, pression, débit, niveau et pesage dynamique avec étalonnage de précision.' },
        { titre: 'Rénovation & Rétrofit de lignes de production', description: 'Remplacement d\'automates obsolètes sans arrêt prolongé de l\'usine, reprise des schémas électriques et migration logicielle.' },
        { titre: 'Intégration robotique et axes asservis', description: 'Synchronisation de servomoteurs, cinématiques multiaxes, cellules de palettisation et manipulation automatisée.' },
        { titre: 'Télémaintenance industrielle sécurisée', description: 'Passerelles VPN industrielles sécurisées pour assistance à distance immédiate sur vos usines en Tunisie et à l\'étranger.' }
      ]
    },
    {
      slug: 'services-informatiques',
      titre: 'Services Informatiques & Cybersécurité',
      sousTitre: 'Développement de solutions logicielles sur-mesure, audits de cybersécurité et infrastructure Cloud',
      description: 'Accélérez votre transition numérique avec des logiciels métier performants et un bouclier cyber impénétrable. Nous accompagnons les directions d\'entreprises dans leur stratégie technologique globale.',
      icone: 'Code',
      image: '/images/services/services-informatiques.webp',
      ordre: 5,
      subs: [
        { titre: 'Développement de plateformes web & applications métier', description: 'Création de portails web modernes, ERP/CRM légers, applications de suivi d\'atelier et dashboards connectés.' },
        { titre: 'Audits de Cybersécurité, Pentest & Protection', description: 'Tests d\'intrusion externes et internes, revue de configurations, protection anti-ransomware et conformité aux standards de sécurité.' },
        { titre: 'Hébergement haute disponibilité & Cloud hybride', description: 'Déploiement sur serveurs dédiés et clouds souverains, réplication en temps réel, sauvegardes externalisées immuables.' },
        { titre: 'Maintenance applicative & Infogérance de parcs', description: 'Gestion du parc informatique, mises à jour critiques, support utilisateur helpdesk et infogérance préventive.' },
        { titre: 'Conseil IT, Urbanisation & Transformation Digitale', description: 'Audit des processus existants, rédaction de cahiers des charges fonctionnels et pilotage de projets technologiques complexes.' }
      ]
    }
  ];

  for (const s of servicesData) {
    const createdService = await prisma.service.create({
      data: {
        slug: s.slug,
        titre: s.titre,
        sousTitre: s.sousTitre,
        description: s.description,
        icone: s.icone,
        image: s.image,
        ordre: s.ordre,
        subServices: {
          create: s.subs.map((sub, idx) => ({
            titre: sub.titre,
            description: sub.description,
            ordre: idx + 1
          }))
        }
      }
    });
    console.log(`✅ Service créé : ${createdService.titre}`);
  }

  // Récupérer les services pour les lier aux projets et FAQ
  const reseaux = await prisma.service.findUnique({ where: { slug: 'reseaux-informatiques' } });
  const elecIndus = await prisma.service.findUnique({ where: { slug: 'electricite-industrielle' } });
  const auto = await prisma.service.findUnique({ where: { slug: 'automatisme' } });
  const elecBat = await prisma.service.findUnique({ where: { slug: 'electricite-batiment' } });
  const info = await prisma.service.findUnique({ where: { slug: 'services-informatiques' } });

  // 3. Projets / Réalisations
  const projectsData = [
    {
      slug: 'deploiement-fibre-campus-tunis',
      titre: 'Câblage Réseau Fibre Optique & 12 Baies 42U - Siège Bancaire',
      description: 'Audit préalable, tirage de 18 km de câbles Cat 6A blindés et liaisons dorsales fibre optique 10G. Raccordement et repérage de 12 baies de brassage climatisées avec baie de secours et certification Fluke Networks.',
      client: 'Groupe Bancaire Panafricain',
      lieu: 'Centre Urbain Nord, Tunis',
      pays: 'Tunisie',
      date: '2025',
      serviceId: reseaux.id,
      statut: 'Terminé',
      misEnAvant: true,
      images: ['/images/projects/deploiement-fibre-campus-tunis.webp']
    },
    {
      slug: 'fabrication-armoires-agroalimentaire-sfax',
      titre: 'Fabrication de 12 Armoires Électriques TGBT & Démarreurs',
      description: 'Conception sous SEE Electrical, fabrication dans nos ateliers de Tunis et mise en service sur site de 12 armoires industrielles de puissance (jeu de barres 2500A, variateurs Schneider ATV930, tiroirs débrochables).',
      client: 'Complexe Agroalimentaire Méditerranéen',
      lieu: 'Zone Industrielle Madagascar, Sfax',
      pays: 'Tunisie',
      date: '2025',
      serviceId: elecIndus.id,
      statut: 'Terminé',
      misEnAvant: true,
      images: ['/images/projects/fabrication-armoires-agroalimentaire-sfax.webp']
    },
    {
      slug: 'supervision-scada-cimenterie-abidjan',
      titre: 'Supervision SCADA & Automates Siemens S7-1500 Cimenterie',
      description: 'Automatisation complète de la ligne de broyage et ensachage. Développement de 3 postes SCADA WinCC, intégration de 4 automates Siemens en réseau Profinet redondé et mise en service sur site en Côte d\'Ivoire.',
      client: 'Consortium Cimentier d\'Afrique de l\'Ouest',
      lieu: 'Zone Industrielle de Yopougon, Abidjan',
      pays: 'Côte d\'Ivoire',
      date: '2024',
      serviceId: auto.id,
      statut: 'Terminé',
      misEnAvant: true,
      images: ['/images/projects/supervision-scada-cimenterie-abidjan.webp']
    },
    {
      slug: 'securite-reseau-cctv-logistique-dakar',
      titre: 'Surveillance CCTV IP 120 Caméras & Contrôle d\'Accès Portuaire',
      description: 'Installation d\'une infrastructure complète de vidéosurveillance périmétrique avec caméras thermiques 4K, reconnaissance de plaques minéralogiques et barrières levantes motorisées connectées à un serveur NVR redondant.',
      client: 'Hub Logistique Portuaire',
      lieu: 'Port Autonome de Dakar',
      pays: 'Sénégal',
      date: '2024',
      serviceId: reseaux.id,
      statut: 'Terminé',
      misEnAvant: true,
      images: ['/images/projects/securite-reseau-cctv-logistique-dakar.webp']
    },
    {
      slug: 'electrification-tertiaire-tour-affaires-alger',
      titre: 'Installation Électrique & Éclairage Intelligent Tour 18 Étages',
      description: 'Étude et exécution des lots courants forts et faibles : colonnes montantes, tableaux divisionnaires par étage, chemins de câbles, gestion d\'éclairage DALI et système de sécurité incendie centralisé.',
      client: 'Promoteur Immobilier International',
      lieu: 'Bab Ezzouar, Alger',
      pays: 'Algérie',
      date: '2024',
      serviceId: elecBat.id,
      statut: 'Terminé',
      misEnAvant: false,
      images: ['/images/projects/electrification-tertiaire-tour-affaires-alger.webp']
    },
    {
      slug: 'plateforme-iot-supervision-energie',
      titre: 'Plateforme Web & IoT de Télé-Supervision Énergétique Usines',
      description: 'Développement d\'une plateforme web sécurisée de centralisation des consommations énergétiques (eau, électricité, gaz) via compteurs communicants Modbus/IP pour 8 sites de production en Afrique.',
      client: 'Groupe Industriel Textile',
      lieu: 'Tunis & Afrique Centrale',
      pays: 'Afrique Centrale',
      date: '2025',
      serviceId: info.id,
      statut: 'Terminé',
      misEnAvant: true,
      images: ['/images/projects/plateforme-iot-supervision-energie.webp']
    }
  ];

  for (const p of projectsData) {
    const createdProject = await prisma.project.create({
      data: {
        slug: p.slug,
        titre: p.titre,
        description: p.description,
        client: p.client,
        lieu: p.lieu,
        pays: p.pays,
        date: p.date,
        serviceId: p.serviceId,
        statut: p.statut,
        misEnAvant: p.misEnAvant,
        publie: true,
        images: {
          create: p.images.map((imgUrl, idx) => ({
            url: imgUrl,
            alt: p.titre,
            ordre: idx
          }))
        }
      }
    });
    console.log(`✅ Projet créé : ${createdProject.titre}`);
  }

  // 4. Témoignages Clients
  const testimonials = [
    {
      auteur: 'M. Karim Ben Salem',
      poste: 'Directeur d\'Exploitation',
      societe: 'Groupe Agro-Industriel Maghreb',
      texte: 'La société BeTA Engineering a conçu et fabriqué l\'ensemble de nos armoires électriques d\'usine avec un professionnalisme exemplaire. Les délais ont été respectés au jour près et les armoires sont d\'une qualité irréprochable.',
      note: 5,
      publie: true,
      ordre: 1
    },
    {
      auteur: 'Mme Aïssatou Diallo',
      poste: 'Directrice des Systèmes d\'Information',
      societe: 'Consortium Logistique Ouest-Africain (Abidjan)',
      texte: 'Le déploiement de notre infrastructure réseau et vidéosurveillance à Dakar et Abidjan a été un franc succès. Leurs équipes basées à Tunis se sont déplacées rapidement sur le terrain avec un niveau d\'ingénierie remarquable.',
      note: 5,
      publie: true,
      ordre: 2
    },
    {
      auteur: 'Ing. Tarek Zouari',
      poste: 'Chef de Projet Bâtiment & Infrastructure',
      societe: 'Société Générale d\'Aménagement',
      texte: 'Pour l\'électrification complète de notre complexe tertiaire à Tunis, BeTA Engineering a fait preuve d\'une rigueur absolue sur les normes de sécurité NF C 15-100. Un partenaire d\'ingénierie de premier plan.',
      note: 5,
      publie: true,
      ordre: 3
    }
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // 5. Partenaires de renommée mondiale
  const partners = [
    { nom: 'Schneider Electric', logo: '/brand/schneider.svg', lien: 'https://www.se.com', ordre: 1 },
    { nom: 'Siemens Industry', logo: '/brand/siemens.svg', lien: 'https://www.siemens.com', ordre: 2 },
    { nom: 'Legrand', logo: '/brand/legrand.svg', lien: 'https://www.legrand.com', ordre: 3 },
    { nom: 'Cisco Systems', logo: '/brand/cisco.svg', lien: 'https://www.cisco.com', ordre: 4 },
    { nom: 'Hikvision', logo: '/brand/hikvision.svg', lien: 'https://www.hikvision.com', ordre: 5 },
    { nom: 'Dell Technologies', logo: '/brand/dell.svg', lien: 'https://www.dell.com', ordre: 6 }
  ];

  for (const pr of partners) {
    await prisma.partner.create({ data: pr });
  }

  // 6. Équipe Dirigeante
  const team = [
    {
      nom: 'Ing. Didier B.',
      poste: 'Directeur Général & Fondateur',
      photo: '',
      bio: 'Plus de 25 ans d\'expérience en ingénierie électrique, automatisme industriel et déploiement de grands projets à travers l\'Afrique.',
      ordre: 1,
      linkedin: 'https://linkedin.com'
    },
    {
      nom: 'Ing. Mohamed Trabelsi',
      poste: 'Responsable Pôle Électricité & Tableauterie',
      photo: '',
      bio: 'Expert en dimensionnement TGBT, calculs de court-circuit Caneco et fabrication d\'armoires industrielles de forte puissance.',
      ordre: 2,
      linkedin: 'https://linkedin.com'
    },
    {
      nom: 'Ing. Youssef Chaabane',
      poste: 'Chef de Projets Réseaux, Télécoms & CCTV',
      photo: '',
      bio: 'Spécialiste certifié en fibre optique, architectures réseaux sécurisées et vidéosurveillance IP de sites sensibles.',
      ordre: 3,
      linkedin: 'https://linkedin.com'
    },
    {
      nom: 'Sonia Mansouri',
      poste: 'Responsable Automatisme & Systèmes SCADA',
      photo: '',
      bio: 'Ingénieure automaticienne spécialisée en programmation d\'automates Siemens/Schneider et supervision d\'usines de transformation.',
      ordre: 4,
      linkedin: 'https://linkedin.com'
    }
  ];

  for (const tm of team) {
    await prisma.teamMember.create({ data: tm });
  }

  // 7. FAQ Générales et Services
  const faqs = [
    {
      question: 'Quels sont vos délais moyens d\'intervention en Tunisie et en Afrique ?',
      reponse: 'En Tunisie, nous intervenons pour tout audit ou urgence sous 24 à 48 heures. Pour les missions sur le continent africain (Côte d\'Ivoire, Sénégal, Algérie, Cameroun...), notre équipe d\'ingénieurs et techniciens se mobilise sous 5 à 7 jours ouvrés après validation du cahier des charges.',
      ordre: 1
    },
    {
      question: 'Fabriquez-vous vous-mêmes vos armoires électriques ?',
      reponse: 'Oui, absolument. Nous disposons de notre propre atelier de tableauterie à Tunis équipé pour la tôlerie, le montage de jeux de barres, le câblage de puissance et les tests d\'isolement avant expédition et recette.',
      serviceId: elecIndus.id,
      ordre: 2
    },
    {
      question: 'Fournissez-vous des garanties et des certificats de conformité ?',
      reponse: 'Toutes nos réalisations sont accompagnées des certificats de conformité aux normes en vigueur (NF C 15-100, IEC 61439 pour les armoires, certifications Fluke pour le câblage réseau). Nous offrons une garantie constructeur et un suivi de maintenance dédié.',
      ordre: 3
    },
    {
      question: 'Comment se déroule une demande de devis pour un projet complexe ?',
      reponse: 'Vous pouvez remplir notre formulaire de devis en 5 étapes en joignant vos plans ou cahiers des charges. Notre bureau d\'études analyse vos documents sous 48 heures pour vous proposer un chiffrage technique et financier précis.',
      ordre: 4
    },
    {
      question: 'Pouvez-vous moderniser (rétrofit) un automate ancien sans remplacer toute la machine ?',
      reponse: 'C\'est l\'une de nos spécialités majeures. Nous analysons l\'ancien programme (souvent obsolète) et concevons une passerelle vers les automates de dernière génération tout en minimisant l\'arrêt de production.',
      serviceId: auto.id,
      ordre: 5
    }
  ];

  for (const f of faqs) {
    await prisma.fAQ.create({ data: f });
  }

  // 8. Paramètres du site (Settings)
  const settings = [
    { key: 'company_name', value: 'BeTA Engineering', description: 'Nom officiel de la société' },
    { key: 'slogan_fr', value: 'Du réseau à l\'automatisme, nous connectons votre performance.', description: 'Slogan français' },
    { key: 'slogan_en', value: 'From networks to automation, we connect your performance.', description: 'Slogan anglais' },
    { key: 'slogan_ar', value: 'من الشبكات إلى الأتمتة، نربط أداءكم بالتميز والريادة.', description: 'Slogan arabe' },
    { key: 'phone', value: '+216 71 888 999', description: 'Téléphone standard' },
    { key: 'whatsapp', value: '+216 98 123 456', description: 'Numéro WhatsApp' },
    { key: 'email', value: 'contact@beta-engineering.com', description: 'Email de contact' },
    { key: 'address', value: 'Immeuble Le Grand Boulevard, Centre Urbain Nord, 1082 Tunis, Tunisie', description: 'Adresse postale' },
    { key: 'opening_hours', value: 'Lundi - Vendredi : 08h00 - 18h00 | Samedi : 08h00 - 13h00', description: 'Horaires d\'ouverture' },
    { key: 'years_experience', value: '15', description: 'Années d\'expérience' },
    { key: 'projects_count', value: '380', description: 'Projets réalisés' },
    { key: 'clients_count', value: '160', description: 'Clients professionnels' },
    { key: 'countries_count', value: '14', description: 'Pays africains couverts' },
    { key: 'facebook_url', value: 'https://facebook.com/betaengineering', description: 'Lien Facebook' },
    { key: 'linkedin_url', value: 'https://linkedin.com/company/beta-engineering', description: 'Lien LinkedIn' },
    { key: 'twitter_url', value: 'https://twitter.com/betaengineering', description: 'Lien Twitter/X' },
    { key: 'logo_url', value: '/brand/logo.svg', description: 'Chemin du logo principal' }
  ];

  for (const st of settings) {
    await prisma.setting.create({ data: st });
  }

  console.log('🎉 Seed de BeTA Engineering terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

