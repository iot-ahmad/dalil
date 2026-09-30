import { firebaseConfig as cfg } from './firebase-config.js';

const FIREBASE_CDN = 'https://www.gstatic.com/firebasejs/10.12.0/';
let fb = null;

const PLACE_IMAGES = {
  petra: 'assets/img/petraMain.png',
  petra_deir: 'assets/img/petra_deir.jpg',
  deadsea: 'assets/img/deadsSea.png',
  wadirum: 'assets/img/wadirum.jpg',
  wadirum_night: 'assets/img/petraNightCamp.png',
  aqaba: 'assets/img/aqaba.jpg',
  main: 'assets/img/maienBaths.png',
  jerash: 'assets/img/jerash_colonnade.jpg',
  jerash_colonnade: 'assets/img/jerash_colonnade.jpg',
  ajloun: 'assets/img/ajlounCastle.jpg',
  amman: 'assets/img/amman.png',
  salt: 'assets/img/Salt_Street.png',
  ummqais: 'assets/img/omqies.png',
  north: 'assets/img/irbid.png'
};

const PLACE_GALLERIES = {
  petra: [
    { src: 'assets/img/petra_deir.jpg', en: 'Petra Monastery', ar: 'دير البتراء' },
    { src: 'assets/img/petraBaloon.png', en: 'Petra by balloon', ar: 'البتراء من المنطاد' },
    { src: 'assets/img/petraCamping.png', en: 'Petra camp', ar: 'مخيم البتراء' },
    { src: 'assets/img/petraNightCamp.png', en: 'Petra night camp', ar: 'مخيم البتراء ليلاً' }
  ],
  aqaba: [
    { src: 'assets/img/aqapaDiving.jpg', en: 'Aqaba diving', ar: 'الغوص في العقبة' }
  ],
  deadsea: [
    { src: 'assets/img/deadsea_health_recovery.jpg', en: 'Dead Sea wellness', ar: 'الاستجمام في البحر الميت' }
  ],
  amman: [
    { src: 'assets/img/downtownAmman.png', en: 'Downtown Amman', ar: 'وسط البلد في عمّان' },
    { src: 'assets/img/RainbowStreetAmman.png', en: 'Rainbow Street', ar: 'شارع الرينبو' }
  ]
};

const FOOD_DISHES = [
  {
    id: 'mansaf',
    name: { en: 'Mansaf', ar: 'المنسف' },
    image: 'assets/img/Mansaf_food.png',
    description: {
      en: 'Jordan’s signature celebratory dish: tender lamb served over rice and shrak bread with a rich jameed sauce.',
      ar: 'طبق الأردن الأشهر في الولائم والمناسبات: لحم ضأن طري فوق الأرز وخبز الشراك، ويُقدّم مع صلصة الجميد الغنية.'
    },
    ingredients: {
      en: ['Lamb', 'Jameed (dried fermented yogurt)', 'Rice', 'Shrak bread', 'Almonds or pine nuts'],
      ar: ['لحم الضأن', 'الجميد (لبن مجفف ومخمّر)', 'الأرز', 'خبز الشراك', 'اللوز أو الصنوبر']
    }
  },
  {
    id: 'maqlobeh',
    name: { en: 'Maqlobeh', ar: 'المقلوبة' },
    image: 'assets/img/Maqlobeh_food.png',
    description: {
      en: 'A comforting layered rice dish cooked with vegetables and meat, then turned upside down before serving.',
      ar: 'طبق أرز منزلي تُرصّ فيه الخضار واللحم في طبقات، ثم تُقلب القدر رأساً على عقب عند التقديم.'
    },
    ingredients: {
      en: ['Rice', 'Chicken or lamb', 'Eggplant or cauliflower', 'Potatoes', 'Warm spices'],
      ar: ['الأرز', 'الدجاج أو لحم الضأن', 'الباذنجان أو القرنبيط', 'البطاطا', 'بهارات مشكلة']
    }
  },
  {
    id: 'mahashie',
    name: { en: 'Mahashi', ar: 'المحاشي' },
    image: 'assets/img/mahashie_food.png',
    description: {
      en: 'Vegetables carefully stuffed with a seasoned rice filling and gently simmered until tender.',
      ar: 'خضار تُحشى بخليط أرز متبّل وتُطهى على مهل حتى تنضج وتتشرب النكهات.'
    },
    ingredients: {
      en: ['Zucchini, eggplant or peppers', 'Rice', 'Tomatoes', 'Parsley and herbs', 'Warm spices'],
      ar: ['الكوسا أو الباذنجان أو الفلفل', 'الأرز', 'البندورة', 'البقدونس والأعشاب', 'بهارات مشكلة']
    }
  },
  {
    id: 'kabab',
    name: { en: 'Kabab', ar: 'الكباب' },
    image: 'assets/img/Kabab_food.png',
    description: {
      en: 'Juicy seasoned meat grilled over charcoal and commonly served with flatbread and fresh accompaniments.',
      ar: 'لحم متبّل ومشوي على الفحم، يُقدّم غالباً مع الخبز العربي والخضار الطازجة.'
    },
    ingredients: {
      en: ['Ground lamb or beef', 'Onion', 'Parsley', 'Black pepper', 'Cumin and salt'],
      ar: ['لحم ضأن أو بقري مفروم', 'البصل', 'البقدونس', 'الفلفل الأسود', 'الكمون والملح']
    }
  },
  {
    id: 'kunafeh',
    name: { en: 'Kunafeh', ar: 'الكنافة' },
    image: 'assets/img/Qunafah_food.png',
    description: {
      en: 'A beloved warm dessert of crisp pastry and soft cheese, finished with fragrant sugar syrup.',
      ar: 'حلوى محبوبة تُقدّم دافئة، تجمع عجينة مقرمشة وجبناً طرياً مع القطر المعطّر.'
    },
    ingredients: {
      en: ['Kataifi pastry or semolina', 'Nabulsi cheese', 'Butter or ghee', 'Sugar syrup', 'Pistachios'],
      ar: ['عجينة الكنافة أو السميد', 'الجبنة النابلسية', 'الزبدة أو السمن', 'القطر', 'الفستق الحلبي']
    }
  },
  {
    id: 'baklava',
    name: { en: 'Baklawa', ar: 'البقلاوة' },
    image: 'assets/img/Baqlawa_food.png',
    description: {
      en: 'Delicate layers of crisp pastry filled with nuts and lightly sweetened with syrup.',
      ar: 'طبقات رقيقة ومقرمشة من العجين محشوة بالمكسرات ومحلاة بالقطر.'
    },
    ingredients: {
      en: ['Filo pastry', 'Pistachios or walnuts', 'Butter or ghee', 'Sugar syrup'],
      ar: ['عجينة الفيلو', 'الفستق الحلبي أو الجوز', 'الزبدة أو السمن', 'القطر']
    }
  }
];

const getPlaceImage = place => PLACE_IMAGES[place.id] || '';
const TOUR_PRICES = { groupPerTraveler: 25, privateGuide: 60 };
const getGuidedTourTotal = (type, travelers) => {
  if (type === 'group' && Number.isInteger(travelers) && travelers > 0) {
    return TOUR_PRICES.groupPerTraveler * travelers;
  }
  if (type === 'private') return TOUR_PRICES.privateGuide;
  return 0;
};
const formatLocalDate = date => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
const getTodayDate = () => formatLocalDate(new Date());
const getDefaultTourDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return formatLocalDate(date);
};
const getFoodName = dish => dish.name[STATE.lang];
const getPlaceImageStyle = place => {
  const image = getPlaceImage(place);
  return image
    ? `background-image: url('${image}')`
    : 'background-image: linear-gradient(135deg, #48535a, #131922)';
};
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

// Initialize Firebase if user provided real keys
if (cfg && cfg.apiKey && !cfg.apiKey.startsWith('YOUR')) {
  try {
    const [appModule, authModule, firestoreModule] = await Promise.all(
      ['firebase-app.js', 'firebase-auth.js', 'firebase-firestore.js'].map(f => import(FIREBASE_CDN + f))
    );
    const app = appModule.initializeApp(cfg);
    fb = {
      authMod: authModule,
      fsMod: firestoreModule,
      auth: authModule.getAuth(app),
      db: firestoreModule.getFirestore(app),
      googleProvider: new authModule.GoogleAuthProvider()
    };
  } catch (err) {
    console.warn('Firebase initialization skipped or failed:', err);
  }
}

// Helpers
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const getLS = key => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return null;
    try {
      return JSON.parse(storedValue);
    } catch (err) {
      if (key === 'dalilLang' && ['en', 'ar'].includes(storedValue)) return storedValue;
      throw err;
    }
  } catch (err) {
    console.warn(`Could not read saved data for "${key}":`, err);
    return null;
  }
};

const setLS = (key, value) => {
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`Could not save data for "${key}":`, err);
    return false;
  }
};

const removeLS = key => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`Could not remove saved data for "${key}":`, err);
  }
};

