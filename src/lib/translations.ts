export type Language = "en" | "ar" | "fr" | "du" | "it";

export type TextDirection = "ltr" | "rtl";

export interface StatTranslation {
  value: string;
  label: string;
}

export interface PresetTranslation {
  id: string;
  name: string;
  description: string;
}

export interface FeatureCardTranslation {
  tag: string;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;
}

export interface PricingTierTranslation {
  name: string;
  description: string;
  priceMonthly: string;
  priceYearly: string;
  period: string;
  features: string[];
  cta: string;
}

export interface FaqItemTranslation {
  question: string;
  answer: string;
}

export interface FooterLinkTranslation {
  label: string;
  href: string;
}

export interface ModalPlatformTranslation {
  id: "mac" | "windows" | "plugin";
  name: string;
  description: string;
}

export interface TranslationDictionary {
  nav: {
    features: string;
    liveDemo: string;
    pricing: string;
    faq: string;
    startFree: string;
  };

  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;

    stats: [
      StatTranslation,
      StatTranslation,
      StatTranslation,
    ];

    resonatorStatus: string;
    audioQuality: string;
    rawModeLabel: string;
    aiModeLabel: string;
    rawTelemetry: string;
    aiTelemetry: string;
    presetsLabel: string;

    presets: [
      PresetTranslation,
      PresetTranslation,
      PresetTranslation,
      PresetTranslation,
    ];
  };

  socialProof: {
    title: string;
  };

  features: {
    badge: string;
    title: string;
    subtitle: string;

    cards: {
      noiseShield: FeatureCardTranslation;
      parametricEq: FeatureCardTranslation;
      spatialMatrix: FeatureCardTranslation;
      kernelDsp: FeatureCardTranslation;
    };
  };

  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    saveBadge: string;
    popularBadge: string;

    tiers: {
      starter: PricingTierTranslation;
      creator: PricingTierTranslation;
      studio: PricingTierTranslation;
    };
  };

  faq: {
    title: string;
    subtitle: string;

    items: [
      FaqItemTranslation,
      FaqItemTranslation,
      FaqItemTranslation,
      FaqItemTranslation,
    ];
  };

  ctaBanner: {
    badge: string;
    title: string;
    subtitle: string;
    button: string;
  };

  footer: {
    description: string;
    statusOperational: string;

    productTitle: string;
    productLinks: FooterLinkTranslation[];

    solutionsTitle: string;
    solutionsLinks: FooterLinkTranslation[];

    resourcesTitle: string;
    resourcesLinks: FooterLinkTranslation[];

    newsletterTitle: string;
    newsletterSubtitle: string;
    emailPlaceholder: string;
    subscribeBtn: string;
    subscribedSuccess: string;

    copyright: string;
    privacy: string;
    terms: string;
    security: string;
  };

  modal: {
    badge: string;
    title: string;
    subtitle: string;
    platformLabel: string;

    platforms: [
      ModalPlatformTranslation,
      ModalPlatformTranslation,
      ModalPlatformTranslation,
    ];

    emailLabel: string;
    emailPlaceholder: string;
    submitBtn: string;

    successTitle: string;
    successSubtitle: string;
    licenseLabel: string;
    copyBtn: string;
    copiedBtn: string;
    downloadBtn: string;
  };
}

export const languages: Language[] = [
  "en",
  "ar",
  "fr",
  "du",
  "it",
];

export const languageLabels: Record<Language, string> = {
  en: "EN",
  ar: "AR",
  fr: "FR",
  du: "DU",
  it: "IT",
};

export const languageNames: Record<Language, string> = {
  en: "English",
  ar: "العربية",
  fr: "Français",
  du: "Nederlands",
  it: "Italiano",
};

export const languageDirections: Record<
  Language,
  TextDirection
> = {
  en: "ltr",
  ar: "rtl",
  fr: "ltr",
  du: "ltr",
  it: "ltr",
};

export const languageHtmlCodes: Record<Language, string> = {
  en: "en",
  ar: "ar",
  fr: "fr",
  du: "nl",
  it: "it",
};

export const translations: Record<
  Language,
  TranslationDictionary
