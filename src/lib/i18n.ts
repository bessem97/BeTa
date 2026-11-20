export type Locale = 'fr' | 'en' | 'ar';

export interface Translations {
  [key: string]: {
    fr: string;
    en: string;
    ar: string;
  };
}

export const translations: Record<string, { fr: string; en: string; ar: string }> = {
  // Navigation
  "nav.home": { fr: "Accueil", en: "Home", ar: "الرئيسية" },
  "nav.services": { fr: "Nos Services", en: "Our Services", ar: "خدماتنا" },
  "nav.projects": { fr: "Réalisations", en: "Projects", ar: "مشاريعنا" },
  "nav.about": { fr: "À Propos", en: "About Us", ar: "من نحن" },
  "nav.contact": { fr: "Contact", en: "Contact", ar: "اتصل بنا" },
  "nav.quote": { fr: "Demander un devis", en: "Request a Quote", ar: "طلب عرض أسعار" },
  "nav.admin": { fr: "Espace Admin", en: "Admin Dashboard", ar: "لوحة التحكم" },
  "nav.allServices": { fr: "Voir tous nos services", en: "View all services", ar: "عرض جميع الخدمات" },

  // Topbar
  "topbar.hub": { fr: "Siège à Tunis • Interventions sur toute l'Afrique", en: "Headquarters in Tunis • Deployments across all Africa", ar: "المقر بتونس • تدخلات في كامل إفريقيا" },
  "topbar.emergency": { fr: "Urgence technique 24/7", en: "24/7 Technical Emergency", ar: "طوارئ فنية 24/7" },

  // Hero Section
  "hero.badge": { fr: "BeTA Engineering · Tunis, Tunisie", en: "BeTA Engineering · Tunis, Tunisia", ar: "BeTA Engineering · تونس، تونس" },
  "hero.tag": { fr: "BeTA Engineering · Tunis, Tunisie", en: "BeTA Engineering · Tunis, Tunisia", ar: "BeTA Engineering · تونس، تونس" },
  "hero.title.part1": { fr: "Toutes vos infrastructures techniques, ", en: "All your technical infrastructures, ", ar: "جميع بنيتكم التحتية التقنية، " },
  "hero.title.highlight": { fr: "un seul partenaire.", en: "one single partner.", ar: "شريك واحد متكامل." },
  "hero.subtitle": { 
    fr: "Basés à Tunis, nous intervenons dans toute l'Afrique.", 
    en: "Based in Tunis, we operate across all Africa.", 
    ar: "انطلاقاً من تونس، نتدخل في كامل أنحاء إفريقيا." 
  },
  "hero.cta.quote": { fr: "Demander un devis", en: "Request a quote", ar: "طلب عرض أسعار" },
  "hero.cta.services": { fr: "Découvrir nos services", en: "Explore our services", ar: "اكتشف خدماتنا" },

  // Stats
  "stats.experience": { fr: "Années d'expérience", en: "Years of Experience", ar: "سنوات من الخبرة" },
  "stats.projects": { fr: "Projets industriels & IT", en: "Delivered Projects", ar: "مشروع منجز بنجاح" },
  "stats.clients": { fr: "Clients & Partenaires B2B", en: "B2B Clients & Partners", ar: "عميل و شريك أعمال" },
  "stats.countries": { fr: "Pays d'intervention en Afrique", en: "African Countries Covered", ar: "دولة إفريقية نغطيها" },

  // Section Services
  "services.tag": { fr: "Excellence Technique", en: "Technical Excellence", ar: "التميز التقني" },
  "services.title": { fr: "Nos 5 Pôles d'Expertise", en: "Our 5 Core Capabilities", ar: "مجالات خبرتنا الخمسة" },
  "services.subtitle": { fr: "Une maîtrise globale des courants forts, courants faibles, de l'automatisme et des technologies de l'information.", en: "Full mastery of high/low voltage, industrial automation, and enterprise IT systems.", ar: "تحكم شامل في التيارات القوية والضعيفة، والأتمتة الصناعية، ونظم تكنولوجيا المعلومات." },
  "services.learnMore": { fr: "Découvrir la prestation", en: "Learn More", ar: "تفاصيل الخدمة" },

  // Section Why Choose Us
  "why.tag": { fr: "Engagement & Rigueur", en: "Commitment & Quality", ar: "الالتزام والجودة" },
  "why.title": { fr: "Pourquoi Choisir BeTA Engineering ?", en: "Why Choose BeTA Engineering?", ar: "لماذا تختار BeTA Engineering؟" },
  "why.1.title": { fr: "Atelier de Fabrication Intégré à Tunis", en: "In-House Manufacturing Workshop in Tunis", ar: "ورشة تصنيع مدمجة في تونس" },
  "why.1.desc": { fr: "Nous concevons et assemblons nos armoires électriques TGBT et coffrets d'automatisme sur mesure avec un contrôle qualité strict.", en: "We design and assemble custom low-voltage switchboards and automation cabinets with rigorous quality testing.", ar: "نقوم بتصميم وتجميع لوحات التوزيع الكهربائية وخزائن الأتمتة المخصصة مع مراقبة جودة صارمة." },
  "why.2.title": { fr: "Mobilité Immédiate dans Toute l'Afrique", en: "Fast Pan-African Deployment", ar: "انتشار سريع في كامل إفريقيا" },
  "why.2.desc": { fr: "Nos ingénieurs et techniciens se déploient en quelques jours sur vos chantiers en Afrique du Nord, de l'Ouest et Centrale.", en: "Our certified engineers and technicians deploy on-site within days anywhere in North, West, and Central Africa.", ar: "مهندسونا وفنيونا المعتمدون ينتقلون لمواقع مشاريعكم في شمال وغرب ووسط إفريقيا خلال أيام معدودة." },
  "why.3.title": { fr: "Conformité aux Normes Internationales", en: "International Standards Compliance", ar: "مطابقة لأعلى المعايير الدولية" },
  "why.3.desc": { fr: "Tous nos travaux respectent scrupuleusement les normes NF C 15-100, IEC 61439, ISO et les certifications réseau Fluke.", en: "All our engineering adheres strictly to NF C 15-100, IEC 61439, ISO, and Fluke certified testing standards.", ar: "جميع أعمالنا تطابق بدقة معايير NF C 15-100 و IEC 61439 وشهادات قياس الشبكات Fluke." },
  "why.4.title": { fr: "Guichet Unique Forts / Faibles / IT", en: "One-Stop Shop: Electrical, Telecom & IT", ar: "شريك موحد للكهرباء والشبكات والبرمجيات" },
  "why.4.desc": { fr: "Un seul interlocuteur responsable pour l'ensemble de votre infrastructure : électrique, réseau, contrôle d'accès et logiciels.", en: "A single accountable partner for your entire infrastructure: power, cabling, CCTV, automation, and custom software.", ar: "شريك تقني واحد متكامل يتكفل بجميع بنيتكم التحتية: الكهرباء، الشبكات، المراقبة، والأتمتة." },

  // Section Africa Map
  "africa.tag": { fr: "Rayonnement Géographique", en: "Geographic Reach", ar: "الامتداد الجغرافي" },
  "africa.title": { fr: "Depuis Tunis, Nous Intervenons Partout en Afrique", en: "From Tunis, We Operate Across All Africa", ar: "من تونس، ننفذ مشاريعكم في كافة أنحاء إفريقيا" },
  "africa.desc": { 
    fr: "Grâce à notre position stratégique à Tunis et à nos partenariats logistiques, nous pilotons des projets de grande envergure dans plus de 14 pays africains (Côte d'Ivoire, Sénégal, Algérie, Cameroun, Gabon, RDC...).", 
    en: "Strategically headquartered in Tunis, we spearhead large-scale turnkey engineering missions in over 14 African nations.", 
    ar: "بفضل موقعنا الاستراتيجي في تونس وشبكتنا اللوجستية الموثوقة، ندير مشاريع كبرى في أكثر من 14 دولة إفريقية." 
  },

  // Section Projects
  "projects.tag": { fr: "Savoir-Faire Prouvé", en: "Proven Expertise", ar: "سجل إنجازاتنا" },
  "projects.title": { fr: "Nos Réalisations Récentes", en: "Featured Case Studies", ar: "أحدث مشاريعنا المنجزة" },
  "projects.viewAll": { fr: "Consulter toutes nos réalisations", en: "View All Projects", ar: "عرض جميع المشاريع" },
  "projects.filterAll": { fr: "Tous les projets", en: "All Projects", ar: "جميع المشاريع" },

  // Section Testimonials
  "testimonials.tag": { fr: "Retours d'Expérience", en: "Client Trust", ar: "شهادات العملاء" },
  "testimonials.title": { fr: "Ce Que Disent Nos Clients", en: "What Our Clients Say", ar: "ماذا يقول عملاؤنا" },

  // Section Partners
  "partners.title": { fr: "Nos Partenaires Technologiques Mondiaux", en: "Our Global Technology Partners", ar: "شركاؤنا التكنولوجيون العالميون" },

  // Section CTA
  "cta.title": { fr: "Un Projet en Tunisie ou en Afrique ?", en: "Have a Project in Tunisia or Africa?", ar: "هل لديك مشروع في تونس أو في إفريقيا؟" },
  "cta.subtitle": { fr: "Nos ingénieurs étudient votre cahier des charges et vous répondent sous 48h ouvrées avec une proposition chiffrée.", en: "Our engineering team reviews your specifications and provides a tailored quote within 48 business hours.", ar: "فريقنا الهندسي يدرس كراس شروطكم ويوافيكم بعرض أسعار دقيق خلال 48 ساعة عمل." },
  "cta.button": { fr: "Lancer mon devis en ligne", en: "Start Online Quote", ar: "ابدأ طلب عرض الأسعار الآن" },
  "cta.call": { fr: "Appelez notre bureau à Tunis", en: "Call our Tunis Office", ar: "اتصل بمكتبنا في تونس" },

  // Quote Form Steps
  "quote.step1": { fr: "Services requis", en: "Required Services", ar: "الخدمات المطلوبة" },
  "quote.step2": { fr: "Détails du projet", en: "Project Scope", ar: "تفاصيل المشروع" },
  "quote.step3": { fr: "Localisation", en: "Site Location", ar: "موقع المشروع" },
  "quote.step4": { fr: "Vos Coordonnées", en: "Contact Details", ar: "بيانات الاتصال" },
  "quote.step5": { fr: "Pièces Jointes", en: "Attachments", ar: "المرفقات" },
  "quote.success": { fr: "Votre demande de devis a été transmise avec succès !", en: "Your quote request was submitted successfully!", ar: "تم إرسال طلب عرض الأسعار بنجاح!" },

  // Contact Form
  "contact.title": { fr: "Contactez BeTA Engineering", en: "Contact BeTA Engineering", ar: "تواصل مع BeTA Engineering" },
  "contact.name": { fr: "Nom complet", en: "Full Name", ar: "الاسم الكامل" },
  "contact.email": { fr: "Adresse email", en: "Email Address", ar: "البريد الإلكتروني" },
  "contact.phone": { fr: "Téléphone / WhatsApp", en: "Phone / WhatsApp", ar: "الهاتف / واتساب" },
  "contact.subject": { fr: "Sujet de votre message", en: "Subject", ar: "موضوع الرسالة" },
  "contact.message": { fr: "Votre message détaillé", en: "Your Message", ar: "رسالتكم بالتفصيل" },
  "contact.submit": { fr: "Envoyer le message", en: "Send Message", ar: "إرسال الرسالة" },
  "contact.success": { fr: "Message envoyé avec succès. Nous vous répondrons sous 24h.", en: "Message sent successfully. We will reply within 24h.", ar: "تم إرسال رسالتكم بنجاح. سنرد عليكم خلال 24 ساعة." },

  // Footer & Legal
  "footer.rights": { fr: "Tous droits réservés.", en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "footer.legal": { fr: "Mentions Légales", en: "Legal Notice", ar: "إشعار قانوني" },
  "footer.privacy": { fr: "Politique de Confidentialité", en: "Privacy Policy", ar: "سياسة الخصوصية" },
  "footer.terms": { fr: "Conditions Générales", en: "Terms of Service", ar: "الشروط العامة" },
  "cookie.text": { fr: "Ce site utilise des cookies techniques nécessaires à son bon fonctionnement et à la mesure d'audience.", en: "This website uses technical cookies essential for its operation and analytics.", ar: "يستخدم هذا الموقع ملفات تعريف الارتباط التقنية الضرورية لحسن أدائه وقياس التفاعل." },
  "cookie.accept": { fr: "Accepter", en: "Accept", ar: "قبول" },
  "cookie.refuse": { fr: "Refuser", en: "Decline", ar: "رفض" },
};