// Comprehensive Jordan Places with Real GPS Coordinates
const PLACES = [
  {
    id: 'wadirum',
    lat: 29.5733,
    lng: 35.4333,
    tag: 'DESERT',
    tagAr: 'الصحراء',
    c: 'adventure',
    n: 'Wadi Rum',
    a: 'وادي رم',
    r: 'Aqaba',
    ra: 'العقبة',
    sub: 'Valley of the Moon • Desert Reserve',
    subAr: 'وادي القمر • محمية صحراوية طبيعية',
    o: 5,
    d: 1,
    cost: 95,
    s: 'Sleep under a different sky',
    sa: 'ليلة تحت سماء مختلفة',
    why: 'Known as the "Valley of the Moon", Wadi Rum is a UNESCO World Heritage desert protected area of dramatic sandstone monoliths, granite canyons, pre-historic petroglyphs, and iconic Martian-like red sand dunes.',
    whyAr: 'يُعرف باسم "وادي القمر"، وهو محمية طبيعية وصحراوية مدرجة على لائحة التراث العالمي (اليونسكو)، تشتهر بجبال الغرانيت الشاهقة، والرمال الحمراء، والنقوش الصخرية القديمة، وسماء الليل المرصعة بالنجوم.',
    best: 'Stargazing • 4x4 Safari • Desert Glamping',
    bestAr: 'رصد النجوم • جولات الدفع الرباعي • التخييم',
    time: '1–2 Days (Overnight recommended)',
    timeAr: '1–2 يوم (يُوصى بالمبيت)',
    tip: 'Bring warm layers for nighttime; temperatures drop rapidly.',
    tipAr: 'احرص على جلب ملابس دافئة لليل؛ حيث تنخفض درجات الحرارة في الصحراء.',
    ticket: '5 JOD (Included in Jordan Pass)',
    ticketAr: '5 دنانير (مشمول في التذكرة الموحدة Jordan Pass)',
    hours: 'Open 24/7 (Visitor Center: 08:00 – 16:00)',
    hoursAr: 'مفتوح 24 ساعة (مركز الزوار: 08:00 – 16:00)',
    season: 'Autumn (Oct–Nov) & Spring (Mar–May)',
    seasonAr: 'الخريف (أكتوبر–نوفمبر) والربيع (مارس–مايو)',
    food: 'Bedouin Zarb (underground slow-cooked lamb) & sage tea',
    foodAr: 'الزرب البدوي المدفون تحت الرمل والشاي بالميرمية',
    highlights: [
      { en: 'Khazali Canyon & Inscriptions', ar: 'مضيق الخزعلي والنقوش الثمودية', descEn: 'Narrow canyon adorned with 2,000-year-old Thamudic, Nabataean, and Islamic inscriptions.', descAr: 'ممر صخري ضيق يضم نقوشاً أثرية ثمودية ونبطية وإسلامية تعود لآلاف السنين.' },
      { en: 'Um Fruth Rock Bridge', ar: 'جسر أم فروث الصخري الطبيعي', descEn: 'Spectacular natural arch rising 15 meters above desert floor, popular for climbing photos.', descAr: 'قوس صخري طبيعي رائع يرتفع 15 متراً، وهو من أشهر المعالم لالتقاط الصور البانورامية.' },
      { en: 'Burdah Rock Bridge & Lawrence Spring', ar: 'جسر بردة وعين لورنس', descEn: 'High arch offering panoramic desert views and fresh water spring associated with T.E. Lawrence.', descAr: 'أعلى جسر طبيعي في رم مع إطلالات صحراوية خلابة وعين ماء عذبة ترتبط بتاريخ لورنس العرب.' },
      { en: 'Martian Dome Stargazing', ar: 'رصد المجرات من مخيم القباب', descEn: 'Unrivaled night sky observation with zero light pollution, view Milky Way directly from bed.', descAr: 'سماء صافية تماماً وانعدام للتلوث الضوئي لرؤية مجرة درب التبانة والكواكب بوضوح استثنائي.' }
    ]
  },
  {
    id: 'aqaba',
    lat: 29.5321,
    lng: 35.0063,
    tag: 'COAST',
    tagAr: 'البحر',
    c: 'nature',
    n: 'Aqaba',
    a: 'العقبة',
    r: 'Red Sea',
    ra: 'البحر الأحمر',
    sub: 'Red Sea Resort & Marine Park',
    subAr: 'عروس البحر الأحمر والمحمية البحرية',
    o: 6,
    d: 1,
    cost: 45,
    s: 'Sea, coast and an easy pace',
    sa: 'البحر والهدوء والألوان',
    why: "Jordan's sole coastal gateway on the Gulf of Aqaba. Renowned for crystal-clear warm waters, pristine coral reefs, sunken shipwrecks, water sports, and relaxed waterfront cafes in Ayla Oasis and Tala Bay.",
    whyAr: 'المنفذ البحري الوحيد للأردن على خليج العقبة، وتتميز بشواطئها الدافئة، وشعابها المرجانية الغنية، ومواقع الغوص الشهيرة، والمنتجعات الحديثة في واحة أيلة وتالا بيه.',
    best: 'Snorkeling • Scuba Diving • Seafood',
    bestAr: 'الغوص والسباحة • الرياضات المائية • المأكولات البحرية',
    time: '1–3 Days',
    timeAr: '1–3 أيام',
    tip: 'South Beach & Japanese Garden are best for shore snorkeling.',
    tipAr: 'الشاطئ الجنوبي والحديقة اليابانية أفضل الأماكن للسنوركلينغ من الشاطئ مباشرة.',
    ticket: 'Free Public Beaches / Private Clubs: 10–25 JOD',
    ticketAr: 'الشواطئ العامة مجانية / النوادي الخاصة: 10–25 دينار',
    hours: 'Year-round sunshine',
    hoursAr: 'مشمسة طوال العام',
    season: 'Autumn, Winter & Spring (Oct – May)',
    seasonAr: 'الخريف، الشتاء والربيع (أكتوبر – مايو)',
    food: 'Sayadieh (spiced fresh fish & rice) & fresh guava juice',
    foodAr: 'صيادية السمك العقباوية الطازجة وعصير الجوافة الطبيعي',
    highlights: [
      { en: 'Japanese Garden Coral Reef', ar: 'شعاب الحديقة اليابانية المرجانية', descEn: 'One of the Red Sea\'s most vibrant shallow reefs, home to clownfish, turtles and rays.', descAr: 'من أزهى الحدائق المرجانية الضحلة المناسبة للسباحة ورؤية السلاحف والأسماك الملونة.' },
      { en: 'Cedar Pride Shipwreck Dive', ar: 'حطام سفينة سيدار برايد', descEn: 'World-famous scuttled Lebanese freighter now completely colonized by coral and marine life.', descAr: 'موقع غوص عالمي لسفينة غارقة تحولت إلى مستعمرة بحرية غنية بالشعاب المرجانية.' },
      { en: 'Ayla Oasis Marina & Lagoons', ar: 'مارينا واحة أيلة والبحيرات', descEn: 'Contemporary lifestyle district with golf course, beach clubs, art galleries and waterfront dining.', descAr: 'واجهة سياحية عصرية تضم بحيرات اصطناعية ومطاعم شاطئية وأنشطة ترفيهية متكاملة.' },
      { en: 'Aqaba Mamluk Castle & Flagpole', ar: 'قلعة العقبة الأثرية وسارية العلم', descEn: 'Historic 16th-century fortress and the giant Arab Revolt flagpole along the corniche.', descAr: 'قلعة تاريخية مملوكية شهدت أحداث الثورة العربية الكبرى بجوار سارية العلم الشاهقة.' }
    ]
  },
  {
    id: 'ajloun',
    lat: 32.3328,
    lng: 35.7275,
    tag: 'NATURE',
    tagAr: 'الطبيعة',
    c: 'nature',
    n: 'Ajloun Castle',
    a: 'قلعة عجلون',
    r: 'Ajloun',
    ra: 'عجلون',
    sub: 'Medieval Fortress & Forest Reserve',
    subAr: 'قلعة العز بن أسامة والغابات الخضراء',
    o: 1,
    d: 0.5,
    cost: 20,
    s: 'Forest roads and hilltop views',
    sa: 'غابات وطرق وإطلالات ساحرة',
    why: 'Built in 1184 AD by Saladin\'s nephew to protect trade routes from Crusaders. Perched atop Mount Auf, it oversees the lush evergreen oak and pine forest reserve, olive terraces, and rolling Jordan Valley vistas.',
    whyAr: 'بناها القائد عز الدين أسامة أحد قادة صلاح الدين الأيوبي عام 1184م لحماية الطرق التجارية والسيطرة على مناجم الحديد، وتطل من قمة جبل عوف على غابات البلوط والصنوبر ووادي الأردن.',
    best: 'Islamic Architecture • Forest Hikes • Local Cooperatives',
    bestAr: 'العمارة الإسلامية • مسارات المشي في الغابات • الجمعيات المحلية',
    time: 'Half Day (3–4 Hours)',
    timeAr: 'نصف يوم (3–4 ساعات)',
    tip: 'Ride the Ajloun Teleferique (cable car) for stunning forest views.',
    tipAr: 'جرّب تلفريك عجلون للاستمتاع بإطلالة بانورامية ساحرة فوق قمم الغابات.',
    ticket: '3 JOD (Included in Jordan Pass)',
    ticketAr: '3 دنانير (مشمول في التذكرة الموحدة Jordan Pass)',
    hours: 'Summer: 08:00 – 18:30 | Winter: 08:00 – 16:00',
    hoursAr: 'صيفاً: 08:00 – 18:30 | شتاءً: 08:00 – 16:00',
    season: 'Spring (wildflower season) & Autumn (olive harvest)',
    seasonAr: 'الربيع (موسم أزهار السوسنة السوداء) والخريف (قطاف الزيتون)',
    food: 'Ajloun organic olive oil, wild thyme (Za\'atar), and fresh saj bread',
    foodAr: 'زيت الزيتون العجلوني البكر، الزعتر البري وخبز الصاج الطازج',
    highlights: [
      { en: 'Castle Vaults & Stone Museum', ar: 'أروقة القلعة والمتحف الأثري', descEn: 'Intricate medieval stone arches, moats, drawbridges, and weapon chambers.', descAr: 'أقواس حجرية ضخمة وخنادق مائية وغرف حربية عسكرية مع متحف للقى الأثرية.' },
      { en: 'Ajloun Forest Reserve Trails', ar: 'مسارات محمية غابات عجلون', descEn: 'Protected evergreen oak sanctuary home to Roe Deer and rare Mediterranean flora.', descAr: 'محمية طبيعية تابعة للجمعية الملكية لحماية الطبيعة، تضم أشجار البلوط والبطم والأيل الأسمر.' },
      { en: 'Soap House & Biscuit House', ar: 'بيت الصابون وبيت البسكويت', descEn: 'Community cooperatives run by local women crafting pure olive oil soap and sumac crackers.', descAr: 'مشاريع مجتمعية تديرها سيدات محليات لإنتاج صابون زيت الزيتون والمخبوزات التقليدية.' },
      { en: 'Ajloun Cable Car (Teleferique)', ar: 'تلفريك عجلون السياحي', descEn: '2.5 km scenic aerial lift traversing mountain ridges between the castle and reserve.', descAr: 'خط تلفريك بطول 2.5 كم يربط بين الجبال ويوفر إطلالات علوية خلابة على التلال.' }
    ]
  },
  {
    id: 'jerash',
    lat: 32.2723,
    lng: 35.8914,
    tag: 'HISTORY',
    tagAr: 'التاريخ',
    c: 'history',
    n: 'Jerash',
    a: 'جرش',
    r: 'Jerash',
    ra: 'جرش',
    sub: 'Pompeii of the East • Decapolis City',
    subAr: 'بومبي الشرق • إحدى مدن الديكابولس العشر',
    o: 2,
    d: 0.5,
    cost: 25,
    s: 'Walk through living history',
    sa: 'تاريخ تمشي في أروقته',
    why: 'Considered one of the largest and most exceptionally preserved Roman provincial cities anywhere in the world. Unburied from desert sands over two centuries, it boasts monumental plazas, temples, and theaters.',
    whyAr: 'واحدة من أكبر المدن الرومانية المحفوظة وأكملها خارج إيطاليا، عُرفت تاريخياً باسم "جراسا"، وظلت مدفونة تحت الرمال لقرون مما حافظ على أعمدتها ومسارحها وساحاتها الحجرية المتكاملة.',
    best: 'Roman History • Classical Architecture • Photography',
    bestAr: 'التاريخ الروماني • العمارة الكلاسيكية • التصوير الأثري',
    time: '3–5 Hours',
    timeAr: '3–5 ساعات',
    tip: 'Wear sturdy walking shoes for the ancient stone pavement.',
    tipAr: 'ارتدِ حذاء مشي مريحاً نظراً للمسافات والأرضيات الحجرية المرصوفة.',
    ticket: '10 JOD (Included in Jordan Pass)',
    ticketAr: '10 دنانير (مشمول في التذكرة الموحدة Jordan Pass)',
    hours: 'Summer: 08:00 – 19:00 | Winter: 08:00 – 17:00',
    hoursAr: 'صيفاً: 08:00 – 19:00 | شتاءً: 08:00 – 17:00',
    season: 'Spring (Mar–May) & Autumn (Sep–Nov)',
    seasonAr: 'الربيع (مارس–مايو) والخريف (سبتمبر–نوفمبر)',
    food: 'Fresh Jerash sheep labneh, grilled lamb kofta & local olive pastries',
    foodAr: 'اللبنة الجرشية البلدية، الكفتة المشوية، ومناقيش الزعتر',
    highlights: [
      { en: 'The Oval Plaza & Columned Ring', ar: 'الساحة البيضاوية الفريدة', descEn: 'Distinctive asymmetrical limestone plaza enclosed by 56 classical Ionic columns.', descAr: 'ساحة بيضاوية نادرة تحيط بها 56 عموداً أيونياً تربط بين شارع الأعمدة ومعبد زيوس.' },
      { en: 'Cardo Maximus (Colonnaded Street)', ar: 'شارع الأعمدة الرئيسي (الكاردو)', descEn: '800-meter straight Roman thoroughfare complete with original paving, gutters, and shops.', descAr: 'شارع روماني مستقيم بطول 800 متر مرصوف بالحجارة الأصلية ومحاط بمئات الأعمدة الكورنثية.' },
      { en: 'South Theater & Bagpipers', ar: 'المسرح الجنوبي الروماني', descEn: '3,000-seat amphitheater with incredible acoustic precision, hosting live Jordanian bagpipers.', descAr: 'مسرح يتسع لـ 3000 متفرج ويتميز بهندسة صوتية فائقة الدقة تُسمع في كافة أرجائه.' },
      { en: 'Temple of Artemis', ar: 'معبد الإلهة أرتميس الشاهق', descEn: 'Grand temple perched high above the city featuring towering swayable stone pillars.', descAr: 'معبد ضخم يتصدر قمة التل وتتميز أعمدته الضخمة بقدرتها على التمايل الطفيف مع الرياح دون أن تسقط.' }
    ]
  },
  {
    id: 'petra',
    lat: 30.3285,
    lng: 35.4444,
    tag: 'ICONIC',
    tagAr: 'أيقونة',
    c: 'history',
    n: 'Petra',
    a: 'البتراء',
    r: "Ma'an",
    ra: 'معان',
    sub: 'Rose-Red City • New 7 Wonders of the World',
    subAr: 'المدينة الوردية • إحدى عجائب الدنيا السبع',
    o: 4,
    d: 1,
    cost: 60,
    s: 'Walk the Siq, Treasury and sunset viewpoint',
    sa: 'امشِ عبر السيق واكتشف الخزنة والإطلالات',
    why: 'Carved directly into red and pink sandstone rockfaces by the Nabataean Arabs over 2,000 years ago. A masterwork of hydrological engineering, rock-cut architecture, and the heart of ancient frankincense trade routes.',
    whyAr: 'عاصمة مملكة الأنباط المنحوتة في الصخر الوردي قبل أكثر من ألفي عام. تحفة هندسية ومعمارية استثنائية ونقطة التقاء قوافل البخور والتوابل العالمية، وإحدى عجائب الدنيا السبع الجديدة.',
    best: 'World Wonders • Hiking • Ancient Nabataean Culture',
    bestAr: 'عجائب الدنيا • المشي الجبلي • الحضارة النبطية والتصوير',
    time: '1–2 Full Days',
    timeAr: '1–2 يوم كامل',
    tip: 'Start at 06:00 AM to explore the Treasury before tour crowds arrive.',
    tipAr: 'ادخل في الصباح الباكر (06:00 ص) للاستمتاع بجمال الخزنة والسيق قبل توافد المجموعات.',
    ticket: '50 JOD 1-day / 55 JOD 2-days (Included in Jordan Pass)',
    ticketAr: '50 دينار ليوم واحد / 55 دينار ليومين (مشمول في Jordan Pass)',
    hours: 'Summer: 06:00 – 18:00 | Winter: 06:00 – 16:00',
    hoursAr: 'صيفاً: 06:00 – 18:00 | شتاءً: 06:00 – 16:00',
    season: 'Spring (Mar–May) & Autumn (Sep–Nov)',
    seasonAr: 'الربيع والخريف (مارس–مايو وسبتمبر–نوفمبر)',
    food: 'Bedouin Galayet Bandora (tomato stew with meat) & cardamom coffee',
    foodAr: 'قلاية البندورة البلدية مع اللحم، والقهوة العربية بالهيل',
    highlights: [
      { en: 'The Siq Canyon Passage', ar: 'ممر السيق الصخري الشاهق', descEn: '1.2 km winding natural gorge between 80m soaring cliffs leading into Petra.', descAr: 'ممر صخري ضيق ومتعرج بطول 1.2 كم ترتفع جدرانه 80 متراً لتصل بك إلى الخزنة.' },
      { en: 'Al-Khazneh (The Treasury)', ar: 'الخزنة المنحوتة في الصخر', descEn: 'World-renowned 40-meter-tall Hellenistic facade meticulously carved out of sheer rose cliff.', descAr: 'الواجهة الأيقونية المنحوتة بدقة متناهية في قلب الجبل الوردي بارتفاع 40 متراً.' },
      { en: 'Al-Deir (The Monastery)', ar: 'الدير الصخري العملاق', descEn: 'Gigantic rock facade reachable via 850 stone steps with breathtaking canyon panorama.', descAr: 'أكبر مباني البتراء المنحوتة، يقع بعد صعود 850 درجة حجرية بين القمم الجبلية.' },
      { en: 'High Place of Sacrifice & Royal Tombs', ar: 'المذبح وقبور الملوك', descEn: 'Sacred mountain altar and the grand Urn, Silk, and Palace tombs glowing in sunset rays.', descAr: 'منصة نبطية مقدسة أعلى الجبال، ومدافن الملوك ذات الألوان الصخرية المتموجة.' }
    ]
  },
  {
    id: 'north',
    lat: 32.6534,
    lng: 35.6847,
    tag: 'HIDDEN',
    tagAr: 'مخفي',
    c: 'hidden',
    n: 'Northern hills & Umm Qais',
    a: 'تلال الشمال وأم قيس',
    r: 'North',
    ra: 'الشمال',
    sub: 'Ancient Gadara • Yarmouk Valley',
    subAr: 'جدارا القديمة • إطلالات وادي اليرموك وطبريا',
    o: 1.5,
    d: 0.5,
    cost: 15,
    s: 'Quiet roads and panoramic valleys',
    sa: 'طرق هادئة وإطلالات وأودية خضراء',
    why: 'Where ancient Greco-Roman black basalt ruins overlook the Sea of Galilee, the Golan Heights, and the Yarmouk River. The region is famous for green rolling hills, oak forests, and authentic rural farm-to-table hospitality.',
    whyAr: 'تقف آثار مدينة "جدارا" الرومانية المبنية بالحجر البازلتي الأسود على تلة تشرف على بحيرة طبريا وهضبة الجولان ونهر اليرموك، محاطة بتلال خضراء ومزارع ريفية ساحرة.',
    best: 'Scenic Overlooks • History • Countryside Walks',
    bestAr: 'الإطلالات البانورامية • التاريخ الروماني • الطبيعة الريفية',
    time: 'Half to Full Day',
    timeAr: 'نصف يوم إلى يوم كامل',
    tip: 'Have a sunset lunch at the restaurant inside the ancient ruins.',
    tipAr: 'تناول الغداء وقت الغروب في الاستراحة المطلة على بحيرة طبريا داخل الموقع الأثري.',
    ticket: '5 JOD (Included in Jordan Pass)',
    ticketAr: '5 دنانير (مشمول في Jordan Pass)',
    hours: '08:00 – 17:00 Daily',
    hoursAr: '08:00 – 17:00 يومياً',
    season: 'Late Winter & Spring (February to May)',
    seasonAr: 'نهاية الشتاء والربيع (فبراير إلى مايو - تكون التلال خضراء يانعة)',
    food: 'Rural northern breakfast (fresh cheeses, eggs, honey, olives & Makdous)',
    foodAr: 'الفطور الريفي الأردني (جبنة بلدية، بيض بلدي، مكدوس، عسل وزيتون)',
    highlights: [
      { en: 'Black Basalt Roman Theaters', ar: 'المسرح البازلتي الأسود', descEn: 'Intact amphitheater built entirely from local volcanic black basalt stone.', descAr: 'مسرح روماني أثري مبني من حجارة البازلت البركانية السوداء المميزة للمنطقة.' },
      { en: 'Triple-Border Scenic Viewpoint', ar: 'مطل وادي اليرموك وبحيرة طبريا', descEn: 'Unmatched vista overlooking Jordan, Palestine/Sea of Galilee and Syrian borders.', descAr: 'إطلالة جغرافية وتاريخية فريدة تشرف على أودية اليرموك وبحيرة طبريا وجبال الجولان.' },
      { en: 'Ottoman Heritage Village', ar: 'القرية العثمانية التراثية', descEn: 'Restored stone village now hosting heritage guesthouses, workshops and local cafes.', descAr: 'بيوت قروية حجرية رممت لتكون مراكز حرفية ومطاعم تقدم أكلات المطبخ الأردني الأصيل.' }
    ]
  },
  {
    id: 'deadsea',
    lat: 31.5000,
    lng: 35.5000,
    tag: 'COAST',
    tagAr: 'البحر',
    c: 'nature',
    n: 'Dead Sea',
    a: 'البحر الميت',
    r: 'Dead Sea',
    ra: 'البحر الميت',
    sub: 'Lowest Point on Earth (-430m) • Natural Spa',
    subAr: 'أخفض بقعة على وجه الأرض • منتجع علاجي طبيعي',
    o: 3,
    d: 0.5,
    cost: 30,
    s: 'Floating shores and mineral wellness',
    sa: 'شواطئ عائمة واستجمام طبيعي',
    why: 'At 430 meters below sea level, the Dead Sea is the lowest elevation on land. Its 34% hyper-saline water lets you float effortlessly while absorbing skin-revitalizing minerals and natural black therapeutic mud.',
    whyAr: 'أخفض نقطة على سطح الأرض بعمق 430 متراً تحت مستوى سطح البحر، وتتميز مياهه بملوحة تبلغ 34% تتيح الطفو الطبيعي التام دون أي جهد، مع طين علاجي غني بالمعادن النادرة المفيدة للبشرة والجسم.',
    best: 'Natural Floating • Mineral Mud • Sunset Spa',
    bestAr: 'السباحة العائمة • الطين المعدني • الاسترخاء والسبا',
    time: 'Half to Full Day',
    timeAr: 'نصف يوم إلى يوم كامل',
    tip: 'Never let the salty water enter your eyes; rinse immediately with fresh water.',
    tipAr: 'تجنب ملامسة الماء للعينين تماماً، واحرص على الاستحمام بالماء العذب بعد الطفو.',
    ticket: 'Resort Day Passes: 15–35 JOD (includes pool & mud)',
    ticketAr: 'دخول المنتجعات والشواطئ: 15–35 دينار (شاملة المسابح والطين)',
    hours: 'Open year-round',
    hoursAr: 'مفتوح طوال العام',
    season: 'Autumn, Winter & Spring (October to May)',
    seasonAr: 'الخريف والشتاء والربيع (أكتوبر إلى مايو - طقس دافئ ومثالي)',
    food: 'Bedouin barbecue, fresh mezze spreads and refreshing mint lemonades',
    foodAr: 'مشاوي على الطريقة الأردنية، مقبلات باردة وعصير الليمون بالنعناع',
    highlights: [
      { en: 'Effortless Buoyant Floating', ar: 'تجربة الطفو بدون مجهود', descEn: 'Experience natural buoyancy where sinking is physically impossible.', descAr: 'شعور فريد بالطفو فوق سطح الماء والاسترخاء بفضل كثافة المعادن العالية.' },
      { en: 'Black Mineral Mud Therapy', ar: 'قناع الطين المعدني الأسود', descEn: 'Apply natural therapeutic Dead Sea mud directly from the sea floor.', descAr: 'تغطية الجسم بطين البحر الميت الطبيعي الغني بالمعادن التي تنقي وتجدد خلايا الجلد.' },
      { en: 'Salt Crystal Coastline', ar: 'التشكيلات الملحية البيضاء', descEn: 'Glistening white crystal formations framing the turquoise water along the coast.', descAr: 'تشكيلات ملحية ساحرة تشبه الثلج تتباين بروعة مع المياه الفيروزية والجبال المحيطة.' }
    ]
  },
  {
    id: 'main',
    lat: 31.6092,
    lng: 35.6111,
    tag: 'WELLNESS',
    tagAr: 'استجمام',
    c: 'nature',
    n: "Ma'in Hot Springs",
    a: 'حمامات ماعين',
    r: 'Madaba',
    ra: 'مادبا',
    sub: 'Thermal Mineral Waterfalls & Canyon Oasis',
    subAr: 'شلالات مياه معدنية حارة وسط الوادي الصخري',
    o: 3.2,
    d: 0.5,
    cost: 35,
    s: 'Canyon oasis, thermal pools and dramatic cliffs',
    sa: 'واحة في الوادي وشلالات ساخنة',
    why: 'Natural thermal mineral waterfalls heated by underground volcanic fissures to 45°C–60°C, cascading into canyon pools used for wellness and relaxation since Roman and biblical times.',
    whyAr: 'شلالات وينابيع مياه كبريتية طبيعية دافئة تتدفق من باطن الأرض بحرارة تصل إلى 45-60 مئوية وسط وادٍ صخري مهيب، وتُستخدم للاستجمام وعلاج آلام المفاصل منذ العهد الروماني.',
    best: 'Hot Spring Soaking • Canyon Scenery • Hydrotherapy',
    bestAr: 'الاستحمام في المياه المعدنية الحارة • الاستجمام الطبيعي • الاسترخاء',
    time: 'Half Day (3–5 Hours)',
    timeAr: 'نصف يوم (3–5 ساعات)',
    tip: 'Combine with a morning hike in Wadi Mujib or visit to Madaba.',
    tipAr: 'يُفضل دمجه مع زيارة مادبا أو مسار وادي الموجب المائي في الصباح.',
    ticket: '15 JOD (Entrance to public waterfalls)',
    ticketAr: '15 دينار (رسوم الدخول للشلالات العامة والمسابح الطبيعية)',
    hours: '08:00 – 21:00 Daily',
    hoursAr: '08:00 – 21:00 يومياً',
    season: 'Autumn, Winter & Early Spring',
    seasonAr: 'الخريف، الشتاء وبداية الربيع (تكون المياه الساخنة ممتعة جداً)',
    food: 'Traditional Madaba Saj breads, fresh grilled chicken & herbal mountain tea',
    foodAr: 'خبز الشراك المادباوي، الدجاج المشوي على الفحم وشاي الأعشاب الجبلية',
    highlights: [
      { en: 'Cascading Thermal Waterfall Pool', ar: 'شلال المياه الحارة الطبيعي', descEn: 'Stand beneath hot mineral water pouring straight down canyon cliff walls.', descAr: 'الاستمتاع بتدفق المياه الكبريتية الحارة مباشرة على الجسم كتدليك طبيعي مريح.' },
      { en: 'Natural Steam Cave', ar: 'كهف البخار الطبيعي (الساونا الطبيعية)', descEn: 'Natural rock cavern filled with thermal vapor acting as an organic sauna.', descAr: 'كهف صخري طبيعي تنبعث منه الأبخرة المعدنية الحارة ليعمل كساونا طبيعية نقية.' }
    ]
  },
  {
    id: 'jerash_colonnade',
    lat: 32.2790,
    lng: 35.8930,
    tag: 'HISTORY',
    tagAr: 'تاريخ',
    c: 'history',
    n: 'Jerash Colonnade & Cardo',
    a: 'شارع الأعمدة — جرش',
    r: 'Jerash',
    ra: 'جرش',
    sub: 'Golden columns, blue skies and promenade',
    subAr: 'أعمدة ذهبية وتاريخ عريق',
    o: 2.1,
    d: 0.5,
    cost: 20,
    s: 'Golden columns, blue skies and promenade',
    sa: 'أعمدة ذهبية وتاريخ عريق',
    why: 'Walk the ancient stone-paved Cardo Maximus lined with dozens of towering Corinthian pillars that still bear the cart tracks of ancient Roman merchants.',
    whyAr: 'امشِ في شارع الكاردو المرصوف بالحجارة الرومانية والمحاط بعشرات الأعمدة التاريخية التي لا تزال تحتفظ بآثار عجلات العربات الرومانية القديمة.',
    best: 'Roman Architecture • Photography',
    bestAr: 'العمارة الرومانية • التصوير',
    time: '2 hours',
    timeAr: 'ساعتان',
    tip: 'Look down to see the original subterranean sewer grates from 2,000 years ago.',
    tipAr: 'انتبه للمصارف المائية الحجرية المنحوتة في أرضية الشارع منذ 2000 عام.',
    ticket: 'Included in Jerash General Entry',
    ticketAr: 'مشمول في تذكرة دخول جرش العامة',
    hours: 'Same as Jerash Archaeological Site',
    hoursAr: 'نفس أوقات موقع جرش الأثري',
    season: 'Year-round',
    seasonAr: 'طوال العام',
    food: 'Jerash sesame bread & local mountain olives',
    foodAr: 'كعك القدس بالسمسم وزيتون جرش البلدي',
    highlights: [
      { en: 'The Nymphaeum Public Fountain', ar: 'سبيل الحوريات الرخامي (النمفيوم)', descEn: 'Ornate two-story public fountain adorned with carved lion heads.', descAr: 'نافورة عامة رخامية من طابقين كانت تتدفق منها المياه عبر رؤوس الأسود المنحوتة.' },
      { en: 'Cathedral & Byzantine Churches', ar: 'الكاتدرائية والكنائس البيزنطية', descEn: 'Stone steps leading to ancient chapels with intact mosaic floors.', descAr: 'بقايا كنائس بيزنطية تضم لوحات فسيفسائية ملونة تحكي قصص الماضي.' }
    ]
  },
  {
    id: 'wadirum_night',
    lat: 29.5733,
    lng: 35.4333,
    tag: 'NIGHT',
    tagAr: 'ليلي',
    c: 'adventure',
    n: 'Wadi Rum Stargazing',
    a: 'وادي رم ليلاً',
    r: 'Aqaba',
    ra: 'العقبة',
    sub: 'Dome camps under the Milky Way',
    subAr: 'سماء مرصعة بالنجوم وتجربة فريدة',
    o: 5.2,
    d: 1,
    cost: 95,
    s: 'Dome camps under the starry Milky Way',
    sa: 'سماء مرصعة بالنجوم وتجربة فريدة',
    why: 'Minimal light pollution makes Wadi Rum one of the clearest night sky viewing spots in the world, where the Milky Way, meteor showers, and satellites are clearly visible to the naked eye.',
    whyAr: 'انعدام التلوث الضوئي يجعل وادي رم من أصفى بقاع العالم لرؤية النجوم والمجرات، حيث يمكن رؤية درب التبانة والشهب بالعين المجردة بكل وضوح وسحر.',
    best: 'Stargazing • Astrophotography',
    bestAr: 'رصد النجوم • التصوير الليلي • السهرات البدوية',
    time: 'Night stay',
    timeAr: 'إقامة ليلية',
    tip: 'Join a guided telescope astronomy tour with a local Bedouin expert.',
    tipAr: 'شارك في جلسة الرصد الفلكي الموجهة بالتلسكوبات الاحترافية مع خبراء الفلك المحليين.',
    ticket: 'Included in Camp Bookings',
    ticketAr: 'مشمول في حجوزات المخيمات',
    hours: 'Dusk to Dawn',
    hoursAr: 'من الغروب حتى الفجر',
    season: 'New moon nights across the year',
    seasonAr: 'ليالي بداية الشهر الهجري (القمر الجديد) لصفاء الرؤية',
    food: 'Bedouin sweet mint & sage tea around the campfire',
    foodAr: 'الشاي البدوي على الحطب والمكسرات والحلويات الشرقية',
    highlights: [
      { en: 'Laser-Guided Astronomy Session', ar: 'جلسة الرصد الفلكي بالليزر والتلسكوب', descEn: 'Learn how Bedouin navigators read constellations for desert travel.', descAr: 'التعرف على النجوم والأبراج وكيف كان البدو يستدلون بها في رحلاتهم الصحراوية.' },
      { en: 'Campfire Stories & Oud Music', ar: 'جلسة السمر على العود وأنغام البادية', descEn: 'Authentic desert hospitality with acoustic melodies and folklore stories.', descAr: 'أمسية دافئة حول موقد النار على أنغام آلة العود والربابة وحكايات الصحراء.' }
    ]
  },
  {
    id: 'ummqais',
    lat: 32.6564,
    lng: 35.6848,
    tag: 'HISTORY',
    tagAr: 'تاريخ',
    c: 'history',
    n: 'Umm Qais (Gadara)',
    a: 'أم قيس (جدارا)',
    r: 'Irbid',
    ra: 'إربد',
    sub: 'Black basalt ruins above the Jordan Valley',
    subAr: 'آثار بازلتية سوداء تطل على وادي الأردن',
    o: 1.2,
    d: 0.5,
    cost: 10,
    s: 'Ancient streets, sweeping views and a slower northern escape',
    sa: 'شوارع أثرية وإطلالات واسعة ورحلة هادئة في الشمال',
    why: 'Explore the basalt remains of ancient Gadara, where colonnaded streets, a Roman theatre and Ottoman-era houses overlook the Jordan Valley and the Sea of Galilee.',
    whyAr: 'اكتشف آثار مدينة جدارا المبنية بحجر البازلت، من الشوارع ذات الأعمدة والمسرح الروماني إلى البيوت العثمانية، مع إطلالات واسعة على وادي الأردن وبحيرة طبريا.',
    best: 'Roman history • Valley viewpoints • Village walks',
    bestAr: 'التاريخ الروماني • إطلالات الوادي • جولات القرية',
    time: 'Half day',
    timeAr: 'نصف يوم',
    tip: 'Visit in spring for green hills and clear views; bring a light layer for the breezy hilltop.',
    tipAr: 'زرها في الربيع للاستمتاع بالتلال الخضراء وصفاء الإطلالة، وخذ معك سترة خفيفة للهواء.',
    ticket: 'Jordan Pass accepted; check current rates before visiting.',
    ticketAr: 'تُقبل بطاقة Jordan Pass؛ تحقق من الرسوم الحالية قبل الزيارة.',
    hours: 'Daytime opening hours; confirm locally before your visit.',
    hoursAr: 'تُزار نهاراً؛ تحقق من أوقات العمل محلياً قبل الانطلاق.',
    season: 'Spring and early autumn',
    seasonAr: 'الربيع وبداية الخريف',
    food: 'Local olive oil, seasonal produce and northern Jordanian dishes',
    foodAr: 'زيت الزيتون المحلي وموسم الخضار وأطباق شمال الأردن',
    highlights: [
      { en: 'Roman Theatre', ar: 'المسرح الروماني', descEn: 'A dark basalt theatre set against the northern hills.', descAr: 'مسرح من حجر البازلت الداكن تحيط به تلال الشمال.' },
      { en: 'Colonnaded Street', ar: 'شارع الأعمدة', descEn: 'Walk the ancient streets through the remains of Gadara.', descAr: 'تجول في شوارع جدارا القديمة بين بقايا المدينة الأثرية.' },
      { en: 'The Hilltop Viewpoint', ar: 'الإطلالة من أعلى التلة', descEn: 'Wide views across the Jordan Valley and nearby lake country.', descAr: 'إطلالة واسعة على وادي الأردن والمناطق المحيطة ببحيرة طبريا.' }
    ]
  },
  {
    id: 'salt',
    lat: 32.0392,
    lng: 35.7272,
    tag: 'CULTURE',
    tagAr: 'تراث',
    c: 'history',
    n: 'As-Salt',
    a: 'السلط',
    r: 'Balqa',
    ra: 'البلقاء',
    sub: 'Historic hillside streets and yellow-stone houses',
    subAr: 'شوارع جبلية وبيوت تراثية من الحجر الأصفر',
    o: 2.2,
    d: 0.5,
    cost: 12,
    s: 'A walk through Jordanian hospitality and living heritage',
    sa: 'جولة بين كرم الضيافة والتراث الأردني الحي',
    why: 'As-Salt grew as a regional trading town, with distinctive yellow limestone homes and close-knit neighbourhoods. Its historic centre is recognized for its urban heritage and warm local hospitality.',
    whyAr: 'نمت السلط مدينةً تجارية مهمة، وتشتهر ببيوتها المتلاصقة المبنية بالحجر الأصفر وأحيائها القديمة. يجمع مركزها التاريخي بين العمارة التراثية وكرم الضيافة الأردني.',
    best: 'Heritage walks • Architecture • Local food',
    bestAr: 'جولات تراثية • عمارة قديمة • مأكولات محلية',
    time: 'Half day',
    timeAr: 'نصف يوم',
    tip: 'Wear comfortable shoes for the steep lanes and ask locally about guided heritage walks.',
    tipAr: 'ارتدِ حذاءً مريحاً بسبب الشوارع المنحدرة، واسأل عن الجولات التراثية المحلية.',
    ticket: 'The old town is open to explore; some museums may charge admission.',
    ticketAr: 'يمكن التجول في البلدة القديمة؛ وقد تفرض بعض المتاحف رسوم دخول.',
    hours: 'Outdoor walks are best in daylight; museum hours vary.',
    hoursAr: 'تُفضّل الجولات الخارجية نهاراً؛ وتختلف ساعات المتاحف.',
    season: 'Spring and autumn',
    seasonAr: 'الربيع والخريف',
    food: 'Traditional Jordanian dishes, sweets and local olive oil',
    foodAr: 'أطباق أردنية تقليدية وحلويات وزيت زيتون محلي',
    highlights: [
      { en: 'Historic Old Town', ar: 'وسط المدينة التاريخي', descEn: 'Explore the layered lanes and traditional limestone architecture.', descAr: 'اكتشف الأزقة المتدرجة والعمارة التقليدية من الحجر الجيري.' },
      { en: 'Abu Jaber House', ar: 'بيت أبو جابر', descEn: 'A landmark historic home that tells the story of As-Salt merchants.', descAr: 'بيت تراثي بارز يروي جانباً من تاريخ تجار السلط.' },
      { en: 'Hammam Street', ar: 'شارع الحمام', descEn: 'A lively historic street lined with shops and everyday local life.', descAr: 'شارع تاريخي نابض بالمحلات وتفاصيل الحياة اليومية.' }
    ]
  },
  {
    id: 'amman',
    lat: 31.9539,
    lng: 35.9106,
    tag: 'CITY',
    tagAr: 'مدينة',
    c: 'history',
    n: 'Amman',
    a: 'عمّان',
    r: 'Central Jordan',
    ra: 'وسط الأردن',
    sub: 'Citadel views, lively streets and local cafés',
    subAr: 'إطلالات القلعة وشوارع نابضة ومقاهٍ محلية',
    o: 0.4,
    d: 0.5,
    cost: 25,
    s: 'A welcoming capital with layers of history and everyday life',
    sa: 'عاصمة دافئة تجمع طبقات التاريخ والحياة اليومية',
    why: 'Explore Jordan’s capital through the Citadel and Roman Theatre, then head down to the old markets, neighbourhood cafés and lively Rainbow Street.',
    whyAr: 'اكتشف عاصمة الأردن من جبل القلعة والمدرج الروماني، ثم تجوّل في الأسواق القديمة ومقاهي الأحياء وشارع الرينبو النابض بالحياة.',
    best: 'City walks • History • Local food',
    bestAr: 'جولات المدينة • التاريخ • المأكولات المحلية',
    time: 'Half to full day',
    timeAr: 'نصف يوم إلى يوم كامل',
    tip: 'Plan the Citadel and Roman Theatre together, then leave time to explore the downtown streets on foot.',
    tipAr: 'اجمع زيارة جبل القلعة والمدرج الروماني في جولة واحدة، واترك وقتاً لاستكشاف شوارع وسط البلد سيراً.',
    ticket: 'Admission fees apply at some historic sites.',
    ticketAr: 'تُفرض رسوم دخول على بعض المواقع الأثرية.',
    hours: 'Site and museum hours vary; check before visiting.',
    hoursAr: 'تختلف ساعات المواقع والمتاحف؛ تحقق منها قبل الزيارة.',
    season: 'Spring and autumn',
    seasonAr: 'الربيع والخريف',
    food: 'Falafel, hummus, kunafa and traditional Jordanian dishes',
    foodAr: 'الفلافل والحمص والكنافة والأطباق الأردنية التقليدية',
    highlights: [
      { en: 'Amman Citadel', ar: 'جبل القلعة', descEn: 'Ancient remains and broad views across the city.', descAr: 'آثار قديمة وإطلالات واسعة على المدينة.' },
      { en: 'Roman Theatre', ar: 'المدرج الروماني', descEn: 'A landmark Roman theatre set in the heart of downtown.', descAr: 'مدرج روماني بارز في قلب وسط البلد.' },
      { en: 'Rainbow Street', ar: 'شارع الرينبو', descEn: 'A popular street for cafés, local shops and an evening walk.', descAr: 'شارع معروف بالمقاهي والمتاجر المحلية والتنزه مساءً.' }
    ]
  }
];