> = {
  en: {
    nav: {
      features: "Features",
      liveDemo: "Live 3D Studio",
      pricing: "Pricing",
      faq: "FAQ",
      startFree: "Start Free",
    },

    hero: {
      badge: "Real-time spatial audio powered by AI",
      titleLine1: "Make every voice",
      titleHighlight: "sound extraordinary.",
      subtitle:
        "Remove noise, restore vocal detail, and place every speaker inside a precise three-dimensional soundstage with studio-grade processing that responds in real time.",
      ctaPrimary: "Launch 3D Studio",
      ctaSecondary: "Listen to A/B Samples",

      stats: [
        {
          value: "0.00%",
          label: "Phase Artifacts",
        },
        {
          value: "6.2 ms",
          label: "Kernel DSP Latency",
        },
        {
          value: "+42 dB",
          label: "Acoustic SNR Gain",
        },
      ],

      resonatorStatus: "3D Ferrofluid Resonator • Active",
      audioQuality: "48 kHz / 24-bit IEEE audio",
      rawModeLabel: "Raw Microphone • Noisy",
      aiModeLabel: "SonicFlow 3D • Clear",
      rawTelemetry:
        "Raw USB microphone • Room echo and clipping detected",
      aiTelemetry:
        "SonicFlow AI enhancement • Spatial processing locked",
      presetsLabel: "DSP Presets",

      presets: [
        {
          id: "podcast",
          name: "Podcast Studio",
          description:
            "Focused speech, controlled proximity, and balanced vocal presence.",
        },
        {
          id: "meeting",
          name: "Echo Nullifier",
          description:
            "Adaptive room correction for calls, meetings, and open spaces.",
        },
        {
          id: "studio",
          name: "Broadcast Warmth",
          description:
            "Rich low-mid character with polished broadcast definition.",
        },
        {
          id: "gaming",
          name: "Esports Comms",
          description:
            "Fast, intelligible team communication with reduced masking.",
        },
      ],
    },

    socialProof: {
      title: "Trusted by creators and modern audio teams",
    },

    features: {
      badge: "Intelligent Audio Infrastructure",
      title: "A complete AI audio studio in your browser",
      subtitle:
        "Clean, shape, isolate, spatialize, and monitor every voice through one precise low-latency workflow.",

      cards: {
        noiseShield: {
          tag: "Neural Protection",
          title: "Real-Time Neural Noise Shield",
          description:
            "Continuously removes keyboard clicks, fans, room echo, and background interference while preserving natural vocal detail.",
          metricLabel: "Noise Floor Attenuation",
          metricValue: "-54.8 dB",
        },

        parametricEq: {
          tag: "Spectral Control",
          title: "Parametric 3D Equalizer",
          description:
            "Shape presence, warmth, air, and intelligibility through an animated sixteen-band harmonic processing engine.",
          metricLabel: "Harmonic Processing",
          metricValue: "16 Bands",
        },

        spatialMatrix: {
          tag: "Stem Intelligence",
          title: "Spatial Stem Matrix",
          description:
            "Separates voice, ambience, and interference into independently controlled spatial tracks without destructive processing.",
          metricLabel: "Stem Isolation",
          metricValue: "3 Lossless Tracks",
        },

        kernelDsp: {
          tag: "Low-Latency Engine",
          title: "Sub-6 ms Kernel DSP",
          description:
            "Processes audio through an optimized real-time pipeline designed for broadcasts, competitive communication, and live production.",
          metricLabel: "Roundtrip Latency",
          metricValue: "4.8 ms",
        },
      },
    },

    pricing: {
      badge: "Simple, Scalable Pricing",
      title: "Studio-quality audio at every stage",
      subtitle:
        "Start free and upgrade when you need longer sessions, advanced spatial processing, or production-ready team controls.",
      monthly: "Monthly",
      yearly: "Yearly",
      saveBadge: "Save 25%",
      popularBadge: "Most Popular • 3D Studio",

      tiers: {
        starter: {
          name: "Starter",
          description:
            "For exploring SonicFlow AI and improving everyday calls.",
          priceMonthly: "$0",
          priceYearly: "$0",
          period: "per month",
          features: [
            "60 processing minutes each month",
            "Core neural noise removal",
            "Two professional DSP presets",
            "Standard stereo output",
            "Community support",
          ],
          cta: "Start Free",
        },

        creator: {
          name: "Pro Creator",
          description:
            "For streamers, podcasters, creators, and competitive players.",
          priceMonthly: "$19",
          priceYearly: "$14",
          period: "per month",
          features: [
            "20 processing hours each month",
            "Advanced AI voice reconstruction",
            "Complete 3D spatial studio",
            "All professional DSP presets",
            "High-resolution audio export",
            "Priority email support",
          ],
          cta: "Start Creator Trial",
        },

        studio: {
          name: "Studio Enterprise",
          description:
            "For production teams requiring collaborative workflows and scale.",
          priceMonthly: "$49",
          priceYearly: "$36",
          period: "per month",
          features: [
            "Unlimited real-time processing",
            "Up to ten workspace members",
            "Shared sessions and presets",
            "Advanced audio routing",
            "API and webhook access",
            "Priority technical support",
          ],
          cta: "Start Studio Trial",
        },
      },
    },

    faq: {
      title: "Technical questions, clearly answered",
      subtitle:
        "Everything you need to know about latency, compatibility, privacy, and real-time audio routing.",

      items: [
        {
          question:
            "How does SonicFlow AI maintain such low processing latency?",
          answer:
            "SonicFlow AI processes audio through small real-time buffers and applies optimized neural inference only where it is needed. Actual latency depends on your device, browser, audio interface, buffer size, and selected processing chain.",
        },
        {
          question:
            "Can I use SonicFlow AI with OBS, Discord, Zoom, or a DAW?",
          answer:
            "Yes. SonicFlow AI is designed for common streaming, communication, and production workflows. Desktop routing may require a virtual audio device, depending on your operating system and destination application.",
        },
        {
          question:
            "Is my voice stored or used to train artificial intelligence models?",
          answer:
            "Real-time processing is session-based. Audio is only retained when you explicitly save or export a recording. Production deployments should document their exact storage, retention, and model-training policies.",
        },
        {
          question:
            "Which browsers, systems, and audio formats are supported?",
          answer:
            "The web studio targets modern Chromium-based browsers with Web Audio and WebGL support. Desktop and plug-in options support professional routing and high-resolution export according to the selected plan.",
        },
      ],
    },

    ctaBanner: {
      badge: "Your voice, rebuilt in real time",
      title: "Hear the difference in your next live broadcast",
      subtitle:
        "Use your current microphone and let SonicFlow AI handle cleanup, enhancement, spatial placement, and monitoring from one intelligent workspace.",
      button: "Start Your Free Trial",
    },

    footer: {
      description:
        "Real-time AI audio enhancement and spatial voice processing for creators, production teams, and modern communication.",
      statusOperational:
        "All clusters operational • 99.98% availability",

      productTitle: "Product",
      productLinks: [
        {
          label: "Features",
          href: "#features",
        },
        {
          label: "Live 3D Studio",
          href: "#playground",
        },
        {
          label: "Pricing",
          href: "#pricing",
        },
        {
          label: "Release Notes",
          href: "#releases",
        },
      ],

      solutionsTitle: "Solutions",
      solutionsLinks: [
        {
          label: "Streaming",
          href: "#features",
        },
        {
          label: "Podcast Production",
          href: "#features",
        },
        {
          label: "Competitive Gaming",
          href: "#features",
        },
        {
          label: "Remote Teams",
          href: "#features",
        },
      ],

      resourcesTitle: "Resources",
      resourcesLinks: [
        {
          label: "Documentation",
          href: "#documentation",
        },
        {
          label: "API Reference",
          href: "#api",
        },
        {
          label: "Audio Guides",
          href: "#guides",
        },
        {
          label: "Technical Support",
          href: "#faq",
        },
      ],

      newsletterTitle: "Intelligence Feed",
      newsletterSubtitle:
        "Receive product signals, DSP research, and SonicFlow release notes.",
      emailPlaceholder: "you@studio.com",
      subscribeBtn: "Subscribe",
      subscribedSuccess: "Subscription confirmed!",

      copyright: "© 2026 SonicFlow AI Inc. All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      security: "Security",
    },

    modal: {
      badge: "SonicFlow Instant Access",
      title: "Build your audio engine",
      subtitle:
        "Choose your platform and generate interactive SonicFlow AI demonstration access.",
      platformLabel: "Select your platform",

      platforms: [
        {
          id: "mac",
          name: "macOS • Apple Silicon",
          description:
            "Native build for Apple M1, M2, M3, and M4 processors.",
        },
        {
          id: "windows",
          name: "Windows 11 • x64",
          description:
            "Desktop engine optimized for low-latency ASIO audio.",
        },
        {
          id: "plugin",
          name: "VST3 / AU DAW Plug-in",
          description:
            "For Ableton Live, Logic Pro, FL Studio, and compatible workstations.",
        },
      ],

      emailLabel: "Access Email",
      emailPlaceholder: "engineer@studio.com",
      submitBtn: "Generate Instant Access",

      successTitle: "Your studio is ready",
      successSubtitle:
        "Your demonstration license and selected platform package have been generated.",
      licenseLabel: "Demonstration License Key",
      copyBtn: "Copy",
      copiedBtn: "Copied",
      downloadBtn: "Download Access File",
    },
  },

  ar: {
    nav: {
      features: "المميزات",
      liveDemo: "الاستوديو ثلاثي الأبعاد",
      pricing: "الأسعار",
      faq: "الأسئلة الشائعة",
      startFree: "ابدأ مجانًا",
    },

    hero: {
      badge: "صوت مكاني لحظي مدعوم بالذكاء الاصطناعي",
      titleLine1: "اجعل كل صوت",
      titleHighlight: "استثنائيًا بكل تفاصيله.",
      subtitle:
        "أزل الضوضاء، واستعد تفاصيل الصوت، وضع كل متحدث داخل مساحة صوتية ثلاثية الأبعاد دقيقة، من خلال معالجة احترافية تستجيب لحظيًا.",
      ctaPrimary: "شغّل الاستوديو ثلاثي الأبعاد",
      ctaSecondary: "استمع إلى المقارنة الصوتية",

      stats: [
        {
          value: "0.00%",
          label: "تشوهات الطور",
        },
        {
          value: "6.2 مللي ثانية",
          label: "زمن معالجة النواة",
        },
        {
          value: "+42 ديسيبل",
          label: "تحسن نسبة الإشارة إلى الضوضاء",
        },
      ],

      resonatorStatus:
        "مرنان الفيروفلويد ثلاثي الأبعاد • نشط",
      audioQuality:
        "صوت بدقة 48 كيلوهرتز / 24 بت وفق معيار IEEE",
      rawModeLabel: "الميكروفون الخام • ضوضاء",
      aiModeLabel: "SonicFlow ثلاثي الأبعاد • نقي",
      rawTelemetry:
        "ميكروفون USB خام • تم اكتشاف صدى وتشبع صوتي",
      aiTelemetry:
        "تحسين SonicFlow الذكي • المعالجة المكانية مستقرة",
      presetsLabel: "إعدادات معالجة الصوت",

      presets: [
        {
          id: "podcast",
          name: "استوديو البودكاست",
          description:
            "صوت مركّز وقرب مضبوط وحضور متوازن للكلام.",
        },
        {
          id: "meeting",
          name: "إلغاء الصدى",
          description:
            "تصحيح تكيفي لصدى الغرف في المكالمات والاجتماعات والمساحات المفتوحة.",
        },
        {
          id: "studio",
          name: "دفء البث الاحترافي",
          description:
            "طبقات منخفضة ومتوسطة غنية مع وضوح مصقول يناسب البث.",
        },
        {
          id: "gaming",
          name: "اتصالات الرياضات الإلكترونية",
          description:
            "تواصل جماعي سريع وواضح مع تقليل تداخل الأصوات.",
        },
      ],
    },

    socialProof: {
      title:
        "موثوق به لدى صناع المحتوى وفرق الصوت الحديثة",
    },

    features: {
      badge: "بنية صوتية ذكية",
      title:
        "استوديو صوت متكامل بالذكاء الاصطناعي داخل متصفحك",
      subtitle:
        "نظّف الصوت، وشكّله، واعزل مصادره، ووزّعه مكانيًا، وراقب كل متحدث عبر سير عمل دقيق منخفض التأخير.",

      cards: {
        noiseShield: {
          tag: "حماية عصبية",
          title: "درع عصبي لحظي لإزالة الضوضاء",
          description:
            "يزيل أصوات لوحة المفاتيح والمراوح وصدى الغرفة والتشويش الخلفي باستمرار، مع الحفاظ على التفاصيل الطبيعية للصوت.",
          metricLabel: "خفض مستوى الضوضاء",
          metricValue: "-54.8 ديسيبل",
        },

        parametricEq: {
          tag: "تحكم طيفي",
          title: "معادل صوتي بارامتري ثلاثي الأبعاد",
          description:
            "تحكم في الحضور والدفء والهواء ووضوح الكلام من خلال محرك معالجة توافقي متحرك مكوّن من ستة عشر نطاقًا.",
          metricLabel: "المعالجة التوافقية",
          metricValue: "16 نطاقًا",
        },

        spatialMatrix: {
          tag: "ذكاء فصل المسارات",
          title: "مصفوفة مكانية لفصل المسارات",
          description:
            "تفصل الصوت البشري والأجواء والتشويش إلى مسارات مكانية مستقلة يمكن التحكم فيها دون معالجة مدمرة.",
          metricLabel: "عزل المسارات",
          metricValue: "3 مسارات دون فقد",
        },

        kernelDsp: {
          tag: "محرك منخفض التأخير",
          title: "معالجة نواة بأقل من 6 مللي ثانية",
          description:
            "يعالج الصوت عبر مسار لحظي محسّن للبث والتواصل التنافسي والإنتاج المباشر.",
          metricLabel: "زمن الذهاب والعودة",
          metricValue: "4.8 مللي ثانية",
        },
      },
    },

    pricing: {
      badge: "أسعار واضحة وقابلة للتوسع",
      title: "جودة استوديو تناسب كل مرحلة",
      subtitle:
        "ابدأ مجانًا، ثم قم بالترقية عندما تحتاج إلى جلسات أطول أو معالجة مكانية متقدمة أو أدوات إنتاج احترافية للفريق.",
      monthly: "شهري",
      yearly: "سنوي",
      saveBadge: "وفّر 25%",
      popularBadge:
        "الأكثر اختيارًا • الاستوديو ثلاثي الأبعاد",

      tiers: {
        starter: {
          name: "البداية",
          description:
            "لاستكشاف SonicFlow AI وتحسين المكالمات اليومية.",
          priceMonthly: "$0",
          priceYearly: "$0",
          period: "شهريًا",
          features: [
            "60 دقيقة معالجة كل شهر",
            "إزالة عصبية أساسية للضوضاء",
            "إعدادان احترافيان لمعالجة الصوت",
            "إخراج ستيريو قياسي",
            "دعم عبر المجتمع",
          ],
          cta: "ابدأ مجانًا",
        },

        creator: {
          name: "صانع المحتوى المحترف",
          description:
            "لمقدمي البث ومنتجي البودكاست وصناع المحتوى واللاعبين التنافسيين.",
          priceMonthly: "$19",
          priceYearly: "$14",
          period: "شهريًا",
          features: [
            "20 ساعة معالجة كل شهر",
            "إعادة بناء متقدمة للصوت بالذكاء الاصطناعي",
            "استوديو مكاني ثلاثي الأبعاد متكامل",
            "جميع إعدادات المعالجة الاحترافية",
            "تصدير صوت عالي الدقة",
            "دعم أولوية عبر البريد الإلكتروني",
          ],
          cta: "ابدأ تجربة صانع المحتوى",
        },

        studio: {
          name: "استوديو المؤسسات",
          description:
            "لفرق الإنتاج التي تحتاج إلى التعاون والتوسع وإدارة سير العمل.",
          priceMonthly: "$49",
          priceYearly: "$36",
          period: "شهريًا",
          features: [
            "معالجة لحظية غير محدودة",
            "حتى عشرة أعضاء في مساحة العمل",
            "جلسات وإعدادات مشتركة",
            "توجيه صوتي متقدم",
            "الوصول إلى الواجهة البرمجية وخطافات الويب",
            "دعم تقني بأولوية",
          ],
          cta: "ابدأ تجربة الاستوديو",
        },
      },
    },

    faq: {
      title: "إجابات واضحة عن الأسئلة التقنية",
      subtitle:
        "كل ما تحتاج إلى معرفته عن زمن التأخير والتوافق والخصوصية وتوجيه الصوت في الوقت الفعلي.",

      items: [
        {
          question:
            "كيف يحافظ SonicFlow AI على زمن معالجة منخفض؟",
          answer:
            "يعالج SonicFlow AI الصوت داخل حزم لحظية صغيرة، ويطبّق استدلالًا عصبيًا محسّنًا عند الحاجة فقط. يعتمد زمن التأخير الفعلي على جهازك ومتصفحك وواجهة الصوت وحجم المخزن المؤقت وسلسلة المعالجة المختارة.",
        },
        {
          question:
            "هل يمكنني استخدام SonicFlow AI مع OBS أو Discord أو Zoom أو برامج الإنتاج الصوتي؟",
          answer:
            "نعم. صُمم SonicFlow AI للعمل مع أنظمة البث والتواصل والإنتاج الشائعة. قد يحتاج توجيه الصوت على سطح المكتب إلى جهاز صوت افتراضي وفقًا لنظام التشغيل والتطبيق المستهدف.",
        },
        {
          question:
            "هل يتم تخزين صوتي أو استخدامه لتدريب نماذج الذكاء الاصطناعي؟",
          answer:
            "تعتمد المعالجة اللحظية على الجلسة. لا يتم الاحتفاظ بالصوت إلا عندما تختار صراحةً حفظ تسجيل أو تصديره. ويجب أن توضح بيئة الإنتاج الفعلية سياسات التخزين والاحتفاظ والتدريب بدقة.",
        },
        {
          question:
            "ما المتصفحات والأنظمة وصيغ الصوت المدعومة؟",
          answer:
            "يستهدف الاستوديو متصفحات Chromium الحديثة التي تدعم Web Audio وWebGL. وتدعم إصدارات سطح المكتب والإضافات التوجيه الاحترافي والتصدير عالي الدقة وفقًا للخطة المختارة.",
        },
      ],
    },

    ctaBanner: {
      badge: "إعادة بناء صوتك لحظيًا",
      title: "اسمع الفرق في بثك المباشر القادم",
      subtitle:
        "استخدم ميكروفونك الحالي، ودع SonicFlow AI يتولى التنقية والتحسين والتوزيع المكاني والمراقبة من مساحة عمل ذكية واحدة.",
      button: "ابدأ تجربتك المجانية",
    },

    footer: {
      description:
        "تحسين صوتي لحظي بالذكاء الاصطناعي ومعالجة مكانية للأصوات لصناع المحتوى وفرق الإنتاج ووسائل التواصل الحديثة.",
      statusOperational:
        "جميع العناقيد تعمل بكفاءة • توافر بنسبة 99.98%",

      productTitle: "المنتج",
      productLinks: [
        {
          label: "المميزات",
          href: "#features",
        },
        {
          label: "الاستوديو ثلاثي الأبعاد",
          href: "#playground",
        },
        {
          label: "الأسعار",
          href: "#pricing",
        },
        {
          label: "ملاحظات الإصدارات",
          href: "#releases",
        },
      ],

      solutionsTitle: "الحلول",
      solutionsLinks: [
        {
          label: "البث المباشر",
          href: "#features",
        },
        {
          label: "إنتاج البودكاست",
          href: "#features",
        },
        {
          label: "الألعاب التنافسية",
          href: "#features",
        },
        {
          label: "فرق العمل عن بُعد",
          href: "#features",
        },
      ],

      resourcesTitle: "المصادر",
      resourcesLinks: [
        {
          label: "التوثيق",
          href: "#documentation",
        },
        {
          label: "مرجع الواجهة البرمجية",
          href: "#api",
        },
        {
          label: "أدلة الصوت",
          href: "#guides",
        },
        {
          label: "الدعم التقني",
          href: "#faq",
        },
      ],

      newsletterTitle: "النشرة الذكية",
      newsletterSubtitle:
        "استقبل أخبار المنتج وأبحاث معالجة الصوت وملاحظات إصدارات SonicFlow.",
      emailPlaceholder: "بريدك@الاستوديو.com",
      subscribeBtn: "اشترك",
      subscribedSuccess: "تم تأكيد الاشتراك!",

      copyright:
        "© 2026 SonicFlow AI Inc. جميع الحقوق محفوظة.",
      privacy: "الخصوصية",
      terms: "الشروط",
      security: "الأمان",
    },

    modal: {
      badge: "وصول فوري إلى SonicFlow",
      title: "أنشئ محركك الصوتي",
      subtitle:
        "اختر منصتك وأنشئ وصولًا تفاعليًا لتجربة SonicFlow AI.",
      platformLabel: "اختر منصتك",

      platforms: [
        {
          id: "mac",
          name: "macOS • معالجات Apple Silicon",
          description:
            "إصدار أصلي لمعالجات Apple M1 وM2 وM3 وM4.",
        },
        {
          id: "windows",
          name: "Windows 11 • بنية x64",
          description:
            "محرك سطح مكتب محسّن لمعالجة ASIO منخفضة التأخير.",
        },
        {
          id: "plugin",
          name: "إضافة VST3 / AU لمحطات الصوت",
          description:
            "متوافقة مع Ableton Live وLogic Pro وFL Studio ومحطات العمل المدعومة.",
        },
      ],

      emailLabel: "البريد الإلكتروني للوصول",
      emailPlaceholder: "engineer@studio.com",
      submitBtn: "أنشئ وصولًا فوريًا",

      successTitle: "الاستوديو جاهز",
      successSubtitle:
        "تم إنشاء ترخيص العرض وحزمة المنصة التي اخترتها.",
      licenseLabel: "مفتاح ترخيص العرض",
      copyBtn: "نسخ",
      copiedBtn: "تم النسخ",
      downloadBtn: "تنزيل ملف الوصول",
    },
  },

  fr: {
    nav: {
      features: "Fonctionnalités",
      liveDemo: "Studio 3D en direct",
      pricing: "Tarifs",
      faq: "FAQ",
      startFree: "Commencer gratuitement",
    },

    hero: {
      badge:
        "Audio spatial en temps réel propulsé par l’intelligence artificielle",
      titleLine1: "Donnez à chaque voix",
      titleHighlight: "une présence exceptionnelle.",
      subtitle:
        "Supprimez le bruit, restaurez les détails vocaux et placez chaque intervenant dans une scène sonore tridimensionnelle précise grâce à un traitement professionnel en temps réel.",
      ctaPrimary: "Lancer le Studio 3D",
      ctaSecondary: "Écouter la comparaison A/B",

      stats: [
        {
          value: "0,00 %",
          label: "Artefacts de phase",
        },
        {
          value: "6,2 ms",
          label: "Latence du moteur DSP",
        },
        {
          value: "+42 dB",
          label: "Gain du rapport signal-bruit",
        },
      ],

      resonatorStatus:
        "Résonateur ferrofluide 3D • Actif",
      audioQuality:
        "Audio IEEE 48 kHz / 24 bits",
      rawModeLabel: "Microphone brut • Bruité",
      aiModeLabel: "SonicFlow 3D • Clair",
      rawTelemetry:
        "Microphone USB brut • Écho et saturation détectés",
      aiTelemetry:
        "Amélioration SonicFlow • Traitement spatial verrouillé",
      presetsLabel: "Préréglages DSP",

      presets: [
        {
          id: "podcast",
          name: "Studio Podcast",
          description:
            "Parole ciblée, proximité maîtrisée et présence vocale équilibrée.",
        },
        {
          id: "meeting",
          name: "Suppression de l’écho",
          description:
            "Correction adaptative de la pièce pour les appels, réunions et espaces ouverts.",
        },
        {
          id: "studio",
          name: "Chaleur de diffusion",
          description:
            "Médiums graves riches et définition soignée pour la diffusion professionnelle.",
        },
        {
          id: "gaming",
          name: "Communications esport",
          description:
            "Communication d’équipe rapide et intelligible avec moins de masquage sonore.",
        },
      ],
    },

    socialProof: {
      title:
        "Adopté par les créateurs et les équipes audio modernes",
    },

    features: {
      badge: "Infrastructure audio intelligente",
      title:
        "Un studio audio IA complet dans votre navigateur",
      subtitle:
        "Nettoyez, façonnez, isolez, spatialisez et contrôlez chaque voix dans un flux de travail précis à faible latence.",

      cards: {
        noiseShield: {
          tag: "Protection neuronale",
          title:
            "Bouclier neuronal antibruit en temps réel",
          description:
            "Supprime en continu les clics de clavier, les ventilateurs, l’écho de la pièce et les interférences tout en préservant les détails naturels de la voix.",
          metricLabel: "Atténuation du bruit de fond",
          metricValue: "-54,8 dB",
        },

        parametricEq: {
          tag: "Contrôle spectral",
          title: "Égaliseur paramétrique 3D",
          description:
            "Modelez la présence, la chaleur, l’air et l’intelligibilité grâce à un moteur harmonique animé à seize bandes.",
          metricLabel: "Traitement harmonique",
          metricValue: "16 bandes",
        },

        spatialMatrix: {
          tag: "Intelligence des pistes",
          title: "Matrice spatiale des pistes",
          description:
            "Sépare la voix, l’ambiance et les interférences en pistes spatiales indépendantes, sans traitement destructif.",
          metricLabel: "Isolation des pistes",
          metricValue: "3 pistes sans perte",
        },

        kernelDsp: {
          tag: "Moteur à faible latence",
          title: "Moteur DSP inférieur à 6 ms",
          description:
            "Traite l’audio dans une chaîne optimisée en temps réel pour la diffusion, les communications compétitives et la production en direct.",
          metricLabel: "Latence aller-retour",
          metricValue: "4,8 ms",
        },
      },
    },

    pricing: {
      badge: "Tarification simple et évolutive",
      title: "Un son de qualité studio à chaque étape",
      subtitle:
        "Commencez gratuitement, puis évoluez lorsque vous avez besoin de sessions plus longues, d’un traitement spatial avancé ou d’outils de production en équipe.",
      monthly: "Mensuel",
      yearly: "Annuel",
      saveBadge: "Économisez 25 %",
      popularBadge: "Le plus choisi • Studio 3D",

      tiers: {
        starter: {
          name: "Découverte",
          description:
            "Pour découvrir SonicFlow AI et améliorer les appels quotidiens.",
          priceMonthly: "0 $",
          priceYearly: "0 $",
          period: "par mois",
          features: [
            "60 minutes de traitement par mois",
            "Suppression neuronale essentielle du bruit",
            "Deux préréglages DSP professionnels",
            "Sortie stéréo standard",
            "Assistance communautaire",
          ],
          cta: "Commencer gratuitement",
        },

        creator: {
          name: "Créateur Pro",
          description:
            "Pour les diffuseurs, podcasteurs, créateurs et joueurs compétitifs.",
          priceMonthly: "19 $",
          priceYearly: "14 $",
          period: "par mois",
          features: [
            "20 heures de traitement par mois",
            "Reconstruction vocale avancée par IA",
            "Studio spatial 3D complet",
            "Tous les préréglages DSP professionnels",
            "Export audio haute résolution",
            "Assistance prioritaire par courriel",
          ],
          cta: "Essayer Créateur Pro",
        },

        studio: {
          name: "Studio Entreprise",
          description:
            "Pour les équipes de production qui exigent collaboration et évolutivité.",
          priceMonthly: "49 $",
          priceYearly: "36 $",
          period: "par mois",
          features: [
            "Traitement en temps réel illimité",
            "Jusqu’à dix membres par espace",
            "Sessions et préréglages partagés",
            "Routage audio avancé",
            "Accès à l’API et aux webhooks",
            "Assistance technique prioritaire",
          ],
          cta: "Essayer Studio",
        },
      },
    },

    faq: {
      title: "Des réponses claires à vos questions techniques",
      subtitle:
        "Tout ce qu’il faut savoir sur la latence, la compatibilité, la confidentialité et le routage audio en temps réel.",

      items: [
        {
          question:
            "Comment SonicFlow AI conserve-t-il une latence aussi faible ?",
          answer:
            "SonicFlow AI traite l’audio dans de petites mémoires tampons en temps réel et n’applique l’inférence neuronale optimisée que lorsque cela est nécessaire. La latence réelle dépend de l’appareil, du navigateur, de l’interface audio, de la taille du tampon et de la chaîne de traitement.",
        },
        {
          question:
            "Puis-je utiliser SonicFlow AI avec OBS, Discord, Zoom ou une station audionumérique ?",
          answer:
            "Oui. SonicFlow AI est conçu pour les flux courants de diffusion, de communication et de production. Le routage sur ordinateur peut nécessiter un périphérique audio virtuel selon le système d’exploitation et l’application cible.",
        },
        {
          question:
            "Ma voix est-elle conservée ou utilisée pour entraîner des modèles d’intelligence artificielle ?",
          answer:
            "Le traitement en temps réel fonctionne par session. L’audio n’est conservé que lorsque vous choisissez explicitement d’enregistrer ou d’exporter un fichier. Chaque déploiement doit préciser ses politiques de stockage, de conservation et d’entraînement.",
        },
        {
          question:
            "Quels navigateurs, systèmes et formats audio sont pris en charge ?",
          answer:
            "Le studio web cible les navigateurs modernes basés sur Chromium avec prise en charge de Web Audio et WebGL. Les versions de bureau et les modules prennent en charge le routage professionnel et l’export haute résolution selon l’offre choisie.",
        },
      ],
    },

    ctaBanner: {
      badge: "Votre voix, reconstruite en temps réel",
      title:
        "Entendez la différence lors de votre prochaine diffusion",
      subtitle:
        "Utilisez votre microphone actuel et laissez SonicFlow AI gérer le nettoyage, l’amélioration, le placement spatial et le contrôle depuis un espace intelligent unique.",
      button: "Démarrer l’essai gratuit",
    },

    footer: {
      description:
        "Amélioration audio en temps réel par IA et traitement spatial de la voix pour les créateurs, les équipes de production et la communication moderne.",
      statusOperational:
        "Tous les groupes sont opérationnels • Disponibilité de 99,98 %",

      productTitle: "Produit",
      productLinks: [
        {
          label: "Fonctionnalités",
          href: "#features",
        },
        {
          label: "Studio 3D en direct",
          href: "#playground",
        },
        {
          label: "Tarifs",
          href: "#pricing",
        },
        {
          label: "Notes de version",
          href: "#releases",
        },
      ],

      solutionsTitle: "Solutions",
      solutionsLinks: [
        {
          label: "Diffusion en direct",
          href: "#features",
        },
        {
          label: "Production de podcasts",
          href: "#features",
        },
        {
          label: "Jeu compétitif",
          href: "#features",
        },
        {
          label: "Équipes à distance",
          href: "#features",
        },
      ],

      resourcesTitle: "Ressources",
      resourcesLinks: [
        {
          label: "Documentation",
          href: "#documentation",
        },
        {
          label: "Référence de l’API",
          href: "#api",
        },
        {
          label: "Guides audio",
          href: "#guides",
        },
        {
          label: "Assistance technique",
          href: "#faq",
        },
      ],

      newsletterTitle: "Fil d’intelligence",
      newsletterSubtitle:
        "Recevez les actualités du produit, les recherches DSP et les notes de version SonicFlow.",
      emailPlaceholder: "vous@studio.fr",
      subscribeBtn: "S’abonner",
      subscribedSuccess: "Abonnement confirmé !",

      copyright:
        "© 2026 SonicFlow AI Inc. Tous droits réservés.",
      privacy: "Confidentialité",
      terms: "Conditions",
      security: "Sécurité",
    },

    modal: {
      badge: "Accès instantané SonicFlow",
      title: "Créez votre moteur audio",
      subtitle:
        "Choisissez votre plateforme et générez un accès interactif à la démonstration SonicFlow AI.",
      platformLabel: "Choisissez votre plateforme",

      platforms: [
        {
          id: "mac",
          name: "macOS • Apple Silicon",
          description:
            "Version native pour les processeurs Apple M1, M2, M3 et M4.",
        },
        {
          id: "windows",
          name: "Windows 11 • x64",
          description:
            "Moteur de bureau optimisé pour l’audio ASIO à faible latence.",
        },
        {
          id: "plugin",
          name: "Module VST3 / AU pour station audio",
          description:
            "Compatible avec Ableton Live, Logic Pro, FL Studio et les stations prises en charge.",
        },
      ],

      emailLabel: "Adresse d’accès",
      emailPlaceholder: "ingenieur@studio.fr",
      submitBtn: "Générer l’accès instantané",

      successTitle: "Votre studio est prêt",
      successSubtitle:
        "Votre licence de démonstration et le paquet de la plateforme choisie ont été générés.",
      licenseLabel: "Clé de licence de démonstration",
      copyBtn: "Copier",
      copiedBtn: "Copiée",
      downloadBtn: "Télécharger le fichier d’accès",
    },
  },

  du: {
    nav: {
      features: "Functies",
      liveDemo: "Live 3D-studio",
      pricing: "Prijzen",
      faq: "Veelgestelde vragen",
      startFree: "Gratis beginnen",
    },

    hero: {
      badge:
        "Realtime ruimtelijke audio, aangedreven door kunstmatige intelligentie",
      titleLine1: "Laat elke stem",
      titleHighlight: "buitengewoon klinken.",
      subtitle:
        "Verwijder ruis, herstel stemdetails en plaats iedere spreker in een nauwkeurig driedimensionaal geluidsveld met professionele verwerking die direct reageert.",
      ctaPrimary: "Open de 3D-studio",
      ctaSecondary: "Beluister de A/B-vergelijking",

      stats: [
        {
          value: "0,00%",
          label: "Faseartefacten",
        },
        {
          value: "6,2 ms",
          label: "DSP-kernlatentie",
        },
        {
          value: "+42 dB",
          label: "Verbetering signaal-ruisverhouding",
        },
      ],

      resonatorStatus:
        "3D-ferrofluïderesonator • Actief",
      audioQuality:
        "IEEE-audio van 48 kHz / 24 bits",
      rawModeLabel: "Ruwe microfoon • Ruis",
      aiModeLabel: "SonicFlow 3D • Helder",
      rawTelemetry:
        "Ruwe USB-microfoon • Kamerecho en oversturing gedetecteerd",
      aiTelemetry:
        "SonicFlow-verbetering • Ruimtelijke verwerking vergrendeld",
      presetsLabel: "DSP-voorinstellingen",

      presets: [
        {
          id: "podcast",
          name: "Podcaststudio",
          description:
            "Gerichte spraak, beheerste nabijheid en een evenwichtige stemaanwezigheid.",
        },
        {
          id: "meeting",
          name: "Echo-onderdrukking",
          description:
            "Adaptieve ruimtecorrectie voor gesprekken, vergaderingen en open werkplekken.",
        },
        {
          id: "studio",
          name: "Warme uitzendklank",
          description:
            "Rijke lage middentonen met een verzorgde definitie voor professionele uitzendingen.",
        },
        {
          id: "gaming",
          name: "Esportcommunicatie",
          description:
            "Snelle en verstaanbare teamcommunicatie met minder geluidsmaskering.",
        },
      ],
    },

    socialProof: {
      title:
        "Vertrouwd door makers en moderne audioteams",
    },

    features: {
      badge: "Intelligente audio-infrastructuur",
      title: "Een complete AI-audiostudio in je browser",
      subtitle:
        "Reinig, vorm, isoleer, spatialiseer en bewaak iedere stem in één nauwkeurige workflow met lage latentie.",

      cards: {
        noiseShield: {
          tag: "Neurale bescherming",
          title: "Realtime neuraal ruisschild",
          description:
            "Verwijdert voortdurend toetsenbordgeluiden, ventilatoren, kamerecho en achtergrondstoringen zonder natuurlijke stemdetails aan te tasten.",
          metricLabel: "Demping van de ruisvloer",
          metricValue: "-54,8 dB",
        },

        parametricEq: {
          tag: "Spectrale controle",
          title: "Parametrische 3D-equalizer",
          description:
            "Vorm aanwezigheid, warmte, lucht en verstaanbaarheid met een geanimeerde harmonische processor met zestien banden.",
          metricLabel: "Harmonische verwerking",
          metricValue: "16 banden",
        },

        spatialMatrix: {
          tag: "Intelligente spoorisolatie",
          title: "Ruimtelijke spoormatrix",
          description:
            "Scheidt stem, omgevingsgeluid en storing in afzonderlijk regelbare ruimtelijke sporen zonder destructieve verwerking.",
          metricLabel: "Spoorisolatie",
          metricValue: "3 verliesvrije sporen",
        },

        kernelDsp: {
          tag: "Motor met lage latentie",
          title: "DSP-kern onder 6 ms",
          description:
            "Verwerkt audio via een geoptimaliseerde realtimeketen voor uitzendingen, competitieve communicatie en liveproductie.",
          metricLabel: "Totale retourlatentie",
          metricValue: "4,8 ms",
        },
      },
    },

    pricing: {
      badge: "Eenvoudige en schaalbare prijzen",
      title: "Studiokwaliteit voor iedere fase",
      subtitle:
        "Begin gratis en schaal op wanneer je langere sessies, geavanceerde ruimtelijke verwerking of professionele teamfuncties nodig hebt.",
      monthly: "Maandelijks",
      yearly: "Jaarlijks",
      saveBadge: "Bespaar 25%",
      popularBadge: "Meest gekozen • 3D-studio",

      tiers: {
        starter: {
          name: "Starter",
          description:
            "Om SonicFlow AI te ontdekken en dagelijkse gesprekken te verbeteren.",
          priceMonthly: "$0",
          priceYearly: "$0",
          period: "per maand",
          features: [
            "60 verwerkingsminuten per maand",
            "Essentiële neurale ruisverwijdering",
            "Twee professionele DSP-voorinstellingen",
            "Standaard stereo-uitvoer",
            "Ondersteuning door de gemeenschap",
          ],
          cta: "Gratis beginnen",
        },

        creator: {
          name: "Professionele maker",
          description:
            "Voor streamers, podcasters, makers en competitieve spelers.",
          priceMonthly: "$19",
          priceYearly: "$14",
          period: "per maand",
          features: [
            "20 verwerkingsuren per maand",
            "Geavanceerde AI-stemreconstructie",
            "Volledige ruimtelijke 3D-studio",
            "Alle professionele DSP-voorinstellingen",
            "Audio-export in hoge resolutie",
            "Voorrang bij ondersteuning per e-mail",
          ],
          cta: "Probeer Professionele maker",
        },

        studio: {
          name: "Studio voor organisaties",
          description:
            "Voor productieteams die samenwerking, beheer en schaalbaarheid nodig hebben.",
          priceMonthly: "$49",
          priceYearly: "$36",
          period: "per maand",
          features: [
            "Onbeperkte realtime verwerking",
            "Maximaal tien werkruimteleden",
            "Gedeelde sessies en voorinstellingen",
            "Geavanceerde audioroutering",
            "Toegang tot API en webhooks",
            "Technische ondersteuning met voorrang",
          ],
          cta: "Probeer Studio",
        },
      },
    },

    faq: {
      title: "Duidelijke antwoorden op technische vragen",
      subtitle:
        "Alles wat je moet weten over latentie, compatibiliteit, privacy en realtime audioroutering.",

      items: [
        {
          question:
            "Hoe houdt SonicFlow AI de verwerkingslatentie zo laag?",
          answer:
            "SonicFlow AI verwerkt audio in kleine realtimebuffers en past geoptimaliseerde neurale inferentie alleen toe waar dat nodig is. De werkelijke latentie hangt af van het apparaat, de browser, de audio-interface, de buffergrootte en de gekozen verwerkingsketen.",
        },
        {
          question:
            "Kan ik SonicFlow AI gebruiken met OBS, Discord, Zoom of een digitaal audiowerkstation?",
          answer:
            "Ja. SonicFlow AI is ontworpen voor gangbare workflows voor streaming, communicatie en productie. Voor routering op een computer kan een virtueel audioapparaat nodig zijn, afhankelijk van het besturingssysteem en de doeltoepassing.",
        },
        {
          question:
            "Wordt mijn stem opgeslagen of gebruikt om modellen voor kunstmatige intelligentie te trainen?",
          answer:
            "Realtime verwerking is sessiegebonden. Audio wordt alleen bewaard wanneer je bewust een opname opslaat of exporteert. Iedere productieomgeving moet het opslag-, bewaar- en trainingsbeleid nauwkeurig beschrijven.",
        },
        {
          question:
            "Welke browsers, systemen en audioformaten worden ondersteund?",
          answer:
            "De webstudio is gericht op moderne Chromium-browsers met ondersteuning voor Web Audio en WebGL. Desktopversies en invoegtoepassingen ondersteunen professionele routering en export in hoge resolutie volgens het gekozen abonnement.",
        },
      ],
    },

    ctaBanner: {
      badge: "Je stem, realtime opnieuw opgebouwd",
      title:
        "Hoor het verschil tijdens je volgende live-uitzending",
      subtitle:
        "Gebruik je huidige microfoon en laat SonicFlow AI reiniging, verbetering, ruimtelijke plaatsing en bewaking verzorgen vanuit één intelligente werkruimte.",
      button: "Start je gratis proefperiode",
    },

    footer: {
      description:
        "Realtime AI-audioverbetering en ruimtelijke stemverwerking voor makers, productieteams en moderne communicatie.",
      statusOperational:
        "Alle clusters zijn operationeel • 99,98% beschikbaarheid",

      productTitle: "Product",
      productLinks: [
        {
          label: "Functies",
          href: "#features",
        },
        {
          label: "Live 3D-studio",
          href: "#playground",
        },
        {
          label: "Prijzen",
          href: "#pricing",
        },
        {
          label: "Versie-informatie",
          href: "#releases",
        },
      ],

      solutionsTitle: "Oplossingen",
      solutionsLinks: [
        {
          label: "Livestreaming",
          href: "#features",
        },
        {
          label: "Podcastproductie",
          href: "#features",
        },
        {
          label: "Competitief gamen",
          href: "#features",
        },
        {
          label: "Teams op afstand",
          href: "#features",
        },
      ],

      resourcesTitle: "Hulpbronnen",
      resourcesLinks: [
        {
          label: "Documentatie",
          href: "#documentation",
        },
        {
          label: "API-naslag",
          href: "#api",
        },
        {
          label: "Audiogidsen",
          href: "#guides",
        },
        {
          label: "Technische ondersteuning",
          href: "#faq",
        },
      ],

      newsletterTitle: "Intelligentienieuws",
      newsletterSubtitle:
        "Ontvang productnieuws, DSP-onderzoek en SonicFlow-versie-informatie.",
      emailPlaceholder: "jij@studio.nl",
      subscribeBtn: "Abonneren",
      subscribedSuccess: "Abonnement bevestigd!",

      copyright:
        "© 2026 SonicFlow AI Inc. Alle rechten voorbehouden.",
      privacy: "Privacy",
      terms: "Voorwaarden",
      security: "Beveiliging",
    },

    modal: {
      badge: "Directe toegang tot SonicFlow",
      title: "Bouw je audiomotor",
      subtitle:
        "Kies je platform en genereer interactieve toegang tot de SonicFlow AI-demonstratie.",
      platformLabel: "Kies je platform",

      platforms: [
        {
          id: "mac",
          name: "macOS • Apple Silicon",
          description:
            "Systeemeigen versie voor Apple M1-, M2-, M3- en M4-processoren.",
        },
        {
          id: "windows",
          name: "Windows 11 • x64",
          description:
            "Desktopmotor geoptimaliseerd voor ASIO-audio met lage latentie.",
        },
        {
          id: "plugin",
          name: "VST3 / AU-invoegtoepassing",
          description:
            "Voor Ableton Live, Logic Pro, FL Studio en ondersteunde audiowerkstations.",
        },
      ],

      emailLabel: "E-mailadres voor toegang",
      emailPlaceholder: "technicus@studio.nl",
      submitBtn: "Directe toegang genereren",

      successTitle: "Je studio is klaar",
      successSubtitle:
        "Je demonstratielicentie en het pakket voor het gekozen platform zijn gegenereerd.",
      licenseLabel: "Demonstratielicentiecode",
      copyBtn: "Kopiëren",
      copiedBtn: "Gekopieerd",
      downloadBtn: "Toegangsbestand downloaden",
    },
  },

  it: {
    nav: {
      features: "Funzionalità",
      liveDemo: "Studio 3D dal vivo",
      pricing: "Prezzi",
      faq: "Domande frequenti",
      startFree: "Inizia gratis",
    },

    hero: {
      badge:
        "Audio spaziale in tempo reale potenziato dall’intelligenza artificiale",
      titleLine1: "Rendi ogni voce",
      titleHighlight: "davvero straordinaria.",
      subtitle:
        "Elimina il rumore, recupera i dettagli vocali e posiziona ogni interlocutore in uno spazio sonoro tridimensionale preciso, con elaborazione professionale in tempo reale.",
      ctaPrimary: "Avvia lo Studio 3D",
      ctaSecondary: "Ascolta il confronto A/B",

      stats: [
        {
          value: "0,00%",
          label: "Artefatti di fase",
        },
        {
          value: "6,2 ms",
          label: "Latenza del nucleo DSP",
        },
        {
          value: "+42 dB",
          label: "Guadagno del rapporto segnale-rumore",
        },
      ],

      resonatorStatus:
        "Risonatore ferrofluido 3D • Attivo",
      audioQuality:
        "Audio IEEE a 48 kHz / 24 bit",
      rawModeLabel: "Microfono grezzo • Rumoroso",
      aiModeLabel: "SonicFlow 3D • Nitido",
      rawTelemetry:
        "Microfono USB grezzo • Rilevati eco e saturazione",
      aiTelemetry:
        "Miglioramento SonicFlow • Elaborazione spaziale stabile",
      presetsLabel: "Preimpostazioni DSP",

      presets: [
        {
          id: "podcast",
          name: "Studio Podcast",
          description:
            "Voce focalizzata, prossimità controllata e presenza vocale equilibrata.",
        },
        {
          id: "meeting",
          name: "Eliminazione dell’eco",
          description:
            "Correzione adattiva dell’ambiente per chiamate, riunioni e spazi aperti.",
        },
        {
          id: "studio",
          name: "Calore da trasmissione",
          description:
            "Mediobasse ricche e definizione raffinata per una resa professionale.",
        },
        {
          id: "gaming",
          name: "Comunicazioni esport",
          description:
            "Comunicazione di squadra rapida e comprensibile con minore mascheramento sonoro.",
        },
      ],
    },

    socialProof: {
      title:
        "Scelto dai creatori e dai moderni team audio",
    },

    features: {
      badge: "Infrastruttura audio intelligente",
      title: "Uno studio audio IA completo nel browser",
      subtitle:
        "Pulisci, modella, isola, spazializza e monitora ogni voce attraverso un unico flusso preciso a bassa latenza.",

      cards: {
        noiseShield: {
          tag: "Protezione neurale",
          title:
            "Schermo neurale antirumore in tempo reale",
          description:
            "Elimina continuamente tastiere, ventole, eco ambientale e interferenze di fondo, preservando i dettagli naturali della voce.",
          metricLabel: "Attenuazione del rumore di fondo",
          metricValue: "-54,8 dB",
        },

        parametricEq: {
          tag: "Controllo spettrale",
          title: "Equalizzatore parametrico 3D",
          description:
            "Modella presenza, calore, aria e intelligibilità attraverso un motore armonico animato a sedici bande.",
          metricLabel: "Elaborazione armonica",
          metricValue: "16 bande",
        },

        spatialMatrix: {
          tag: "Intelligenza delle tracce",
          title: "Matrice spaziale delle tracce",
          description:
            "Separa voce, ambiente e interferenze in tracce spaziali controllabili in modo indipendente, senza elaborazione distruttiva.",
          metricLabel: "Isolamento delle tracce",
          metricValue: "3 tracce senza perdita",
        },

        kernelDsp: {
          tag: "Motore a bassa latenza",
          title: "Nucleo DSP inferiore a 6 ms",
          description:
            "Elabora l’audio attraverso una catena ottimizzata in tempo reale per trasmissioni, comunicazioni competitive e produzione dal vivo.",
          metricLabel: "Latenza di andata e ritorno",
          metricValue: "4,8 ms",
        },
      },
    },

    pricing: {
      badge: "Prezzi semplici e scalabili",
      title: "Audio da studio in ogni fase",
      subtitle:
        "Inizia gratuitamente e passa al livello successivo quando servono sessioni più lunghe, elaborazione spaziale avanzata o strumenti professionali per il team.",
      monthly: "Mensile",
      yearly: "Annuale",
      saveBadge: "Risparmia il 25%",
      popularBadge: "Più scelto • Studio 3D",

      tiers: {
        starter: {
          name: "Base",
          description:
            "Per scoprire SonicFlow AI e migliorare le chiamate quotidiane.",
          priceMonthly: "$0",
          priceYearly: "$0",
          period: "al mese",
          features: [
            "60 minuti di elaborazione al mese",
            "Rimozione neurale essenziale del rumore",
            "Due preimpostazioni DSP professionali",
            "Uscita stereo standard",
            "Assistenza della comunità",
          ],
          cta: "Inizia gratis",
        },

        creator: {
          name: "Creatore professionale",
          description:
            "Per streamer, podcaster, creatori e giocatori competitivi.",
          priceMonthly: "$19",
          priceYearly: "$14",
          period: "al mese",
          features: [
            "20 ore di elaborazione al mese",
            "Ricostruzione vocale IA avanzata",
            "Studio spaziale 3D completo",
            "Tutte le preimpostazioni DSP professionali",
            "Esportazione audio ad alta risoluzione",
            "Assistenza prioritaria tramite posta elettronica",
          ],
          cta: "Prova Creatore professionale",
        },

        studio: {
          name: "Studio per aziende",
          description:
            "Per team di produzione che richiedono collaborazione e scalabilità.",
          priceMonthly: "$49",
          priceYearly: "$36",
          period: "al mese",
          features: [
            "Elaborazione in tempo reale illimitata",
            "Fino a dieci membri nell’area di lavoro",
            "Sessioni e preimpostazioni condivise",
            "Instradamento audio avanzato",
            "Accesso all’API e ai webhook",
            "Assistenza tecnica prioritaria",
          ],
          cta: "Prova Studio",
        },
      },
    },

    faq: {
      title: "Risposte chiare alle domande tecniche",
      subtitle:
        "Tutto ciò che serve sapere su latenza, compatibilità, riservatezza e instradamento audio in tempo reale.",

      items: [
        {
          question:
            "Come mantiene SonicFlow AI una latenza di elaborazione così bassa?",
          answer:
            "SonicFlow AI elabora l’audio in piccoli buffer in tempo reale e applica l’inferenza neurale ottimizzata solo quando necessario. La latenza effettiva dipende dal dispositivo, dal browser, dall’interfaccia audio, dalla dimensione del buffer e dalla catena di elaborazione selezionata.",
        },
        {
          question:
            "Posso usare SonicFlow AI con OBS, Discord, Zoom o una postazione audio digitale?",
          answer:
            "Sì. SonicFlow AI è progettato per i comuni flussi di trasmissione, comunicazione e produzione. L’instradamento su computer può richiedere un dispositivo audio virtuale, in base al sistema operativo e all’applicazione di destinazione.",
        },
        {
          question:
            "La mia voce viene conservata o utilizzata per addestrare modelli di intelligenza artificiale?",
          answer:
            "L’elaborazione in tempo reale è basata sulla sessione. L’audio viene conservato solo quando scegli esplicitamente di salvare o esportare una registrazione. Ogni ambiente di produzione deve descrivere con precisione le proprie politiche di conservazione e addestramento.",
        },
        {
          question:
            "Quali browser, sistemi e formati audio sono supportati?",
          answer:
            "Lo studio web è progettato per i moderni browser basati su Chromium che supportano Web Audio e WebGL. Le versioni desktop e le estensioni supportano instradamento professionale ed esportazione ad alta risoluzione in base al piano scelto.",
        },
      ],
    },

    ctaBanner: {
      badge: "La tua voce, ricostruita in tempo reale",
      title:
        "Ascolta la differenza nella tua prossima diretta",
      subtitle:
        "Usa il tuo microfono attuale e lascia che SonicFlow AI gestisca pulizia, miglioramento, posizionamento spaziale e monitoraggio da un unico ambiente intelligente.",
      button: "Inizia la prova gratuita",
    },

    footer: {
      description:
        "Miglioramento audio IA in tempo reale ed elaborazione vocale spaziale per creatori, team di produzione e comunicazione moderna.",
      statusOperational:
        "Tutti i gruppi sono operativi • Disponibilità del 99,98%",

      productTitle: "Prodotto",
      productLinks: [
        {
          label: "Funzionalità",
          href: "#features",
        },
        {
          label: "Studio 3D dal vivo",
          href: "#playground",
        },
        {
          label: "Prezzi",
          href: "#pricing",
        },
        {
          label: "Note di versione",
          href: "#releases",
        },
      ],

      solutionsTitle: "Soluzioni",
      solutionsLinks: [
        {
          label: "Trasmissione dal vivo",
          href: "#features",
        },
        {
          label: "Produzione di podcast",
          href: "#features",
        },
        {
          label: "Gioco competitivo",
          href: "#features",
        },
        {
          label: "Team a distanza",
          href: "#features",
        },
      ],

      resourcesTitle: "Risorse",
      resourcesLinks: [
        {
          label: "Documentazione",
          href: "#documentation",
        },
        {
          label: "Riferimento API",
          href: "#api",
        },
        {
          label: "Guide audio",
          href: "#guides",
        },
        {
          label: "Assistenza tecnica",
          href: "#faq",
        },
      ],

      newsletterTitle: "Notiziario intelligente",
      newsletterSubtitle:
        "Ricevi novità sul prodotto, ricerche DSP e note di versione SonicFlow.",
      emailPlaceholder: "tu@studio.it",
      subscribeBtn: "Iscriviti",
      subscribedSuccess: "Iscrizione confermata!",

      copyright:
        "© 2026 SonicFlow AI Inc. Tutti i diritti riservati.",
      privacy: "Riservatezza",
      terms: "Condizioni",
      security: "Sicurezza",
    },

    modal: {
      badge: "Accesso immediato a SonicFlow",
      title: "Crea il tuo motore audio",
      subtitle:
        "Scegli la piattaforma e genera l’accesso interattivo alla dimostrazione di SonicFlow AI.",
      platformLabel: "Scegli la piattaforma",

      platforms: [
        {
          id: "mac",
          name: "macOS • Apple Silicon",
          description:
            "Versione nativa per processori Apple M1, M2, M3 e M4.",
        },
        {
          id: "windows",
          name: "Windows 11 • x64",
          description:
            "Motore desktop ottimizzato per audio ASIO a bassa latenza.",
        },
        {
          id: "plugin",
          name: "Estensione VST3 / AU",
          description:
            "Per Ableton Live, Logic Pro, FL Studio e postazioni audio compatibili.",
        },
      ],

      emailLabel: "Indirizzo per l’accesso",
      emailPlaceholder: "tecnico@studio.it",
      submitBtn: "Genera accesso immediato",

      successTitle: "Il tuo studio è pronto",
      successSubtitle:
        "La licenza dimostrativa e il pacchetto per la piattaforma selezionata sono stati generati.",
      licenseLabel: "Codice della licenza dimostrativa",
      copyBtn: "Copia",
      copiedBtn: "Copiato",
      downloadBtn: "Scarica il file di accesso",
    },
  },
};

export function isLanguage(
  value: unknown,
): value is Language {
  return (
    typeof value === "string" &&
    languages.includes(value as Language)
  );
}

export function getTranslation(
  language: Language,
): TranslationDictionary {
  return translations[language];
}

export function getLanguageDirection(
  language: Language,
): TextDirection {
  return languageDirections[language];
}

export function getHtmlLanguageCode(
  language: Language,
): string {
  return languageHtmlCodes[language];
}