// Passport Stamps
const PASSPORT_STAMPS = [
  { id: 'petra', n: 'Petra', a: 'البتراء', c: 'History', ca: 'تاريخ', color: '#C8674A', unlocked: true },
  { id: 'wadirum', n: 'Wadi Rum', a: 'وادي رم', c: 'Desert', ca: 'صحراء', color: '#D4A04A', unlocked: true },
  { id: 'aqaba', n: 'Aqaba', a: 'العقبة', c: 'Coast', ca: 'ساحل', color: '#2E86B8', unlocked: true },
  { id: 'ajloun', n: 'Ajloun', a: 'عجلون', c: 'Nature', ca: 'طبيعة', color: '#5A6E52', unlocked: true },
  { id: 'jerash', n: 'Jerash', a: 'جرش', c: 'History', ca: 'تاريخ', color: '#D8BC9A', unlocked: true },
  { id: 'amman', n: 'Amman', a: 'عمان', c: 'City', ca: 'مدينة', color: '#26323D', unlocked: true },
  { id: 'salt', n: 'Salt', a: 'السلط', c: 'City', ca: 'تراث', color: '#347058', unlocked: true },
  { id: 'ummqais', n: 'Umm Qais', a: 'أم قيس', c: 'Nature', ca: 'طبيعة', color: '#7E8B9B', unlocked: false },
  { id: 'dana', n: 'Dana', a: 'دانا', c: 'Nature', ca: 'طبيعة', color: '#7E8B9B', unlocked: false },
  { id: 'karak', n: 'Karak', a: 'الكرك', c: 'History', ca: 'تاريخ', color: '#7E8B9B', unlocked: false },
  { id: 'madaba', n: 'Madaba', a: 'مادبا', c: 'Culture', ca: 'ثقافة', color: '#7E8B9B', unlocked: false },
  { id: 'deadsea', n: 'Dead Sea', a: 'البحر الميت', c: 'Wellness', ca: 'استجمام', color: '#7E8B9B', unlocked: false }
];

// Translations Dictionary
const I18N = {
  en: {
    logoAr: 'دليل',
    discover: 'Discover',
    plan: 'Plan a trip',
    exp: 'Experiences',
    stories: 'Stories',
    signin: 'Sign in',
    out: 'Sign out',
    made: 'MADE FOR JORDAN',
    h1: 'Find the Jordan that feels like yours.',
    hp: 'Not another travel directory. Dalil turns your time, mood and budget into a route built around the Jordan you actually want to experience.',
    where: 'Where do you want to go?',
    any: 'Anywhere in Jordan',
    when: 'When?',
    chooseDates: 'Choose dates',
    trav: 'Travelers',
    twoPeople: '2 people',
    start: 'Start exploring',
    choose: 'Choose your Jordan',
    feel: "Start with a feeling. We'll take care of the route.",
    cta: 'Tell us your days, budget and travel style.',
    cta2: 'Dalil turns it into a day-by-day route you can edit, save and share.',
    build60: 'BUILD A TRIP IN 60 SECONDS',
    build: 'Build my trip',
    buildRoute: 'Build a route',
    mapView: 'Map view',
    listView: 'List view',
    disc: 'Discover Jordan',
    discSub: 'Places worth the detour — from iconic stops to quiet local finds.',
    searchPlaceholder: 'Search "sunset", "north", "food", "Petra"…',
    moreHighlights: 'More highlights',
    moreHighlightsSub: 'Fresh additions curated from your supplied references',
    foodTitle: 'Jordanian food',
    foodIntro: 'A taste of Jordan, one beloved dish at a time.',
    ingredients: 'Ingredients',
    backToFood: 'Back to Jordanian food',
    route: 'Your route',
    save0: "Start saving places. We'll keep the route tidy.",
    savedPlaces: 'Saved places',
    add: 'Add to my trip',
    addToTrip: 'Add Petra to Trip',
    why: 'Why it belongs on your route',
    pairWith: 'Pair it with',
    makeYours: 'Make it yours',
    makeYoursSub: "Add Petra to a trip and we'll place it where it makes sense in your route.",
    yourDay: 'Your day',
    cont: 'Continue',
    back: 'Back',
    bt: 'Build your trip',
    btSub: 'A few choices. One route that actually fits.',
    essentials: 'Start with the essentials',
    essentialsSub: "We'll use this to shape the route.",
    days: 'How many days?',
    bud: 'Budget per person',
    from: 'Starting from',
    mode: 'Transport',
    with: 'Who are you traveling with?',
    likes: 'What sounds most like you?',
    solo: ['Solo', 'Couple', 'Friends', 'Family'],
    guideOptions: 'Tour guide',
    guideOptionsSub: 'Choose independent travel or add a guide to your itinerary.',
    selfGuided: 'No guide',
    groupTour: 'Join a group tour',
    privateGuide: 'Private guide',
    groupTourPrice: '25 JOD per traveler',
    privateGuidePrice: '60 JOD per trip',
    travelerCount: 'Number of travelers',
    travelerUnit: 'travelers',
    travelDate: 'Tour date',
    demoPaymentNotice: 'Demo checkout only. No real payment is processed. Do not enter real card details.',
    demoCardLabel: 'Test card number',
    demoCardPlaceholder: '4242 4242 4242 4242',
    demoPaymentSuccess: 'Demo booking confirmed. No money was charged.',
    bookingConfirmed: 'Booking confirmed',
    tourTypeLabel: 'Tour option',
    paymentError: 'Check the card number, expiry date, and security code.',
    paymentPersistenceError: 'The demo booking was confirmed, but could not be saved to your account.',
    guidedBooking: 'Guided tour',
    noGuide: 'No guide selected',
    securityCode: 'Test security code',
    confirmDemoBooking: 'Confirm demo booking',
    detailsStep: 'Details',
    paymentStep: 'Payment',
    confirmedStep: 'Confirmed',
    totalLabel: 'Total',
    stayLabel: 'Stay',
    guestCountLabel: 'Guests',
    guestUnit: 'guests',
    experienceLabel: 'Experience',
    oneNight: '1 night',
    privateDome: 'Private dome',
    wadiMealDetails: 'Dinner + breakfast',
    st: ['Basics', 'Interests', 'Pace', 'Ready'],
    pace: 'Pick your pace',
    slow: 'Slow',
    bal: 'Balanced',
    fast: 'Packed',
    yours: d => `Your Jordan — ${d} days`,
    yoursSub: 'Balanced for a couple, mid-range budget, nature + hidden places.',
    save: 'Save route',
    editTrip: 'Edit trip',
    driving: 'Driving',
    stops: 'Stops',
    budget: 'Budget',
    localNote: 'A local note',
    tipTitle: "Don't rush day 2.",
    tip: 'Wadi Rum works better when you leave room for the sunset, tea and the quiet after dinner.',
    reserve: 'Reserve experience',
    night: 'Wadi Rum night',
    nightSub: 'A desert stay built around the sky, not the schedule.',
    theExp: 'The experience',
    theExpSub: 'Arrive before sunset, settle into the camp, share dinner and stay out late enough to see the desert change after dark. This is designed as a slow experience, not a checklist.',
    whatsIncluded: ["Sunset transfer", "Dinner + breakfast", "Private dome stay", "Stargazing time"],
    hostedLocally: 'Hosted locally',
    hostTeam: 'Local camp team',
    hostLangs: 'Arabic • English',
    msgHost: 'Message host',
    planStay: 'Plan this stay',
    planStaySub: 'Choose a night and add it directly to your route.',
    guests: 'Travelers',
    date: 'Date',
    pay: 'Pay',
    payT: 'Complete your booking',
    bookingSub: 'Wadi Rum night • 1 night • 2 guests',
    paymentTitle: 'Payment',
    paymentSub: 'Secure checkout • Your card details are never shown to hosts.',
    cardN: 'Name on card',
    cardNo: 'Card number',
    exp2: 'Expiry',
    saveCard: 'Save this card for future trips',
    payTerms: 'By continuing, you agree to Dalil booking and cancellation terms.',
    bookingSummary: 'BOOKING SUMMARY',
    ok: 'Booking confirmed — new stamp added to your passport!',
    login: 'Please sign in first.',
    hi: 'Good evening',
    takingShape: 'Your next Jordan is already taking shape.',
    upcomingTrip: 'UPCOMING TRIP',
    tripReady: 'Trip ready 70%',
    openItinerary: 'Open itinerary',
    weekendSec: 'For your next free weekend',
    weekendSub: 'Based on what you save and how you travel',
    pass: 'Jordan Passport',
    passS: 'Collect places, not just photos.',
    yourStamps: 'Your stamps',
    stampsSub: 'Each one unlocks after a completed visit or experience.',
    regions: 'regions explored',
    explorerPass: 'EXPLORER PASS',
    memberSince: 'Member since 2026',
    ov: 'Overview',
    trips: 'My trips',
    sv: 'Saved places',
    msg: 'Messages',
    prof: 'Profile',
    tripsN: 'Trips planned',
    nextBadge: 'Next badge',
    badgeName: 'Northern Explorer',
    badgePlaces: '2 places to unlock',
    perN: 'per night',
    empty: 'Enter email and password (6+ characters).',
    signup: 'Create account',
    searchBtn: 'Search',
    googleSignIn: 'Continue with Google',
    orEmail: 'or with email',
    practicalGuide: 'Practical Tourist Guide',
    keyHighlights: 'Must-See Highlights',
    localFoodGuide: 'Authentic Local Food & Drink',
    ticketsInfo: 'Tickets & Entry',
    openingHours: 'Opening Hours',
    bestSeason: 'Best Time to Visit',
    openInGmaps: 'Open in Google Maps',
    openRouteGmaps: 'Open Driving Route in Google Maps',
    cats: {
      all: 'All',
      adventure: 'Adventure',
      nature: 'Nature',
      history: 'History',
      coast: 'Coast',
      desert: 'Desert',
      food: 'Local food',
      hidden: 'Hidden gems',
      slow: 'Slow travel'
    }
  },
  ar: {
    logoAr: 'دليل',
    discover: 'استكشف',
    plan: 'خطط رحلتك',
    exp: 'تجارب محلية',
    stories: 'قصص',
    signin: 'تسجيل الدخول',
    out: 'تسجيل الخروج',
    made: 'مُصمم للأردن',
    h1: 'اكتشف الأردن الذي يشبهك.',
    hp: 'دليل ليس دليلاً سياحياً تقليدياً. أخبرنا عن وقتك، ومزاجك وميزانيتك، وسنبني لك مساراً يناسب التجربة التي تريد أن تعيشها فعلاً.',
    where: 'إلى أين تريد الذهاب؟',
    any: 'أي مكان في الأردن',
    when: 'متى؟',
    chooseDates: 'إختر التاريخ',
    trav: 'المسافرون',
    twoPeople: 'شخصان',
    start: 'ابدأ الاستكشاف',
    choose: 'اختر الأردن الذي يناسبك',
    feel: 'ابدأ بالإحساس، ونحن نبني لك الطريق.',
    cta: 'أخبرنا بعدد الأيام والميزانية وأسلوب السفر.',
    cta2: 'سنحولها إلى رحلة يومية يمكنك تعديلها وحفظها ومشاركتها.',
    build60: 'ابنِ رحلتك خلال 60 ثانية',
    build: 'ابنِ رحلتي',
    buildRoute: 'ابنِ مساراً',
    mapView: 'عرض الخريطة',
    listView: 'عرض القائمة',
    disc: 'استكشف الأردن',
    discSub: 'أماكن تستحق أن تغيّر طريقك من أجلها — من المعالم المعروفة إلى التجارب المحلية الهادئة.',
    searchPlaceholder: 'ابحث عن "غروب"، "الشمال"، "طعام"، "البتراء"…',
    moreHighlights: 'أماكن إضافية مختارة',
    moreHighlightsSub: 'إضافات مميزة تم اختيارها بعناية من معالم الأردن',
    foodTitle: 'أكلات أردنية',
    foodIntro: 'تعرّف على نكهات الأردن من خلال أطباقه المحبوبة.',
    ingredients: 'المكونات',
    backToFood: 'العودة إلى الأكلات الأردنية',
    route: 'مسارك',
    save0: 'احفظ الأماكن التي تعجبك، وسنرتب لك الطريق.',
    savedPlaces: 'الأماكن المحفوظة',
    add: 'أضفها لرحلتي',
    addToTrip: 'أضف البتراء لرحلتي',
    why: 'لماذا تستحق أن تكون ضمن مسارك؟',
    pairWith: 'اقترح معها',
    makeYours: 'اجعلها رحلتك',
    makeYoursSub: 'أضف البتراء إلى رحلة وسنضعها في المكان الأنسب داخل مسارك.',
    yourDay: 'برنامج يومك',
    cont: 'متابعة',
    back: 'رجوع',
    bt: 'ابنِ رحلتك',
    btSub: 'خيارات بسيطة. ومسار واحد يناسبك تماماً.',
    essentials: 'ابدأ بالأساسيات',
    essentialsSub: 'سنستخدم هذه المعلومات لتحديد المسار.',
    days: 'كم يوماً؟',
    bud: 'الميزانية للشخص',
    from: 'نقطة الانطلاق',
    mode: 'المواصلات',
    with: 'مع من تسافر؟',
    likes: 'ما الذي يشبهك؟',
    solo: ['وحيد', 'ثنائي', 'أصدقاء', 'عائلة'],
    guideOptions: 'المرشد السياحي',
    guideOptionsSub: 'اختر رحلة مستقلة أو أضف مرشداً إلى برنامجك.',
    selfGuided: 'بدون مرشد',
    groupTour: 'الانضمام إلى مجموعة سياحية',
    privateGuide: 'مرشد سياحي خاص',
    groupTourPrice: '25 ديناراً للشخص',
    privateGuidePrice: '60 ديناراً للرحلة',
    travelerCount: 'عدد المسافرين',
    travelerUnit: 'مسافرين',
    travelDate: 'تاريخ الجولة',
    demoPaymentNotice: 'هذه تجربة دفع تجريبية فقط ولا يتم خصم أي مبلغ. لا تدخل بيانات بطاقة حقيقية.',
    demoCardLabel: 'رقم بطاقة تجريبي',
    demoCardPlaceholder: '4242 4242 4242 4242',
    demoPaymentSuccess: 'تم تأكيد الحجز التجريبي. لم يتم خصم أي مبلغ.',
    bookingConfirmed: 'تم تأكيد الحجز',
    tourTypeLabel: 'نوع الجولة',
    paymentError: 'تحقق من رقم البطاقة وتاريخ الانتهاء ورمز الأمان.',
    paymentPersistenceError: 'تم تأكيد الحجز التجريبي، لكن تعذر حفظه في حسابك.',
    guidedBooking: 'جولة مع مرشد سياحي',
    noGuide: 'لم يتم اختيار مرشد',
    securityCode: 'رمز أمان تجريبي',
    confirmDemoBooking: 'تأكيد الحجز التجريبي',
    detailsStep: 'التفاصيل',
    paymentStep: 'الدفع',
    confirmedStep: 'تم التأكيد',
    totalLabel: 'المجموع',
    stayLabel: 'الإقامة',
    guestCountLabel: 'الضيوف',
    guestUnit: 'ضيوف',
    experienceLabel: 'التجربة',
    oneNight: 'ليلة واحدة',
    privateDome: 'قبة خاصة',
    wadiMealDetails: 'عشاء وإفطار',
    st: ['الأساسيات', 'الاهتمامات', 'الإيقاع', 'جاهز'],
    pace: 'اختر إيقاعك',
    slow: 'هادئ',
    bal: 'متوازن',
    fast: 'مزدحم ومكثف',
    yours: d => `أردنك — ${d} أيام`,
    yoursSub: 'متوازن لرحلة ثنائية، ميزانية متوسطة، طبيعة وأماكن مخفية.',
    save: 'احفظ المسار',
    editTrip: 'تعديل الرحلة',
    driving: 'القيادة',
    stops: 'المحطات',
    budget: 'الميزانية',
    localNote: 'ملاحظة محلية',
    tipTitle: 'لا تستعجل اليوم الثاني.',
    tip: 'وادي رم أجمل عندما تترك وقتاً للغروب، والشاي والهدوء بعد العشاء.',
    reserve: 'احجز التجربة',
    night: 'ليلة وادي رم',
    nightSub: 'إقامة في الصحراء مبنية على السماء وسكون الليل، لا على جدول زمني.',
    theExp: 'التجربة',
    theExpSub: 'صل قبل الغروب، واستقر في المخيم، وشارك العشاء، وابقَ حتى ترى الصحراء تتغير بعد حلول الظلام.',
    whatsIncluded: ["نقل وقت الغروب", "عشاء + إفطار", "إقامة في قبة خاصة", "جلسة تأمل النجوم"],
    hostedLocally: 'استضافة محلية',
    hostTeam: 'فريق المخيم المحلي',
    hostLangs: 'عربي • إنجليزي',
    msgHost: 'مراسلة المضيف',
    planStay: 'خطط لهذه الإقامة',
    planStaySub: 'اختر ليلة وأضفها مباشرة إلى مسارك.',
    guests: 'المسافرون',
    date: 'التاريخ',
    pay: 'ادفع',
    payT: 'أكمل حجزك',
    bookingSub: 'ليلة وادي رم • ليلة واحدة • ضيفان',
    paymentTitle: 'الدفع',
    paymentSub: 'دفع آمن • لا يتم مشاركة بيانات بطاقتك مع المضيفين.',
    cardN: 'الاسم على البطاقة',
    cardNo: 'رقم البطاقة',
    exp2: 'تاريخ الانتهاء',
    saveCard: 'احفظ هذه البطاقة للرحلات القادمة',
    payTerms: 'بالمتابعة، فإنك توافق على شروط الحجز والإلغاء في دليل.',
    bookingSummary: 'ملخص الحجز',
    ok: 'تم تأكيد الحجز — أُضيف ختم جديد إلى جواز سفرك!',
    login: 'يرجى تسجيل الدخول أولاً.',
    hi: 'مساء الخير',
    takingShape: 'رحلتك القادمة في الأردن تأخذ شكلها الآن.',
    upcomingTrip: 'رحلة قادمة',
    tripReady: 'الرحلة جاهزة 70%',
    openItinerary: 'افتح البرنامج',
    weekendSec: 'لعطلة نهاية الأسبوع القادمة',
    weekendSub: 'بناءً على ما تحفظه وطريقتك المفضلة في السفر',
    pass: 'جواز سفر الأردن',
    passS: 'اجمع الأماكن، لا الصور فقط.',
    yourStamps: 'أختامك',
    stampsSub: 'يتم تفعيل كل ختم بعد إتمام زيارة أو تجربة محلية.',
    regions: 'مناطق تم استكشافها',
    explorerPass: 'بطاقة المستكشف',
    memberSince: 'عضو منذ 2026',
    ov: 'نظرة عامة',
    trips: 'رحلاتي',
    sv: 'الأماكن المحفوظة',
    msg: 'الرسائل',
    prof: 'الملف الشخصي',
    tripsN: 'رحلات مخططة',
    nextBadge: 'الوسام القادم',
    badgeName: 'مستكشف الشمال',
    badgePlaces: 'مكانان لفتح الوسام',
    perN: 'لكل ليلة',
    empty: 'أدخل البريد الإلكتروني وكلمة المرور (6+ أحرف).',
    signup: 'إنشاء حساب جديد',
    searchBtn: 'بحث',
    googleSignIn: 'متابعة باستخدام Google',
    orEmail: 'أو عبر البريد الإلكتروني',
    practicalGuide: 'دليل السائح العملي',
    keyHighlights: 'أبرز معالم الموقع التي لا تفوت',
    localFoodGuide: 'المأكولات والمشروبات الشعبية',
    ticketsInfo: 'التذاكر والرسوم',
    openingHours: 'ساعات العمل',
    bestSeason: 'أفضل وقت للزيارة',
    openInGmaps: 'فتح في خرائط Google',
    openRouteGmaps: 'فتح مسار القيادة في خرائط Google',
    cats: {
      all: 'الكل',
      adventure: 'مغامرة',
      nature: 'طبيعة',
      history: 'تاريخ',
      coast: 'ساحل',
      desert: 'صحراء',
      food: 'أكل محلي',
      hidden: 'أماكن مخفية',
      slow: 'رحلة هادئة'
    }
  }
};

// Global Application State
const STATE = {
  lang: getLS('dalilLang') === 'ar' ? 'ar' : 'en',
  user: getLS('dalil_user'),
  saved: ['petra', 'wadirum'],
  stamps: ['petra', 'wadirum', 'aqaba', 'ajloun', 'jerash', 'amman', 'salt'],
  trips: [
    {
      id: 'trip-1',
      title: 'South Jordan',
      days: 4,
      places: ['petra', 'wadirum', 'aqaba'],
      progress: 70
    }
  ],
  cat: 'all',
  q: '',
  isMapView: false,
  step: 1,
  pref: {
    days: 4,
    budget: '120–220',
    from: 'Amman',
    mode: 'Rental car',
    who: 1,
    likes: ['adventure', 'nature', 'hidden'],
    pace: 1,
    tourType: 'none',
    travelers: 2,
    tourDate: getDefaultTourDate()
  },
  checkoutType: 'wadirum',
  bk: {
    date: '2026-10-18',
    guests: 2
  }
};

// Translation Helpers
const t = key => I18N[STATE.lang]?.[key] ?? I18N.en[key] ?? key;
const getName = place => (STATE.lang === 'ar' ? place.a : place.n);
const getSub = place => (STATE.lang === 'ar' ? place.sa : place.s);
const getTag = place => (STATE.lang === 'ar' ? place.tagAr : place.tag);
const matchesPlaceCategory = (place, category) => category === 'all'
  || place.c === category
  || (category === 'coast' && ['aqaba', 'deadsea'].includes(place.id))
  || (category === 'desert' && ['wadirum', 'wadirum_night'].includes(place.id))
  || (category === 'hidden' && ['north', 'ummqais'].includes(place.id))
  || (category === 'slow' && ['deadsea', 'main', 'ummqais'].includes(place.id));

// Toast Notification
const toast = msg => {
  const toastEl = $('#toast');
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 2800);
};

// State Persistence
const stateKey = () => (STATE.user?.uid ? STATE.user.uid : 'guest');

async function loadData() {
  const local = getLS(`dalil_${stateKey()}`);
  if (local) {
    if (Array.isArray(local.saved)) {
      STATE.saved = local.saved.filter(id => PLACES.some(place => place.id === id));
    }
    if (Array.isArray(local.stamps)) {
      STATE.stamps = local.stamps.filter(id => PASSPORT_STAMPS.some(stamp => stamp.id === id));
    }
    if (Array.isArray(local.trips)) STATE.trips = local.trips;
  }

  if (fb && STATE.user) {
    try {
      const docRef = fb.fsMod.doc(fb.db, 'users', STATE.user.uid, 'data', 'state');
      const snap = await fb.fsMod.getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        if (Array.isArray(data.saved)) {
          STATE.saved = data.saved.filter(id => PLACES.some(place => place.id === id));
        }
        if (Array.isArray(data.stamps)) {
          STATE.stamps = data.stamps.filter(id => PASSPORT_STAMPS.some(stamp => stamp.id === id));
        }
        if (Array.isArray(data.trips)) STATE.trips = data.trips;
      }
    } catch (e) {
      console.warn('Firestore load failed, using local backup', e);
    }
  }
}

async function persistData() {
  const payload = {
    saved: STATE.saved,
    stamps: STATE.stamps,
    trips: STATE.trips
  };
  setLS(`dalil_${stateKey()}`, payload);
  if (fb && STATE.user) {
    try {
      const docRef = fb.fsMod.doc(fb.db, 'users', STATE.user.uid, 'data', 'state');
      await fb.fsMod.setDoc(docRef, payload, { merge: true });
    } catch (e) {
      console.warn('Firestore write error:', e);
    }
  }
}

// Authentication Logic & User Profile Sync
if (fb) {
  fb.authMod.onAuthStateChanged(fb.auth, async u => {
    STATE.user = u;
    if (u) {
      try {
        // Sync user profile info to Firestore database
        const userProfileRef = fb.fsMod.doc(fb.db, 'users', u.uid);
        await fb.fsMod.setDoc(userProfileRef, {
          uid: u.uid,
          email: u.email,
          displayName: u.displayName || u.email.split('@')[0],
          photoURL: u.photoURL || null,
          lastLoginAt: Date.now()
        }, { merge: true });
      } catch (err) {
        console.warn('User profile sync error:', err);
      }
    }
    await loadData();
    render();
  });
} else {
  STATE.user = getLS('dalil_user');
  await loadData();
}

async function handleEmailAuth(isRegister) {
  const email = $('#em').value.trim();
  const pass = $('#pw').value;
  const errEl = $('#er');
  
  if (!email || pass.length < 6) {
    errEl.textContent = t('empty');
    return;
  }
  
  try {
    if (fb) {
      if (isRegister) {
        await fb.authMod.createUserWithEmailAndPassword(fb.auth, email, pass);
      } else {
        await fb.authMod.signInWithEmailAndPassword(fb.auth, email, pass);
      }
    } else {
      STATE.user = { uid: email, email, displayName: email.split('@')[0] };
      setLS('dalil_user', STATE.user);
      await loadData();
      render();
    }
    $('#dlg').close();
    toast(STATE.lang === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Signed in successfully');
  } catch (err) {
    errEl.textContent = err.message;
  }
}

// Google Sign-In Handler
async function handleGoogleAuth() {
  try {
    if (!fb) {
      $('#er').textContent = STATE.lang === 'ar'
        ? 'تسجيل الدخول عبر Google غير مهيأ. أضف إعدادات Firebase أولاً.'
        : 'Google sign-in is unavailable until Firebase is configured.';
      return;
    }
    await fb.authMod.signInWithPopup(fb.auth, fb.googleProvider);
    $('#dlg').close();
    toast(STATE.lang === 'ar' ? 'مرحباً بك! تم تسجيل الدخول عبر Google' : 'Welcome! Signed in with Google');
  } catch (err) {
    console.warn('Google sign-in:', err);
    $('#er').textContent = err.message;
  }
}

// Event Listeners for Header Actions
$('#googleAuth').addEventListener('click', handleGoogleAuth);
$('#go').addEventListener('click', () => handleEmailAuth(false));
$('#reg').addEventListener('click', () => handleEmailAuth(true));
$('#closeDlg').addEventListener('click', () => $('#dlg').close());

$('#auth').addEventListener('click', async () => {
  if (STATE.user) {
    if (fb) {
      await fb.authMod.signOut(fb.auth);
    } else {
      removeLS('dalil_user');
      STATE.user = null;
      await loadData();
      render();
    }
    toast(STATE.lang === 'ar' ? 'تم تسجيل الخروج' : 'Signed out');
  } else {
    $('#dT').textContent = t('signin');
    $('#dSub').textContent = STATE.lang === 'ar' ? 'سجّل دخولك للوصول إلى رحلاتك وأختام جواز سفرك.' : 'Access your saved routes, trips and Jordan Passport stamps.';
    $('#googleAuthText').textContent = t('googleSignIn');
    $('#orText').textContent = t('orEmail');
    $('#go').textContent = t('signin');
    $('#reg').textContent = t('signup');
    $('#er').textContent = '';
    $('#dlg').showModal();
  }
});

$('#lang').addEventListener('click', () => {
  STATE.lang = STATE.lang === 'en' ? 'ar' : 'en';
  setLS('dalilLang', STATE.lang);
  render();
});

$('#searchNavBtn').addEventListener('click', () => {
  location.hash = '#/discover';
});

// Trip Algorithm Builder
function generateTripPlan() {
  const days = Math.min(7, Math.max(2, Math.floor(Number(STATE.pref.days) || 2)));
  const likes = Array.isArray(STATE.pref.likes) ? STATE.pref.likes : [];
  const pace = Math.min(2, Math.max(0, Number(STATE.pref.pace) || 0));
  const startsInAqaba = STATE.pref.from === 'Aqaba';
  const candidates = PLACES.filter(place =>
    !['wadirum_night', 'jerash_colonnade'].includes(place.id)
    && !(startsInAqaba && place.id === 'aqaba')
  );
  const filtered = candidates.map(place => ({
    place,
    score: (likes.includes(place.c) ? 4 : 0) + (['petra', 'wadirum'].includes(place.id) ? 3 : 0)
  })).sort((a, b) => b.score - a.score || a.place.o - b.place.o);

  const selected = [];
  let currentDays = 0;
  const maxStops = Math.min(candidates.length, days + pace);
  const maxVisitDays = days + pace * 0.5;
  for (const item of filtered) {
    if (currentDays + item.place.d <= maxVisitDays && selected.length < maxStops) {
      selected.push(item.place);
      currentDays += item.place.d;
    }
  }

  selected.sort((a, b) => (a.o - b.o) * (startsInAqaba ? -1 : 1));
  selected.sort((a, b) => a.o - b.o);

  const daysPlan = Array.from({ length: days }, () => []);
  selected.forEach((place, index) => {
    const dayIndex = Math.min(days - 1, Math.floor(index * days / selected.length));
    daysPlan[dayIndex].push(place);
  });

  const totalCost = selected.reduce((sum, p) => sum + p.cost, 0) + days * 30;
  const driveHours = Math.max(1, Math.round(Math.abs((selected.at(-1)?.o || 6) - (selected[0]?.o || 1)) * 1.5 + days * 1.2));

  return {
    plan: daysPlan,
    stops: selected.length,
    cost: totalCost,
    drive: driveHours
  };
}

// Card Renderer with clean white badge and heart icon matching Figma
const renderCard = place => {
  const isSaved = STATE.saved.includes(place.id);
  return `
    <article class="card" onclick="location.hash='#/place/${place.id}'">
      <div class="card-img-wrap" style="${getPlaceImageStyle(place)}">
        <span class="badge">${getTag(place)}</span>
        <button type="button" class="card-heart-btn ${isSaved ? 'on' : ''}" data-save="${place.id}" aria-label="${STATE.lang === 'ar' ? 'حفظ المكان' : 'Save place'}" aria-pressed="${isSaved}">
          ${isSaved ? '♥' : '♡'}
        </button>
      </div>
      <div class="card-body">
        <h4 class="card-title">${getName(place)}</h4>
        <p class="card-sub">${getSub(place)}</p>
      </div>
    </article>
  `;
};

const renderFoodCard = dish => `
  <a class="food-card" href="#/food/${dish.id}">
    <img src="${dish.image}" alt="${getFoodName(dish)}" loading="lazy">
    <div class="food-card-body">
      <h2>${getFoodName(dish)}</h2>
      <span>${STATE.lang === 'ar' ? 'اعرف المزيد' : 'Discover more'}</span>
    </div>
  </a>
`;

// Route Map Vector Canvas
const renderRouteMap = () => {
  const points = [
    { name: 'Amman', nameAr: 'عمان', x: 25, y: 30 },
    { name: 'Petra', nameAr: 'البتراء', x: 50, y: 55 },
    { name: 'Wadi Rum', nameAr: 'وادي رم', x: 70, y: 70 },
    { name: 'Aqaba', nameAr: 'العقبة', x: 88, y: 82 }
  ];

  return `
    <div class="route-map-container">
      <svg class="map-svg" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path d="M 80,45 Q 160,85 240,115 T 350,160" fill="none" stroke="#C8674A" stroke-width="2.5" stroke-dasharray="6,6" opacity="0.85" />
      </svg>
      ${points.map(pt => `
        <div class="map-pin" style="left: ${pt.x}%; top: ${pt.y}%;">
          <div class="pin-dot"></div>
          <span class="pin-label">${STATE.lang === 'ar' ? pt.nameAr : pt.name}</span>
        </div>
      `).join('')}
    </div>
  `;
};

// Leaflet Interactive Real Map Initializer
function initInteractiveMap(containerId, placesToRender, drawPolyline = false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (typeof L === 'undefined') {
    container.textContent = STATE.lang === 'ar'
      ? 'تعذر تحميل الخريطة. تحقق من اتصال الإنترنت ثم أعد المحاولة.'
      : 'The map could not load. Check your internet connection and try again.';
    return;
  }

  // Initialize Map centered on Jordan
  const map = L.map(containerId, { scrollWheelZoom: false }).setView([31.2, 35.8], 7.5);

  // CartoDB Voyager Tile Layer (clean warm palette)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors, © CARTO',
    maxZoom: 18
  }).addTo(map);

  const customPinIcon = L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="background:#C8674A; width:18px; height:18px; border-radius:50%; border:3px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  const latlngs = [];

  placesToRender.forEach(p => {
    if (p.lat && p.lng) {
      latlngs.push([p.lat, p.lng]);
      const marker = L.marker([p.lat, p.lng], { icon: customPinIcon }).addTo(map);
      
      const popupHtml = `
        <div style="min-width: 160px; font-family: inherit;">
          <h4 class="map-popup-title">${getName(p)}</h4>
          <p class="map-popup-sub">${STATE.lang === 'ar' ? p.ra : p.r} • ${getTag(p)}</p>
          <div style="display: flex; gap: 6px; margin-top: 6px;">
            <a class="map-popup-btn" href="#/place/${p.id}">${STATE.lang === 'ar' ? 'التفاصيل' : 'Details'}</a>
            <a class="map-popup-btn" style="background:#131922;" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}">Google Maps</a>
          </div>
        </div>
      `;
      marker.bindPopup(popupHtml);
    }
  });

  if (drawPolyline && latlngs.length > 1) {
    L.polyline(latlngs, { color: '#C8674A', weight: 4, dashArray: '6, 8', opacity: 0.85 }).addTo(map);
  }

  if (latlngs.length > 1) {
    map.fitBounds(latlngs, { padding: [30, 30] });
  } else if (latlngs.length === 1) {
    map.setView(latlngs[0], 11);
  }
}

// Filter Chips
const renderChips = (categories, activeCat, isMulti = false) => `
  <div class="chips">
    ${categories.map(cat => {
      const isActive = isMulti ? STATE.pref.likes.includes(cat) : activeCat === cat;
      const label = t('cats')[cat] || cat;
      return `
        <button type="button" class="chip-btn ${isActive ? 'active' : ''}" ${isMulti ? `data-like="${cat}"` : `data-cat="${cat}"`}>
          <span class="chip-icon">${cat === 'adventure' ? '+' : cat === 'nature' ? '•' : cat === 'history' ? '≡' : cat === 'hidden' ? '◇' : '•'}</span>
          <span>${label}</span>
        </button>
      `;
    }).join('')}
  </div>
`;

// Views Definitions
const VIEWS = {
  // 1. Home Page (Page 2 & 3)
  '': () => `
    <div class="hero" style="${getPlaceImageStyle(PLACES.find(place => place.id === 'petra'))}">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="badge badge-hero">${t('made')}</span>
        <h1>${t('h1')}</h1>
        <p class="hero-sub">${t('hp')}</p>
        
        <div class="search-card">
          <div class="search-field">
            <span class="search-field-label">${t('where')}</span>
            <input type="text" value="${t('any')}" id="homeSearchLoc" readonly>
          </div>
          <div class="search-divider"></div>
          <div class="search-field">
            <span class="search-field-label">${t('when')}</span>
            <input type="text" value="${t('chooseDates')}" id="homeSearchDate" readonly>
          </div>
          <div class="search-divider"></div>
          <div class="search-field">
            <span class="search-field-label">${t('trav')}</span>
            <select id="homeSearchTrav">
              <option>${t('twoPeople')}</option>
              <option>1 person</option>
              <option>4 people</option>
            </select>
          </div>
          <button type="button" class="pill pill-clay pill-arrow" onclick="location.hash='#/discover'">
            <span>${t('start')}</span>
            <span class="arrow-icon">›</span>
          </button>
        </div>
      </div>
    </div>

    <div class="wrap">
      <h2>${t('choose')}</h2>
      <p class="sub">${t('feel')}</p>
      
      ${renderChips(['all', 'adventure', 'nature', 'history', 'food', 'hidden', 'slow'], STATE.cat)}
      
      <div class="${STATE.cat === 'food' ? 'food-grid' : 'grid'}">
        ${STATE.cat === 'food'
          ? FOOD_DISHES.map(renderFoodCard).join('')
          : PLACES.filter(place => matchesPlaceCategory(place, STATE.cat)).slice(0, 4).map(renderCard).join('')}
      </div>

      <div class="cta-banner">
        <div>
          <span class="eyebrow" style="color: var(--sand);">${t('build60')}</span>
          <h2>${t('cta')}</h2>
          <p>${t('cta2')}</p>
        </div>
        <button type="button" class="pill pill-white pill-arrow" onclick="location.hash='#/trip'">
          <span>${t('build')}</span>
          <span class="arrow-icon">›</span>
        </button>
      </div>
    </div>
  `,

  // 2. Discover Jordan with Interactive Real Map (Page 4 & 5)
  discover: () => {
    const placesToDisplay = PLACES.filter(place => {
      const searchText = [place.n, place.a, place.r, place.ra, place.sub, place.subAr, place.why, place.whyAr].join(' ').toLowerCase();
      return matchesPlaceCategory(place, STATE.cat) && (!STATE.q || searchText.includes(STATE.q.trim().toLowerCase()));
    });

    if (STATE.cat !== 'food') {
      setTimeout(() => {
        if (STATE.isMapView) {
          initInteractiveMap('discoverFullMap', placesToDisplay);
        } else {
          initInteractiveMap('discoverRouteMap', STATE.saved.map(id => PLACES.find(p => p.id === id)).filter(Boolean), true);
        }
      }, 50);
    }

    return `
      <div class="wrap">
        <h1>${STATE.cat === 'food' ? t('foodTitle') : t('disc')}</h1>
        <p class="sub">${STATE.cat === 'food' ? t('foodIntro') : t('discSub')}</p>

        ${STATE.cat === 'food' ? '' : `
          <div class="row" style="margin: 20px 0 10px; gap: 12px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 260px; position: relative;">
              <input type="search" id="sq" class="form-input" value="${escapeHTML(STATE.q)}" placeholder="${t('searchPlaceholder')}" autocomplete="off">
            </div>
            <button type="button" class="pill ${STATE.isMapView ? 'pill-dark' : ''}" id="toggleMapBtn">
              ${STATE.isMapView ? t('listView') : t('mapView')}
            </button>
            <button type="button" class="pill pill-dark" onclick="location.hash='#/trip'">${t('buildRoute')}</button>
          </div>
        `}

        ${renderChips(['all', 'nature', 'history', 'coast', 'desert', 'hidden', 'food'], STATE.cat)}

        ${STATE.cat === 'food' ? `
          <div class="food-grid">
            ${FOOD_DISHES.map(renderFoodCard).join('')}
          </div>
        ` : STATE.isMapView ? `
          <div class="box" style="padding: 16px;">
            <div id="discoverFullMap" class="real-map-box" style="height: 480px;"></div>
          </div>
        ` : `
          <div class="two-col">
            <div class="grid">
              ${placesToDisplay.map(renderCard).join('')}
            </div>

            <div class="box">
              <h3>${t('route')}</h3>
              <p class="sub">${t('save0')}</p>
              
              <div id="discoverRouteMap" class="real-map-compact"></div>
              
              <h4 style="font-size: 13px; font-weight: 700; margin: 18px 0 10px;">${t('savedPlaces')}</h4>
              <div class="saved-list">
                ${STATE.saved.map((id, index) => {
                  const place = PLACES.find(p => p.id === id) || PLACES[0];
                  return `
                    <div class="saved-list-item">
                      <span class="saved-list-num">0${index + 1}</span>
                      <div style="flex: 1;">
                        <h5 style="font-size: 14px; font-weight: 700;">${getName(place)}</h5>
                        <span style="font-size: 12px; color: var(--mut);">${getTag(place)} • ${STATE.lang === 'ar' ? place.timeAr : place.time}</span>
                      </div>
                      <a href="https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}" target="_blank" rel="noopener" style="font-size: 11px; color: #1a73e8; font-weight: 600;">Maps ↗</a>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        `}

      </div>
    `;
  },

  food: id => {
    const dish = FOOD_DISHES.find(item => item.id === id);
    if (!dish) {
      return `
        <div class="wrap food-detail">
          <a class="food-back" href="#/discover" data-food-back>${t('backToFood')}</a>
          <h1>${t('foodTitle')}</h1>
        </div>
      `;
    }

    return `
      <article class="wrap food-detail">
        <a class="food-back" href="#/discover" data-food-back>${t('backToFood')}</a>
        <img class="food-detail-image" src="${dish.image}" alt="${getFoodName(dish)}">
        <h1>${getFoodName(dish)}</h1>
        <p class="food-description">${dish.description[STATE.lang]}</p>
        <h2>${t('ingredients')}</h2>
        <ul class="food-ingredients">
          ${dish.ingredients[STATE.lang].map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      </article>
    `;
  },

  // 3. Place Detail with Google Maps Integration (Page 6 & 7)
  place: id => {
    const place = PLACES.find(p => p.id === id) || PLACES[4];
    const isSaved = STATE.saved.includes(place.id);
    const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;

    setTimeout(() => {
      initInteractiveMap('placeDetailMap', [place]);
    }, 50);

    return `
      <div class="hero" style="min-height: 420px; ${getPlaceImageStyle(place)}">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <span class="badge badge-hero">${getTag(place)}</span>
          <h1 style="margin-top: 80px;">${getName(place)}</h1>
          <p class="hero-sub">${STATE.lang === 'ar' ? place.ra : place.r} • ${STATE.lang === 'ar' ? place.subAr : place.sub}</p>
          
          <div class="row" style="margin-top: 20px; flex-wrap: wrap;">
            <button type="button" class="pill" data-add="${place.id}">+ ${t('add')}</button>
            <a href="${gmapsUrl}" target="_blank" rel="noopener" class="gmaps-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>${t('openInGmaps')}</span>
            </a>
            <button type="button" class="pill pill-dark card-heart-btn ${isSaved ? 'on' : ''}" data-save="${place.id}" style="width: 42px; height: 42px; border-radius: 50%;">
              ${isSaved ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </div>

      <div class="wrap two-col">
        <div class="box">
          <h3>${t('why')}</h3>
          <p class="sub" style="font-size: 15px; margin: 12px 0 20px; line-height: 1.6;">${STATE.lang === 'ar' ? place.whyAr : place.why}</p>

          ${(PLACE_GALLERIES[place.id] || []).length ? `
            <div class="place-photo-grid">
              ${PLACE_GALLERIES[place.id].map(photo => `
                <figure class="place-photo">
                  <img src="${photo.src}" alt="${STATE.lang === 'ar' ? photo.ar : photo.en}" loading="lazy">
                  <figcaption>${STATE.lang === 'ar' ? photo.ar : photo.en}</figcaption>
                </figure>
              `).join('')}
            </div>
          ` : ''}
          
          <!-- Key Specs Overview -->
          <div class="specs-grid">
            <div class="spec-item">
              <span class="spec-label">${STATE.lang === 'ar' ? 'الأفضل لـ' : 'Best for'}</span>
              <span class="spec-val">${STATE.lang === 'ar' ? place.bestAr : place.best}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">${STATE.lang === 'ar' ? 'المدة المناسبة' : 'Time needed'}</span>
              <span class="spec-val">${STATE.lang === 'ar' ? place.timeAr : place.time}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">${STATE.lang === 'ar' ? 'نصيحة دليل' : 'Good to know'}</span>
              <span class="spec-val">${STATE.lang === 'ar' ? place.tipAr : place.tip}</span>
            </div>
          </div>

          <!-- Must-See Tourist Highlights -->
          ${place.highlights && place.highlights.length ? `
            <h4 style="margin: 28px 0 10px; font-size: 16px;">${t('keyHighlights')}</h4>
            <div class="tourist-highlights-list">
              ${place.highlights.map((h, i) => `
                <div class="highlight-item">
                  <span class="highlight-num">0${i + 1}</span>
                  <div class="highlight-content">
                    <h5>${STATE.lang === 'ar' ? h.ar : h.en}</h5>
                    <p>${STATE.lang === 'ar' ? h.descAr : h.descEn}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Practical Tourist Info Grid -->
          <h4 style="margin: 28px 0 10px; font-size: 16px;">${t('practicalGuide')}</h4>
          <div class="practical-guide-grid">
            <div class="guide-box">
              <small>${t('ticketsInfo')}</small>
              <p>${STATE.lang === 'ar' ? (place.ticketAr || 'مشمول في تذكرة الدخول') : (place.ticket || 'Included in entry ticket')}</p>
            </div>
            <div class="guide-box">
              <small>${t('openingHours')}</small>
              <p>${STATE.lang === 'ar' ? (place.hoursAr || 'طوال اليوم') : (place.hours || 'Open daily')}</p>
            </div>
            <div class="guide-box">
              <small>${t('bestSeason')}</small>
              <p>${STATE.lang === 'ar' ? (place.seasonAr || 'الربيع والخريف') : (place.season || 'Spring and Autumn')}</p>
            </div>
            <div class="guide-box">
              <small>${t('localFoodGuide')}</small>
              <p>${STATE.lang === 'ar' ? (place.foodAr || 'أكلات شعبية أردنية') : (place.food || 'Traditional local dining')}</p>
            </div>
          </div>

          <!-- Interactive Location Map -->
          <h4 style="margin: 28px 0 10px; font-size: 16px;">${STATE.lang === 'ar' ? 'الموقع الجغرافي والإحداثيات' : 'Geographic Location & Coordinates'}</h4>
          <div id="placeDetailMap" class="real-map-compact"></div>

          <h4 style="margin: 32px 0 14px; font-size: 16px;">${t('pairWith')}</h4>
          <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));">
            ${[PLACES[0], PLACES[1], PLACES[2]].map(renderCard).join('')}
          </div>
        </div>

        <div class="box dk">
          <h3>${t('makeYours')}</h3>
          <p class="sub" style="margin-bottom: 20px;">${t('makeYoursSub')}</p>
          
          <div class="row" style="justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid var(--border-dark);">
            <span style="font-weight: 700; font-size: 14px;">South Jordan • 4 days</span>
            <span style="font-size: 12px; color: var(--sand); cursor: pointer;" onclick="location.hash='#/trip'">${STATE.lang === 'ar' ? 'تعديل' : 'Edit'}</span>
          </div>

          <h5 style="font-size: 13px; color: #94a3b8; margin: 16px 0 10px;">${t('yourDay')}</h5>
          <div class="timeline">
            <div class="timeline-item"><div class="timeline-dot"></div><span>07:30 ${STATE.lang === 'ar' ? 'الدخول عبر السيق ومطل الخزنة' : 'Enter through the Siq'}</span></div>
            <div class="timeline-item"><div class="timeline-dot"></div><span>10:00 ${STATE.lang === 'ar' ? 'المسرح والقبور الملكية' : 'Treasury + royal tombs trail'}</span></div>
            <div class="timeline-item"><div class="timeline-dot"></div><span>13:00 ${STATE.lang === 'ar' ? 'استراحة غداء وشاي بالنعناع' : 'Lunch break & mint tea'}</span></div>
            <div class="timeline-item"><div class="timeline-dot"></div><span>15:00 ${STATE.lang === 'ar' ? 'مسار الدير والغروب البانورامي' : 'Monastery route & sunset view'}</span></div>
          </div>

          <button type="button" class="pill pill-clay" style="width: 100%; margin-top: 24px; padding: 14px;" data-add="${place.id}">
            ${t('addToTrip')}
          </button>
        </div>
      </div>
    `;
  },

  // 4. Build Your Trip Wizard (Page 8 & 15)
  trip: () => {
    const p = STATE.pref;
    return `
      <div class="wrap">
        <h1>${t('bt')}</h1>
        <p class="sub">${t('btSub')}</p>
        
        <div class="stepper">
          ${t('st').map((stepName, i) => {
            const stepNum = i + 1;
            const statusClass = stepNum === STATE.step ? 'active' : stepNum < STATE.step ? 'completed' : '';
            return `
              <div class="step-item ${statusClass}">
                <span class="step-num">${stepNum < STATE.step ? '✓' : stepNum}</span>
                <span>${stepName}</span>
              </div>
            `;
          }).join('')}
        </div>

        <div class="two-col">
          <div class="box">
            ${STATE.step === 1 ? `
              <h3>${t('essentials')}</h3>
              <p class="sub" style="margin-bottom: 20px;">${t('essentialsSub')}</p>
              
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="field-label">${t('days')}</label>
                  <select class="form-select" data-p="days">
                    ${[2, 3, 4, 5, 6, 7].map(n => `<option ${p.days == n ? 'selected' : ''} value="${n}">${n} ${STATE.lang === 'ar' ? 'أيام' : 'days'}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label class="field-label">${t('bud')}</label>
                  <select class="form-select" data-p="budget">
                    <option value="60–120" ${p.budget === '60–120' ? 'selected' : ''}>60–120 JOD</option>
                    <option value="120–220" ${p.budget === '120–220' ? 'selected' : ''}>120–220 JOD</option>
                    <option value="220+" ${p.budget === '220+' ? 'selected' : ''}>220+ JOD</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="field-label">${t('from')}</label>
                  <select class="form-select" data-p="from">
                    <option value="Amman" ${p.from === 'Amman' ? 'selected' : ''}>${STATE.lang === 'ar' ? 'عمان' : 'Amman'}</option>
                    <option value="Aqaba" ${p.from === 'Aqaba' ? 'selected' : ''}>${STATE.lang === 'ar' ? 'العقبة' : 'Aqaba'}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="field-label">${t('mode')}</label>
                  <select class="form-select" data-p="mode">
                    <option ${p.mode === 'Rental car' ? 'selected' : ''}>${STATE.lang === 'ar' ? 'سيارة مستأجرة' : 'Rental car'}</option>
                    <option ${p.mode === 'Taxi' ? 'selected' : ''}>${STATE.lang === 'ar' ? 'سائق خاص' : 'Private driver'}</option>
                  </select>
                </div>
              </div>

              <div class="form-group" style="margin-top: 10px;">
                <label class="field-label">${t('with')}</label>
                <div class="chips" style="margin: 8px 0 16px;">
                  ${t('solo').map((whoLabel, idx) => `
                    <button type="button" class="pill ${p.who === idx ? 'pill-dark' : ''}" data-who="${idx}">
                      ${whoLabel}
                    </button>
                  `).join('')}
                </div>
              </div>

              <section class="tour-options" aria-label="${t('guideOptions')}">
                <h3>${t('guideOptions')}</h3>
                <p class="sub">${t('guideOptionsSub')}</p>
                <div class="form-grid-2">
                  <div class="form-group">
                    <label class="field-label" for="tourType">${t('tourTypeLabel')}</label>
                    <select class="form-select" id="tourType" data-p="tourType">
                      <option value="none" ${p.tourType === 'none' ? 'selected' : ''}>${t('selfGuided')}</option>
                      <option value="group" ${p.tourType === 'group' ? 'selected' : ''}>${t('groupTour')} — ${t('groupTourPrice')}</option>
                      <option value="private" ${p.tourType === 'private' ? 'selected' : ''}>${t('privateGuide')} — ${t('privateGuidePrice')}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="field-label" for="tourTravelers">${t('travelerCount')}</label>
                    <input class="form-input" id="tourTravelers" type="number" min="1" max="20" step="1" value="${p.travelers}" data-p="travelers">
                  </div>
                  <div class="form-group">
                    <label class="field-label" for="tourDate">${t('travelDate')}</label>
                    <input class="form-input" id="tourDate" type="date" min="${getTodayDate()}" value="${p.tourDate}" data-p="tourDate">
                  </div>
                </div>
              </section>

              <div class="form-group">
                <label class="field-label">${t('likes')}</label>
                ${renderChips(['adventure', 'nature', 'history', 'food', 'hidden', 'slow'], null, true)}
              </div>
            ` : STATE.step === 2 ? `
              <h3>${t('likes')}</h3>
              <p class="sub" style="margin-bottom: 24px;">Select the themes and activities you love.</p>
              ${renderChips(['adventure', 'nature', 'history', 'food', 'hidden', 'slow'], null, true)}
            ` : STATE.step === 3 ? `
              <h3>${t('pace')}</h3>
              <p class="sub" style="margin-bottom: 24px;">How packed or relaxed do you want your schedule to be?</p>
              <div class="chips">
                ${[t('slow'), t('bal'), t('fast')].map((paceLabel, idx) => `
                  <button type="button" class="pill ${p.pace === idx ? 'pill-dark' : ''}" data-pace="${idx}">
                    ${paceLabel}
                  </button>
                `).join('')}
              </div>
            ` : `
              <h3>✓ Your plan is ready</h3>
              <p class="sub" style="margin: 14px 0 24px;">We've crafted a seamless ${p.days}-day itinerary tailored to you.</p>
              <div class="stats-grid">
                <div class="stat-box"><small>Days</small><b>${p.days}</b></div>
                <div class="stat-box"><small>Travelers</small><b>${t('solo')[p.who]}</b></div>
                <div class="stat-box"><small>Budget</small><b>${p.budget} JOD</b></div>
                <div class="stat-box"><small>${t('guideOptions')}</small><b>${p.tourType === 'group' ? t('groupTour') : p.tourType === 'private' ? t('privateGuide') : t('selfGuided')}</b></div>
                ${p.tourType !== 'none' ? `<div class="stat-box"><small>${t('bookingSummary')}</small><b>${getGuidedTourTotal(p.tourType, Number(p.travelers))} JOD</b></div>` : ''}
              </div>
            `}

            <div class="row" style="margin-top: 32px; justify-content: flex-end;">
              ${STATE.step > 1 ? `<button type="button" class="pill" id="bk">${t('back')}</button>` : ''}
              <button type="button" class="pill pill-clay pill-arrow" id="nx">
                <span>${STATE.step === 4 ? t('build') : t('cont')}</span>
                <span class="arrow-icon">›</span>
              </button>
            </div>
          </div>

          <!-- Live Preview Box -->
          <div class="box dk">
            <span class="eyebrow" style="color: var(--sand);">LIVE PREVIEW</span>
            <h2>Your Jordan</h2>
            <p class="sub" style="color: #cbd5e1; margin-bottom: 16px;">
              ${p.days} ${STATE.lang === 'ar' ? 'أيام' : 'days'} • ${t('solo')[p.who]} • ${p.budget} JOD
            </p>
            
            <div class="trip-preview-image" style="${getPlaceImageStyle(PLACES.find(place => place.id === 'wadirum'))}"></div>

            <span class="badge badge-clay" style="font-size: 11px; margin-bottom: 10px;">
              ${p.likes.map(l => t('cats')[l] || l).join(' + ')}
            </span>
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; margin-top: 8px;">
              We'll balance iconic places with local detours without turning the trip into a checklist.
            </p>
            
            <div style="margin-top: 20px; padding-top: 14px; border-top: 1px solid var(--border-dark); font-size: 12px; color: var(--sand);">
              Estimated route • South + North
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 5. Trip Result / Itinerary with Google Maps Navigation Route (Page 9)
  result: () => {
    const planResult = STATE.result || generateTripPlan();
    STATE.result = planResult;

    const allStops = [...new Set(planResult.plan.flat())];
    const gmapsRouteUrl = `https://www.google.com/maps/dir/${['Amman', ...allStops.map(p => p.n)].join('/')}`;

    setTimeout(() => {
      initInteractiveMap('tripResultRealMap', allStops, true);
    }, 50);

    return `
      <div class="wrap">
        <div class="row" style="justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap;">
          <div>
            <h1>${t('yours')(STATE.pref.days)}</h1>
            <p class="sub">${t('yoursSub')}</p>
          </div>
          <div class="row" style="margin-top: 8px; flex-wrap: wrap;">
            <a href="${gmapsRouteUrl}" target="_blank" rel="noopener" class="gmaps-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>${t('openRouteGmaps')}</span>
            </a>
            <button type="button" class="pill" onclick="location.hash='#/trip'">${t('editTrip')}</button>
            <button type="button" class="pill pill-dark" id="sv">${t('save')}</button>
          </div>
        </div>

        <div class="two-col">
          <div>
            ${planResult.plan.map((dayStops, idx) => {
              const firstPlace = dayStops[0];
              return `
                <div class="day-card">
                  <div class="day-thumb" style="${getPlaceImageStyle(firstPlace)}"></div>
                  <div class="day-info">
                    <span class="day-tag">DAY ${idx + 1} • ${STATE.pref.from.toUpperCase()} → ${getName(firstPlace).toUpperCase()}</span>
                    <h4 class="day-title">${dayStops.map(getName).join(' • ')}</h4>
                    <p class="sub" style="font-size: 13px; margin: 0;">${dayStops.map(place => STATE.lang === 'ar' ? place.ra : place.r).join(' • ')}</p>
                    <div class="row" style="margin-top: 8px; justify-content: space-between;">
                      <a href="https://www.google.com/maps/search/?api=1&query=${firstPlace.lat},${firstPlace.lng}" target="_blank" rel="noopener" style="font-size: 11px; color: #1a73e8; font-weight: 600;">Google Maps ↗</a>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div>
            <div class="box dk">
              <span class="eyebrow" style="color: var(--sand);">ROUTE OVERVIEW</span>
              <h3>${t('route')}</h3>
              <div id="tripResultRealMap" class="real-map-compact" style="border-color: var(--border-dark);"></div>
            </div>

            <div class="stats-grid">
              <div class="stat-box">
                <small>${t('driving')}</small>
                <b>${planResult.drive}h</b>
                <span>Across ${STATE.pref.days} days</span>
              </div>
              <div class="stat-box">
                <small>${t('stops')}</small>
                <b>${planResult.stops}</b>
                <span>Balanced pace</span>
              </div>
              <div class="stat-box">
                <small>${t('budget')}</small>
                <b>~${planResult.cost} JOD</b>
                <span>Per person</span>
              </div>
            </div>

            <div class="box" style="margin-top: 16px;">
              <span class="eyebrow">${t('localNote')}</span>
              <h4 style="margin: 4px 0 8px;">${t('tipTitle')}</h4>
              <p class="sub" style="line-height: 1.5;">${t('tip')}</p>
              <button type="button" class="pill pill-sand" style="width: 100%; margin-top: 18px;" onclick="location.hash='#/experience'">
                ${t('exp')}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 6. Experience Detail - Wadi Rum Night (Page 10)
  experience: () => `
    <div class="wrap" style="padding-top: 16px;">
      <div class="exp-gallery-hero exp-gallery-single">
        <div class="gallery-main" style="background-image: linear-gradient(180deg, rgba(19,25,34,0.2) 0%, rgba(19,25,34,0.85) 100%), url('${getPlaceImage(PLACES.find(place => place.id === 'wadirum'))}');">
          <span class="badge badge-hero">LOCAL STAY</span>
          <h1 style="margin-top: 120px;">${t('night')}</h1>
          <p style="color: #cbd5e1; font-size: 15px;">${t('nightSub')}</p>
        </div>
      </div>

      <div class="two-col">
        <div class="box">
          <h3>${t('theExp')}</h3>
          <p class="sub" style="font-size: 15px; line-height: 1.6; margin: 12px 0 24px;">${t('theExpSub')}</p>
          
          <h4 style="font-size: 13px; font-weight: 700; color: var(--mut); margin-bottom: 14px;">WHAT'S INCLUDED</h4>
          <div class="form-grid-2">
            ${t('whatsIncluded').map((item, idx) => `
              <div class="saved-list-item" style="border: none; padding: 6px 0;">
                <span class="saved-list-num">0${idx + 1}</span>
                <span style="font-weight: 600; font-size: 13.5px;">${item}</span>
              </div>
            `).join('')}
          </div>

          <div class="box" style="background: var(--sand-light); margin-top: 24px; padding: 20px; border-color: var(--border);">
            <div class="row" style="justify-content: space-between; flex-wrap: wrap;">
              <div>
                <span class="eyebrow">${t('hostedLocally')}</span>
                <h4 style="margin: 2px 0;">${t('hostTeam')}</h4>
                <p style="font-size: 12px; color: var(--mut);">${t('hostLangs')}</p>
              </div>
              <button type="button" class="pill pill-dark" style="font-size: 12px; padding: 8px 16px;">
                ${t('msgHost')}
              </button>
            </div>
          </div>
        </div>

        <div class="box dk">
          <h3>${t('planStay')}</h3>
          <p class="sub" style="margin-bottom: 20px;">${t('planStaySub')}</p>
          
          <div class="form-group">
            <label class="field-label" style="color: #94a3b8;">${t('date')}</label>
            <input type="date" class="form-input" id="bd" value="${STATE.bk.date}" style="background: #222b38; border-color: var(--border-dark); color: #fff;">
          </div>

          <div class="form-group">
            <label class="field-label" style="color: #94a3b8;">${t('guests')}</label>
            <select class="form-select" id="bg" style="background: #222b38; border-color: var(--border-dark); color: #fff;">
              <option value="1">1 guest</option>
              <option value="2" selected>2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
            </select>
          </div>

          <div style="margin: 24px 0 20px; display: flex; align-items: baseline; gap: 8px;">
            <b style="font-size: 32px; font-weight: 800; color: var(--sand);">95 JOD</b>
            <span style="font-size: 13px; color: #94a3b8;">${t('perN')}</span>
          </div>

          <button type="button" class="pill pill-clay" style="width: 100%; padding: 14px;" id="rs">
            ${t('reserve')}
          </button>
        </div>
      </div>
    </div>
  `,

  // 7. Checkout (Page 11)
  checkout: () => {
    const isGuided = STATE.checkoutType === 'guided';
    const total = isGuided
      ? getGuidedTourTotal(STATE.pref.tourType, Number(STATE.pref.travelers))
      : 95;
    const bookingName = isGuided
      ? STATE.pref.tourType === 'group' ? t('groupTour') : t('privateGuide')
      : t('night');
    return `
      <div class="wrap">
        <h1>${t('payT')}</h1>
        <p class="sub">${isGuided
          ? `${t('guidedBooking')} • ${bookingName} • ${STATE.pref.travelers} ${t('travelerUnit')} • ${STATE.pref.tourDate}`
          : t('bookingSub')}</p>

        <div class="stepper" style="margin: 20px 0 32px;">
          <div class="step-item completed"><span class="step-num">✓</span><span>1. ${t('detailsStep')}</span></div>
          <div class="step-item active"><span class="step-num">2</span><span>2. ${t('paymentStep')}</span></div>
          <div class="step-item"><span class="step-num">3</span><span>3. ${t('confirmedStep')}</span></div>
        </div>

        <div class="two-col">
          <div class="box">
            <h3>${t('paymentTitle')}</h3>
            <p class="demo-payment-notice" id="demoPaymentNotice" role="note">${t('demoPaymentNotice')}</p>
            <p class="sub" style="margin-bottom: 24px;">${t('demoCardLabel')}: ${t('demoCardPlaceholder')}</p>

            <div class="form-group">
              <label class="field-label" for="cc">${t('demoCardLabel')}</label>
              <input type="text" class="form-input" id="cc" value="4242424242424242" inputmode="numeric" autocomplete="off" maxlength="19" aria-describedby="demoPaymentNotice">
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="field-label" for="ce">${t('exp2')}</label>
                <input type="text" class="form-input" id="ce" value="12/30" placeholder="MM/YY" autocomplete="off" maxlength="5">
              </div>
              <div class="form-group">
                <label class="field-label" for="cv">${t('securityCode')}</label>
                <input type="password" class="form-input" id="cv" value="123" inputmode="numeric" autocomplete="off" maxlength="4">
              </div>
            </div>

            <button type="button" class="pill pill-clay" style="width: 100%; padding: 14px;" id="pay">
              ${t('confirmDemoBooking')} — ${total} JOD
            </button>

            <p style="font-size: 11px; color: var(--mut); margin-top: 14px; text-align: center;">${t('payTerms')}</p>
          </div>

          <div class="box dk">
            <span class="eyebrow" style="color: var(--sand);">${t('bookingSummary')}</span>
            <div class="trip-preview-image trip-preview-image-small" style="${getPlaceImageStyle(PLACES.find(place => place.id === 'wadirum'))}"></div>

            <h3 style="margin: 8px 0 2px;">${isGuided ? t('guidedBooking') : t('night')}</h3>
            <p style="font-size: 13px; color: #94a3b8; margin-bottom: 18px;">${isGuided
              ? `${bookingName} • ${STATE.pref.travelers} ${t('travelerUnit')}`
              : `${t('privateDome')} • ${STATE.bk.guests} ${t('guestUnit')}`}</p>

            <div class="specs-grid" style="border-color: var(--border-dark); grid-template-columns: 1fr 1fr; margin-bottom: 20px;">
              <div class="spec-item">
                <span class="spec-label" style="color: #94a3b8;">${isGuided ? t('travelDate') : t('date')}</span>
                <span class="spec-val" style="color: #fff;">${isGuided ? STATE.pref.tourDate : STATE.bk.date}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label" style="color: #94a3b8;">${isGuided ? t('tourTypeLabel') : t('stayLabel')}</span>
                <span class="spec-val" style="color: #fff;">${isGuided
                  ? STATE.pref.tourType === 'group' ? t('groupTourPrice') : t('privateGuidePrice')
                  : t('oneNight')}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label" style="color: #94a3b8;">${isGuided ? t('travelerCount') : t('guestCountLabel')}</span>
                <span class="spec-val" style="color: #fff;">${isGuided ? STATE.pref.travelers : STATE.bk.guests}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label" style="color: #94a3b8;">${isGuided ? t('bookingSummary') : t('experienceLabel')}</span>
                <span class="spec-val" style="color: #fff;">${isGuided ? bookingName : t('wadiMealDetails')}</span>
              </div>
            </div>

            <div class="row" style="justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--border-dark);">
              <span style="font-weight: 700;">${t('totalLabel')}</span>
              <b style="font-size: 26px; color: var(--sand);">${total} JOD</b>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 8. User Dashboard (Page 12)
  dashboard: () => renderSidebarView('dashboard', `
    <h1 style="font-size: 28px;">${t('hi')}${STATE.user ? ', ' + (STATE.user.displayName || STATE.user.email.split('@')[0]) : ', Mohammed'}.</h1>
    <p class="sub" style="margin-bottom: 24px;">${t('takingShape')}</p>
    
    <div class="box" style="padding: 24px; margin-bottom: 24px;">
      <div class="two-col" style="align-items: center;">
        <div class="trip-preview-image" style="${getPlaceImageStyle(PLACES.find(place => place.id === 'wadirum'))}"></div>
        <div>
          <span class="eyebrow">${t('upcomingTrip')}</span>
          <h3 style="font-size: 22px;">South Jordan • 4 days</h3>
          <p class="sub" style="margin: 4px 0 12px;">Petra + Wadi Rum + Aqaba</p>
          
          <span style="font-size: 12px; font-weight: 700; color: var(--olive);">${t('tripReady')}</span>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width: 70%;"></div>
          </div>
          
          <div class="row" style="gap: 10px;">
            <button type="button" class="pill pill-dark pill-sm" onclick="location.hash='#/result'">${t('openItinerary')}</button>
            <button type="button" class="pill pill-sm" onclick="location.hash='#/trip'">${t('editTrip')}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
      <div class="stat-box">
        <small>• ${t('savedPlaces')}</small>
        <b>${STATE.saved.length}</b>
        <span>Across Jordan</span>
      </div>
      <div class="stat-box">
        <small>• ${t('tripsN')}</small>
        <b>4</b>
        <span>2 completed</span>
      </div>
      <div class="stat-box">
        <small>• ${t('pass')}</small>
        <b>${STATE.stamps.length} / 12</b>
        <span>Regions explored</span>
      </div>
      <div class="stat-box">
        <small>• ${t('nextBadge')}</small>
        <b style="font-size: 15px; margin-top: 8px;">${t('badgeName')}</b>
        <span>${t('badgePlaces')}</span>
      </div>
    </div>

    <div style="margin-top: 40px;">
      <h3>${t('weekendSec')}</h3>
      <p class="sub">${t('weekendSub')}</p>
      
      <div class="grid" style="margin-top: 18px;">
        ${[PLACES[2], PLACES[3], PLACES[5]].map(renderCard).join('')}
      </div>
    </div>
  `),

  // 9. Jordan Passport (Page 13)
  passport: () => renderSidebarView('passport', `
    <h1 style="font-size: 28px;">${t('pass')}</h1>
    <p class="sub" style="margin-bottom: 28px;">${t('passS')}</p>
    
    <div class="passport-card">
      <div>
        <span class="eyebrow" style="color: var(--sand);">${t('explorerPass')}</span>
        <h2 style="font-size: 26px; letter-spacing: 0.02em; margin: 4px 0 16px;">
          ${(STATE.user?.displayName || STATE.user?.email || 'MOHAMMED K.').split('@')[0].toUpperCase()}
        </h2>
        <div style="display: flex; align-items: baseline; gap: 10px;">
          <big>${STATE.stamps.length}</big>
          <span style="font-size: 15px; color: #cbd5e1;">${t('regions')}</span>
        </div>
        <p style="font-size: 11px; color: #94a3b8; margin-top: 12px;">${t('memberSince')}</p>
      </div>
      
      <div class="passport-art">
        <svg viewBox="0 0 100 100" width="70" height="70" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-dasharray="4 4" opacity="0.6"/>
          <path d="M25 55 Q 50 20 75 65" stroke="#C8674A" stroke-width="3"/>
          <circle cx="75" cy="65" r="4" fill="#C8674A"/>
        </svg>
      </div>
    </div>

    <h3>${t('yourStamps')}</h3>
    <p class="sub" style="margin-bottom: 24px;">${t('stampsSub')}</p>
    
    <div class="stamps-grid">
      ${PASSPORT_STAMPS.map(stamp => {
        const isUnlocked = STATE.stamps.includes(stamp.id) || stamp.unlocked;
        return `
          <div class="stamp-item ${isUnlocked ? '' : 'locked'}">
            <div class="stamp-circle" style="${isUnlocked ? `background: ${stamp.color};` : ''}" ${isUnlocked ? '' : `data-stamp="${stamp.id}" title="Click to unlock"`}>
              ${isUnlocked ? '+' : '?'}
            </div>
            <span>${STATE.lang === 'ar' ? stamp.a : stamp.n}</span>
            <span class="stamp-sub">${STATE.lang === 'ar' ? stamp.ca : stamp.c}</span>
          </div>
        `;
      }).join('')}
    </div>
  `)
};

// Sidebar Helper Layout
function renderSidebarView(activeRoute, contentHtml) {
  return `
    <div class="sidebar-layout">
      <aside class="sidebar-panel">
        <a class="sidebar-link ${activeRoute === 'dashboard' ? 'active' : ''}" href="#/dashboard">
          <div class="sidebar-link-dot"></div>
          <span>${t('ov')}</span>
        </a>
        <a class="sidebar-link ${activeRoute === 'trip' ? 'active' : ''}" href="#/trip">
          <div class="sidebar-link-dot"></div>
          <span>${t('trips')}</span>
        </a>
        <a class="sidebar-link ${activeRoute === 'discover' ? 'active' : ''}" href="#/discover">
          <div class="sidebar-link-dot"></div>
          <span>${t('sv')}</span>
        </a>
        <a class="sidebar-link ${activeRoute === 'passport' ? 'active' : ''}" href="#/passport">
          <div class="sidebar-link-dot"></div>
          <span>${t('pass')}</span>
        </a>
      </aside>
      <div class="wrap" style="width: 100%;">
        ${contentHtml}
      </div>
    </div>
  `;
}

// Global Nav & Chrome Updater
function updateNav() {
  const hash = location.hash.slice(2) || '';
  const rootRoute = hash.split('/')[0];
  
  // Header theme: dark header on hero pages, warm light on other pages
  const isDarkHero = ['', 'place', 'experience'].includes(rootRoute);
  const mainNav = $('#mainNav');
  if (isDarkHero) {
    mainNav.classList.add('dk');
  } else {
    mainNav.classList.remove('dk');
  }

  // Header Nav Links
  const linksHtml = [
    ['discover', 'discover'],
    ['trip', 'plan'],
    ['experience', 'exp'],
    ['dashboard', 'stories']
  ].map(([r, labelKey]) => `
    <a href="#/${r}" class="${rootRoute === r ? 'on' : ''}">${t(labelKey)}</a>
  `).join('');
  $('#links').innerHTML = linksHtml;

  // Mobile Bottom Tabbar
  const tabsHtml = [
    ['', '⌂', t('discover')],
    ['trip', '✦', t('plan')],
    ['dashboard', '♡', t('sv')],
    ['passport', '◎', t('pass')]
  ].map(([r, icon, label]) => `
    <a href="#/${r}" class="tab-item ${rootRoute === r ? 'active' : ''}">
      <span style="font-size: 16px;">${icon}</span>
      <span>${label}</span>
    </a>
  `).join('');
  $('#tabs').innerHTML = tabsHtml;

  // Language Button Text
  $('#langT').textContent = STATE.lang === 'en' ? 'EN / AR' : 'AR / EN';

  // Auth Button Text
  $('#auth').textContent = STATE.user ? t('out') : t('signin');

  // HTML Attributes for direction and language
  document.documentElement.lang = STATE.lang;
  document.documentElement.dir = STATE.lang === 'ar' ? 'rtl' : 'ltr';
}

// Main Render Function
function render(preserveScroll = true) {
  const scrollY = window.scrollY;
  const [route, param] = (location.hash.slice(2) || '').split('/');
  updateNav();
  
  const viewFn = VIEWS[route] || VIEWS[''];
  $('#app').innerHTML = viewFn(param);
  window.scrollTo({ top: preserveScroll ? scrollY : 0, behavior: 'instant' });
}

// Global Click Event Handler
document.addEventListener('click', async e => {
  const target = e.target.closest('[data-save],[data-add],[data-cat],[data-who],[data-like],[data-pace],[data-stamp],#nx,#bk,#sv,#rs,#pay,#toggleMapBtn');
  if (!target) return;

  const dataset = target.dataset;

  // Toggle Map View in Discover screen
  if (target.id === 'toggleMapBtn') {
    STATE.isMapView = !STATE.isMapView;
    render();
    return;
  }

  // Favorite / Bookmark
  if (dataset.save) {
    e.stopPropagation();
    const id = dataset.save;
    STATE.saved = STATE.saved.includes(id) ? STATE.saved.filter(x => x !== id) : [...STATE.saved, id];
    await persistData();
    render();
    toast(STATE.saved.includes(id) ? (STATE.lang === 'ar' ? 'تم الحفظ في مسارك' : 'Saved to your route') : (STATE.lang === 'ar' ? 'تمت الإزالة' : 'Removed from saved'));
    return;
  }

  // Add to Trip
  if (dataset.add) {
    const id = dataset.add;
    if (!STATE.saved.includes(id)) {
      STATE.saved.push(id);
      await persistData();
    }
    const place = PLACES.find(p => p.id === id);
    toast(`✓ ${getName(place || PLACES[0])} ${STATE.lang === 'ar' ? 'أُضيفت إلى رحلتك' : 'added to your trip'}`);
    return;
  }

  // Category Filter
  if (dataset.cat) {
    STATE.cat = dataset.cat;
    render();
    return;
  }

  // Trip Wizard: Who
  if (dataset.who !== undefined) {
    STATE.pref.who = Number(dataset.who);
    render();
    return;
  }

  // Trip Wizard: Pace
  if (dataset.pace !== undefined) {
    STATE.pref.pace = Number(dataset.pace);
    STATE.result = null;
    render();
    return;
  }

  // Trip Wizard: Likes / Interests
  if (dataset.like) {
    const liked = STATE.pref.likes;
    STATE.pref.likes = liked.includes(dataset.like)
      ? liked.filter(x => x !== dataset.like)
      : [...liked, dataset.like];
    STATE.result = null;
    render();
    return;
  }

  // Unlock Stamp
  if (dataset.stamp) {
    const stampId = dataset.stamp;
    if (!STATE.stamps.includes(stampId)) {
      STATE.stamps.push(stampId);
      await persistData();
      toast(STATE.lang === 'ar' ? 'تهانينا! تم فتح ختم جديد' : 'New stamp unlocked!');
      render();
    }
    return;
  }

  // Wizard Step Next
  if (target.id === 'nx') {
    if (STATE.step === 4) {
      if (STATE.pref.tourType !== 'none') {
        const travelerCount = Number(STATE.pref.travelers);
        if (!Number.isInteger(travelerCount) || travelerCount < 1 || travelerCount > 20) {
          toast(STATE.lang === 'ar' ? 'أدخل عدد مسافرين بين 1 و20.' : 'Enter between 1 and 20 travelers.');
          return;
        }
        if (!STATE.pref.tourDate || STATE.pref.tourDate < getTodayDate()) {
          toast(STATE.lang === 'ar' ? 'اختر تاريخاً صالحاً للجولة.' : 'Choose a valid tour date.');
          return;
        }
        STATE.checkoutType = 'guided';
        STATE.step = 1;
        location.hash = '#/checkout';
        return;
      }
      STATE.step = 1;
      STATE.result = null;
      location.hash = '#/result';
    } else {
      STATE.step++;
      render();
    }
    return;
  }

  // Wizard Step Back
  if (target.id === 'bk') {
    STATE.step--;
    render();
    return;
  }

  // Save Route
  if (target.id === 'sv') {
    if (!STATE.user) {
      toast(t('login'));
      $('#auth').click();
      return;
    }
    STATE.trips.push({
      id: 'trip-' + Date.now(),
      title: 'Jordan Route',
      days: STATE.pref.days,
      places: STATE.saved,
      at: Date.now()
    });
    await persistData();
    toast(`✓ ${t('save')}`);
    return;
  }

  // Reserve Experience
  if (target.id === 'rs') {
    STATE.bk = {
      date: $('#bd')?.value || '2026-10-18',
      guests: Number($('#bg')?.value || 2)
    };
    STATE.checkoutType = 'wadirum';
    location.hash = '#/checkout';
    return;
  }

  // Complete Payment
  if (target.id === 'pay') {
    const cardNumber = $('#cc')?.value.replace(/\D/g, '') || '';
    const expiry = $('#ce')?.value.trim() || '';
    const securityCode = $('#cv')?.value.trim() || '';
    const expiryMatch = expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    const expiryDate = expiryMatch
      ? new Date(2000 + Number(expiryMatch[2]), Number(expiryMatch[1]), 1)
      : null;
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    if (cardNumber !== '4242424242424242'
      || !expiryDate
      || expiryDate <= currentMonth
      || !/^\d{3,4}$/.test(securityCode)) {
      toast(t('paymentError'));
      return;
    }

    const isGuided = STATE.checkoutType === 'guided';
    const booking = {
      uid: STATE.user?.uid || 'guest',
      place: isGuided ? 'guided-tour' : 'wadirum',
      tourType: isGuided ? STATE.pref.tourType : 'wadi-rum-night',
      date: isGuided ? STATE.pref.tourDate : STATE.bk.date,
      guests: isGuided ? Number(STATE.pref.travelers) : STATE.bk.guests,
      total: isGuided
        ? getGuidedTourTotal(STATE.pref.tourType, Number(STATE.pref.travelers))
        : 95,
      status: 'demo-confirmed',
      timestamp: Date.now()
    };

    let savedToAccount = true;
    if (fb && STATE.user) {
      try {
        await fb.fsMod.addDoc(fb.fsMod.collection(fb.db, 'bookings'), booking);
      } catch (err) {
        console.warn('Booking write error:', err);
        savedToAccount = false;
      }
    }
    
    if (!isGuided && !STATE.stamps.includes('wadirum')) {
      STATE.stamps.push('wadirum');
    }
    await persistData();
    location.hash = isGuided ? '#/result' : '#/passport';
    toast(savedToAccount
      ? isGuided ? t('demoPaymentSuccess') : t('ok')
      : t('paymentPersistenceError'));
  }
});

// Search & Form Inputs Change Handler
document.addEventListener('input', e => {
  if (e.target.id === 'sq') {
    STATE.q = e.target.value;
    const caret = e.target.selectionStart;
    render();
    const searchInput = $('#sq');
    if (searchInput) {
      searchInput.focus();
      searchInput.setSelectionRange(caret, caret);
    }
  }

});

document.addEventListener('change', e => {
  if (e.target.dataset.p) {
    const key = e.target.dataset.p;
    STATE.pref[key] = key === 'travelers' ? Number(e.target.value) : e.target.value;
    STATE.result = null;
  }
});

// Hash Routing Listener
window.addEventListener('hashchange', () => render(false));

// Initial Render
render();
