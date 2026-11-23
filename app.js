/**
 * AirSafe Family - Urban Air Quality Assistant for Kolkata, India
 * Powered by Gemini AI
 */

// Kolkata Pincode to Locality Mapping
const KOLKATA_PINCODES = {
  "700091": { name: "Salt Lake (Sector V / Bidhannagar)", baseAqi: 248, station: "Bidhannagar WBPCB Station", areaType: "IT Hub & Salt Lake City" },
  "700156": { name: "New Town (Action Area I & Eco Park)", baseAqi: 215, station: "New Town Green Verge Monitor", areaType: "Planned Smart City & Residential" },
  "700032": { name: "Jadavpur (South Kolkata)", baseAqi: 265, station: "Jadavpur University Campus Station", areaType: "University Hub & Dense Residential" },
  "700019": { name: "Ballygunge", baseAqi: 235, station: "Ballygunge Circular Road Station", areaType: "South Kolkata Commercial & Residential" },
  "700029": { name: "Gariahat & Southern Avenue", baseAqi: 252, station: "Rabindra Sarobar Ambient Station", areaType: "Market Hub & Lake Vicinity" },
  "700020": { name: "Bhowanipore & Elgin Road", baseAqi: 270, station: "Victoria Memorial WBPCB Station", areaType: "Central South Heritage Hub" },
  "700001": { name: "BBD Bagh / Dalhousie (Central Business)", baseAqi: 295, station: "Fort William / Lalbazar Station", areaType: "High Traffic Commercial District" },
  "700084": { name: "Garia & Mahamayatala", baseAqi: 228, station: "Kavi Nazrul Metro Corridor Station", areaType: "South Suburb & Bypass Connector" },
  "700004": { name: "Shyambazar & Hatibagan", baseAqi: 288, station: "R.G. Kar / Shyambazar Five-Point Station", areaType: "Historic North Kolkata Commercial" },
  "700027": { name: "Alipore & Zoological Gardens", baseAqi: 220, station: "Alipore Observatory Station", areaType: "Green Canopy Residential & Zoo" },
  "700034": { name: "Behala Tram Depot & Taratala", baseAqi: 280, station: "Diamond Harbour Road Monitor", areaType: "Heavy Transit & Residential Belt" },
  "700054": { name: "Kankurgachi & Phoolbagan", baseAqi: 260, station: "EM Bypass - Maniktala Main Road", areaType: "North-East Urban Corridor" },
  "700048": { name: "Lake Town & Bangur Avenue", baseAqi: 242, station: "VIP Road Ambient Sensor", areaType: "North Kolkata Residential & Bypass" },
  "700016": { name: "Park Street & Free School St", baseAqi: 278, station: "Park Circus / Mullickbazar Station", areaType: "High Activity Food & Business Hub" },
  "700078": { name: "Ruby, Anandapur & Kasba", baseAqi: 250, station: "Ruby General Hospital Connector", areaType: "EM Bypass Medical Corridor" },
  "700026": { name: "Kalighat & Rashbehari Avenue", baseAqi: 268, station: "Hazra Road Environmental Station", areaType: "High Density Cultural Corridor" },
  "700012": { name: "College Street & Bowbazar", baseAqi: 292, station: "Calcutta University Gate Station", areaType: "Old Kolkata Heritage & Book Market" },
  "700006": { name: "Maniktala & Beadon Street", baseAqi: 275, station: "Girish Park Central Sensor", areaType: "North Kolkata Residential" },
  "700053": { name: "New Alipore", baseAqi: 225, station: "Chetla Canal / New Alipore Station", areaType: "Residential Colony" },
  "700075": { name: "Santoshpur & Jadavpur East", baseAqi: 232, station: "Santoshpur Mini Station", areaType: "Quiet Residential & Lake Belt" },
  "700031": { name: "Dhakuria & Selimpur", baseAqi: 240, station: "Dhakuria Lake South Monitor", areaType: "South Kolkata Neighborhood" },
  "700047": { name: "Naktala & Bansdroni", baseAqi: 230, station: "Netaji Subhash Road Station", areaType: "Tolly Canal Residential Zone" },
  "700028": { name: "Dum Dum Airport & Cantonment", baseAqi: 255, station: "Netaji Subhash Airport Met Station", areaType: "Aviation Corridor & Transit" },
  "700135": { name: "Rajarhat & Vedic Village", baseAqi: 195, station: "Rajarhat Main Road Station", areaType: "Eastern Eco-Suburb" },
  "700102": { name: "Salt Lake Sector III (Karunamoyee)", baseAqi: 238, station: "Central Park Salt Lake Station", areaType: "Administrative & Green Zone" },
  "700064": { name: "Salt Lake Sector I & II", baseAqi: 234, station: "Salt Lake Stadium Station", areaType: "Planned Residential & Parks" },
  "700104": { name: "Behala Chowrasta & Silpara", baseAqi: 285, station: "Chowrasta Flyover Sensor", areaType: "South Western Gateway" }
};

// State
let currentPincode = "700091";
let currentArea = KOLKATA_PINCODES["700091"];
let simulatedAqiOverride = null; // null or "safe" | "moderate" | "poor" | "severe"
let selectedMembers = new Set(["child", "elderly", "asthma", "adult"]);
let currentLanguage = "en"; // "en" or "bn"

// AQI Status Determinator
function getAqiCategory(aqiValue) {
  if (aqiValue <= 100) {
    return {
      label: "Safe",
      labelBn: "নিরাপদ",
      key: "safe",
      colorClass: "text-emerald-600",
      bgClass: "bg-emerald-50",
      borderClass: "border-emerald-300",
      badgeColor: "bg-emerald-600 text-white",
      pillClass: "aqi-pill-safe",
      summary: "Air quality is good. Safe for family outdoor activities.",
      summaryBn: "বাতাসের মান ভালো। পরিবারের বাইরে যাওয়ার জন্য নিরাপদ।"
    };
  } else if (aqiValue <= 200) {
    return {
      label: "Moderate",
      labelBn: "সহনীয়",
      key: "moderate",
      colorClass: "text-amber-600",
      bgClass: "bg-amber-50",
      borderClass: "border-amber-300",
      badgeColor: "bg-amber-500 text-white",
      pillClass: "aqi-pill-moderate",
      summary: "Acceptable air. Sensitive persons should watch for slight irritation.",
      summaryBn: "সহনীয় বায়ু। অ্যালার্জি বা শ্বাসকষ্টের ব্যক্তিরা সতর্ক থাকুন।"
    };
  } else if (aqiValue <= 400) {
    return {
      label: "Poor",
      labelBn: "অস্বাস্থ্যকর / খারাপ",
      key: "poor",
      colorClass: "text-red-600",
      bgClass: "bg-red-50",
      borderClass: "border-red-300",
      badgeColor: "bg-red-600 text-white",
      pillClass: "aqi-pill-poor",
      summary: "Breathing discomfort to most people on prolonged exposure. Mask advised.",
      summaryBn: "দীর্ঘক্ষণ বাইরে থাকলে অস্বস্তি হতে পারে। মাস্ক ব্যবহার করুন।"
    };
  } else {
    return {
      label: "Severe",
      labelBn: "মারাত্মক বিষাক্ত",
      key: "severe",
      colorClass: "text-rose-900",
      bgClass: "bg-rose-50",
      borderClass: "border-rose-400",
      badgeColor: "bg-rose-950 text-white",
      pillClass: "aqi-pill-severe",
      summary: "Severe health impact on healthy people, serious for sensitive groups. Stay indoors.",
      summaryBn: "সবার স্বাস্থ্যের জন্য অত্যন্ত ঝুঁকিপূর্ণ। ঘরের বাইরে যাওয়া বন্ধ রাখুন।"
    };
  }
}

// Get effective AQI
function getCurrentAqi() {
  if (simulatedAqiOverride === "safe") return 42;
  if (simulatedAqiOverride === "moderate") return 145;
  if (simulatedAqiOverride === "poor") return 248;
  if (simulatedAqiOverride === "severe") return 430;
  return currentArea ? currentArea.baseAqi : 248;
}

// Kolkata Pincode Validation
function validateKolkataPincode(pincode) {
  const clean = (pincode || "").trim();
  // Must be 6 digits and start with 700
  if (!/^700\d{3}$/.test(clean)) {
    return {
      valid: false,
      message: "This pincode does not look like Kolkata, please enter a valid pincode"
    };
  }
  return { valid: true };
}

// Find or Generate Kolkata Area Info
function lookupKolkataPincode(pincode) {
  const clean = (pincode || "").trim();
  if (KOLKATA_PINCODES[clean]) {
    return KOLKATA_PINCODES[clean];
  }
  // Generic Kolkata fallback for any valid 700xxx
  return {
    name: `Kolkata Municipal Area (${clean})`,
    baseAqi: 245,
    station: `Kolkata West Bengal PCB Ward Monitor (${clean})`,
    areaType: "Kolkata Urban Metropolitan Zone"
  };
}

// AI Advice Generation based on Family Member and AQI
function getGeminiAdviceForMember(memberKey, aqiVal, aqiCategory) {
  const isPoorOrSevere = aqiVal > 200;
  const isModerate = aqiVal > 100 && aqiVal <= 200;
  const isSafe = aqiVal <= 100;

  switch (memberKey) {
    case "child":
      return {
        member: "Child (0-10 years)",
        memberBn: "শিশু (০-১০ বছর)",
        icon: "🧒",
        theme: "child",
        accentColor: "border-sky-500 bg-sky-50/70",
        badgeBg: "bg-sky-100 text-sky-800 border-sky-300",
        highlightTag: "Child Care Priority",
        highlightAdvice: isPoorOrSevere
          ? "Today do not send your child outside, let them play indoors after school"
          : isModerate
          ? "Limit continuous outdoor games after school to 30 mins; keep water bottle handy"
          : "Air is clean! Safe for school sports, park playtime, and cycling outdoors",
        highlightAdviceBn: isPoorOrSevere
          ? "আজ আপনার শিশুকে বাইরে খেলতে পাঠাবেন না, স্কুল ছুটির পর ঘরেই খেলতে দিন"
          : isModerate
          ? "স্কুলের পর বাইরে একটানা খেলা ৩০ মিনিটে সীমাবদ্ধ রাখুন, জল পান করান"
          : "বাতাস ভালো! পার্কে খেলাধুলা ও সাইক্লিং করার জন্য উপযুক্ত",
        geminiReasoning: "Children breathe twice as fast as adults and inhale higher PM2.5 particulates relative to their small body weight. Kolkata's winter road dust exacerbates throat tickles and pediatric wheezing.",
        geminiReasoningBn: "শিশুরা দ্রুত শ্বাস নেয়, তাই তাদের ফুসফুসে ধূলিকণা বেশি ঢোকে। কলকাতার শীতের ধোঁয়াশায় শিশুদের গলায় সংক্রমণ হতে পারে।",
        actionTips: [
          "Organize indoor drawing, building blocks, or board games instead of park visits.",
          "Give warm water with a drop of honey or tulsi in the evening to soothe throat.",
          "Ensure school bags have a clean child-size mask for the school bus or rickshaw commute."
        ],
        actionTipsBn: [
          "পার্কে না পাঠিয়ে ঘরে ছবি আঁকা বা লুডো/দাবার মতো খেলার ব্যবস্থা করুন।",
          "সন্ধ্যায় গলায় আরাম পেতে ঈষদুষ্ণ জল বা তুলসী পাতা ফুটিয়ে খাওয়াতে পারেন।",
          "স্কুলে যাতায়াতের সময় সঠিক মাপের মাস্ক পরিয়ে দিন।"
        ]
      };

    case "elderly":
      return {
        member: "Elderly / Grandparents (60+ years)",
        memberBn: "বয়স্ক / ঠাকুরদা-ঠাকুমা (৬০+ বছর)",
        icon: "👵👴",
        theme: "elderly",
        accentColor: "border-amber-500 bg-amber-50/70",
        badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
        highlightTag: "Senior Health Shield",
        highlightAdvice: isPoorOrSevere
          ? "Do not take Dadi/Dada for morning walk today, take them after 4 PM in evening"
          : isModerate
          ? "Postpone morning walk until sun is fully up after 8:00 AM; wear warm scarf"
          : "Pleasant weather! Ideal for morning walk at Rabindra Sarobar, Central Park or Maidan",
        highlightAdviceBn: isPoorOrSevere
          ? "আজ ঠাকুরদা-ঠাকুমা/দাদি-দাদাকে সকালে হাঁটতে নিয়ে যাবেন না, বিকেল ৪টার পর নিয়ে যান"
          : isModerate
          ? "সকাল ৮টার আগে বেরোবেন না; মিষ্টি রোদ উঠলে হাঁটতে বেরোন"
          : "সুন্দর আবহাওয়া! রবীন্দ্র সরোবর বা ময়দানে সকালের হাঁটার জন্য চমৎকার দিন",
        geminiReasoning: "Early morning Kolkata fog locks heavy vehicular smoke and suspended particulates within 50 meters of the ground. By 4 PM, afternoon solar heating breaks this inversion layer.",
        geminiReasoningBn: "ভোরের দিকে কলকাতার কুয়াশা ও দূষণ মাটির কাছাকাছি আটকে থাকে। বিকেল ৪টার দিকে রোদ ও বাতাসে দূষণ কেটে যায়।",
        actionTips: [
          "Encourage 20 minutes of gentle indoor stretching or pranayam on a yoga mat.",
          "Keep blood pressure medications on schedule; cold smog causes vascular constriction.",
          "Close room windows facing busy streets during early morning hours (6 AM - 9 AM)."
        ],
        actionTipsBn: [
          "ঘরেই হালকা স্ট্রেচিং বা প্রাণায়াম করার পরামর্শ দিন।",
          "প্রেসার ও রুটিন ওষুধ সময়মতো খেতে ভুলবেন না।",
          "সকাল ৬টা থেকে ৯টা পর্যন্ত রাস্তার দিকের জানলা বন্ধ রাখুন।"
        ]
      };

    case "asthma":
      return {
        member: "Asthma / Breathing Problem Person",
        memberBn: "হাঁপানি / শ্বাসকষ্টের রোগী",
        icon: "🫁",
        theme: "asthma",
        accentColor: "border-rose-500 bg-rose-50/70",
        badgeBg: "bg-rose-100 text-rose-800 border-rose-300",
        highlightTag: "Critical Respiratory Care",
        highlightAdvice: isPoorOrSevere
          ? "Keep inhaler with you, keep windows closed"
          : isModerate
          ? "Keep rescue inhaler in pocket, avoid crowded bus stops and smoke zones"
          : "Air is comfortable; keep regular maintenance dose as prescribed by doctor",
        highlightAdviceBn: isPoorOrSevere
          ? "ইনহেলার সবসময় সাথে রাখুন, ঘরের সমস্ত জানলা বন্ধ রাখুন"
          : isModerate
          ? "ইনহেলার পকেটে রাখুন, অতিরিক্ত ধোঁয়া ও গাড়ির ভিড় এড়িয়ে চলুন"
          : "বাতাস স্বাভাবিক; ডাক্তারের দেওয়া নিয়মিত ডোজ সময়মতো নিন",
        geminiReasoning: "Kolkata's current PM2.5 levels penetrate deep into bronchial alveoli, causing airway inflammation, spasms, and sudden nocturnal coughing fits in asthma patients.",
        geminiReasoningBn: "কলকাতার বাতাসে ধূলিকণা ফুসফুসের শ্বাসনালীতে প্রদাহ তৈরি করে হঠাৎ শ্বাসকষ্ট বাড়াতে পারে।",
        actionTips: [
          "Ensure your blue/reliever inhaler canister is at least half full before stepping out.",
          "Keep windows closed in bedroom and living room; use a fan or damp cloth mop to settle dust.",
          "Take 5 minutes of mild warm water steam inhalation before going to bed tonight."
        ],
        actionTipsBn: [
          "জরুরী ইনহেলার সাথে আছে কিনা বেরোনোর আগে নিশ্চিত করুন।",
          "ঘরের জানলা বন্ধ রাখুন এবং মেঝেতে ভেজা মপ ব্যবহার করুন।",
          "রাতে শোওয়ার আগে হালকা গরম জলের ভাপ (স্টিম) নিন।"
        ]
      };

    case "adult":
      return {
        member: "Normal Adult",
        memberBn: "স্বাভাবিক প্রাপ্তবয়স্ক",
        icon: "🧑",
        theme: "adult",
        accentColor: "border-emerald-500 bg-emerald-50/70",
        badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
        highlightTag: "Daily Commuter Safety",
        highlightAdvice: isPoorOrSevere
          ? "You can go out, but wear a mask"
          : isModerate
          ? "Outdoor routine is fine; put on a light mask if travelling in open auto or bus"
          : "Great day for daily errands, outdoor work, running, and commuting without mask",
        highlightAdviceBn: isPoorOrSevere
          ? "আপনি প্রয়োজনে বাইরে যেতে পারেন, তবে অবশ্যই মাস্ক ব্যবহার করুন"
          : isModerate
          ? "বাইরে কাজ করা যাবে; অটো বা বাসে যাতায়াত করলে মাস্ক পরলে ভালো হয়"
          : "আজকের আবহাওয়া দারুণ! মাস্ক ছাড়াই বাইরে যেতে ও কাজ করতে পারেন",
        geminiReasoning: "While healthy adults possess higher lung tolerance, prolonged exposure to Kolkata's urban exhaust during traffic jams causes dry throat, stinging eyes, and lethargy.",
        geminiReasoningBn: "সুস্থ প্রাপ্তবয়স্কদের রোগ প্রতিরোধ ক্ষমতা থাকলেও কলকাতার জ্যামে ধোঁয়ায় চোখ জ্বালা ও গলা শুকিয়ে যেতে পারে।",
        actionTips: [
          "Wear a certified N95 or snug cloth mask when riding Kolkata auto-rickshaws, bikes, or non-AC buses.",
          "Avoid strenuous outdoor cardio running during morning peak hours (7 AM - 9:30 AM).",
          "Wash your eyes and face with cool water after returning from the office or market."
        ],
        actionTipsBn: [
          "অটো, বাইক বা বাসে যাতায়াতের সময় ভালো মানের N95 মাস্ক পরুন।",
          "সকালে ভারী শরীরচর্চা বা দৌড়ানো থেকে বিরত থাকুন।",
          "বাড়ি ফিরে ঠান্ডা জলে চোখ-মুখ ধুয়ে ফেলুন।"
        ]
      };
  }
}

// UI Updating Functions
function renderAqiDisplay() {
  const aqiVal = getCurrentAqi();
  const cat = getAqiCategory(aqiVal);

  const aqiNumberEl = document.getElementById("aqi-number");
  const aqiBadgeEl = document.getElementById("aqi-badge");
  const aqiSummaryEl = document.getElementById("aqi-summary");
  const aqiCardEl = document.getElementById("aqi-card");
  const areaNameEl = document.getElementById("area-name");
  const stationNameEl = document.getElementById("station-name");
  const primaryPollutantEl = document.getElementById("primary-pollutant");

  if (!aqiNumberEl) return;

  // Render numbers and badges
  aqiNumberEl.textContent = aqiVal;
  aqiNumberEl.className = `text-6xl sm:text-7xl font-extrabold tracking-tight transition-all duration-300 ${cat.colorClass}`;

  aqiBadgeEl.textContent = currentLanguage === "bn" ? cat.labelBn : cat.label;
  aqiBadgeEl.className = `inline-flex items-center px-4 py-1.5 rounded-full text-base font-bold shadow-sm ${cat.badgeColor}`;

  aqiSummaryEl.textContent = currentLanguage === "bn" ? cat.summaryBn : cat.summary;

  // Station & Area
  areaNameEl.textContent = currentArea ? currentArea.name : "Kolkata City";
  stationNameEl.textContent = currentArea ? currentArea.station : "Central Pollution Control Board Monitor";

  // Detailed pollutants
  if (primaryPollutantEl) {
    if (aqiVal > 300) primaryPollutantEl.textContent = "PM2.5 (Severe)";
    else if (aqiVal > 200) primaryPollutantEl.textContent = "PM2.5 (High)";
    else if (aqiVal > 100) primaryPollutantEl.textContent = "PM10 / Dust";
    else primaryPollutantEl.textContent = "Clean Ambient";
  }

  // Update styling
  aqiCardEl.className = `glass-panel rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 ${cat.borderClass} ${cat.bgClass}`;
}

// Render Family Cards
function renderFamilyAdvice() {
  const container = document.getElementById("family-cards-container");
  const emptyState = document.getElementById("empty-family-state");
  if (!container) return;

  if (selectedMembers.size === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  const aqiVal = getCurrentAqi();
  const cat = getAqiCategory(aqiVal);

  let html = "";
  const membersArray = Array.from(selectedMembers);

  membersArray.forEach((memberKey) => {
    const advice = getGeminiAdviceForMember(memberKey, aqiVal, cat);

    const title = currentLanguage === "bn" ? advice.memberBn : advice.member;
    const highlight = currentLanguage === "bn" ? advice.highlightAdviceBn : advice.highlightAdvice;
    const reasoning = currentLanguage === "bn" ? advice.geminiReasoningBn : advice.geminiReasoning;
    const tips = currentLanguage === "bn" ? advice.actionTipsBn : advice.actionTips;

    let borderThemeClass = "";
    let headerBgClass = "";
    let btnShareClass = "";

    if (memberKey === "child") {
      borderThemeClass = "border-sky-300 shadow-sky-100 hover:border-sky-400";
      headerBgClass = "bg-gradient-to-r from-sky-500 to-blue-600 text-white";
      btnShareClass = "text-sky-700 bg-sky-100 hover:bg-sky-200";
    } else if (memberKey === "elderly") {
      borderThemeClass = "border-amber-300 shadow-amber-100 hover:border-amber-400";
      headerBgClass = "bg-gradient-to-r from-amber-500 to-orange-600 text-white";
      btnShareClass = "text-amber-800 bg-amber-100 hover:bg-amber-200";
    } else if (memberKey === "asthma") {
      borderThemeClass = "border-rose-300 shadow-rose-100 hover:border-rose-400";
      headerBgClass = "bg-gradient-to-r from-rose-600 to-red-700 text-white";
      btnShareClass = "text-rose-800 bg-rose-100 hover:bg-rose-200";
    } else {
      borderThemeClass = "border-emerald-300 shadow-emerald-100 hover:border-emerald-400";
      headerBgClass = "bg-gradient-to-r from-emerald-600 to-teal-700 text-white";
      btnShareClass = "text-emerald-800 bg-emerald-100 hover:bg-emerald-200";
    }

    html += `
      <div class="fade-in bg-white rounded-3xl border-2 ${borderThemeClass} shadow-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
        <div>
          <!-- Card Header with Member & Gemini AI Badge -->
          <div class="${headerBgClass} p-5 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <span class="text-3xl filter drop-shadow">${advice.icon}</span>
              <div>
                <h3 class="font-bold text-lg leading-tight">${title}</h3>
                <span class="text-xs opacity-90 font-medium">Kolkata Air Protection</span>
              </div>
            </div>
            <div class="flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              <span>Gemini AI</span>
            </div>
          </div>

          <div class="p-6 space-y-4">
            <!-- Key AI Direct Advice Box -->
            <div class="rounded-2xl p-4 bg-slate-50 border border-slate-200/80">
              <div class="flex items-start space-x-3">
                <span class="text-xl">💡</span>
                <div>
                  <div class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    ${currentLanguage === "bn" ? "জেমিনাই এআই নির্দেশিকা" : "Gemini AI Direct Advice"}
                  </div>
                  <p class="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    "${highlight}"
                  </p>
                </div>
              </div>
            </div>

            <!-- Medical/Scientific Context -->
            <div class="text-sm text-slate-600 leading-relaxed bg-white rounded-xl p-3 border border-slate-100">
              <div class="flex items-center space-x-1.5 font-semibold text-slate-700 mb-1 text-xs">
                <span>🔬</span>
                <span>${currentLanguage === "bn" ? "কেন এই সতর্কতা?" : "Why this precaution?"}</span>
              </div>
              <p>${reasoning}</p>
            </div>

            <!-- Action Checklist -->
            <div>
              <div class="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span>🛡️</span>
                <span>${currentLanguage === "bn" ? "আজকের করণীয় ৩টি পদক্ষেপ" : "3 Action Steps for Today"}</span>
              </div>
              <ul class="space-y-2 text-sm text-slate-700">
                ${tips.map(tip => `
                  <li class="flex items-start space-x-2">
                    <span class="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>${tip}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
          </div>
        </div>

        <!-- Card Footer with Read Aloud & WhatsApp Share -->
        <div class="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
          <button onclick="readAloudAdvice('${advice.member.replace(/'/g, "")}', '${highlight.replace(/'/g, "")}')" 
                  class="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition">
            <span>🔊</span>
            <span>${currentLanguage === "bn" ? "শুনে নিন" : "Listen Advice"}</span>
          </button>

          <button onclick="shareOnWhatsApp('${title.replace(/'/g, "")}', '${highlight.replace(/'/g, "")}', ${aqiVal})" 
                  class="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-bold ${btnShareClass} transition">
            <span>📲</span>
            <span>${currentLanguage === "bn" ? "শেয়ার করুন" : "WhatsApp"}</span>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Text to speech feature for Kolkata grandmas and kids
function readAloudAdvice(memberTitle, adviceText) {
  if (!('speechSynthesis' in window)) {
    alert("Speech audio is not supported in this browser.");
    return;
  }
  window.speechSynthesis.cancel(); // Stop any previous speech
  const utteranceText = `AirSafe Kolkata Advice for ${memberTitle}. ${adviceText}`;
  const utterance = new SpeechSynthesisUtterance(utteranceText);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}

// Share Advice to WhatsApp
function shareOnWhatsApp(memberTitle, adviceText, aqi) {
  const text = encodeURIComponent(
    `🚨 *AirSafe Family - Kolkata Air Quality Alert*\n\n` +
    `📍 *Area:* ${currentArea.name} (Pincode: ${currentPincode})\n` +
    `📊 *Current AQI:* ${aqi} (${getAqiCategory(aqi).label})\n\n` +
    `👤 *Advice for ${memberTitle}:*\n` +
    `"${adviceText}"\n\n` +
    `✨ *Powered by Gemini AI - AirSafe Family Kolkata*`
  );
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

// Handle Pincode Search
function handlePincodeSearch() {
  const inputEl = document.getElementById("pincode-input");
  const errorEl = document.getElementById("pincode-error");
  const val = (inputEl.value || "").trim();

  // Validate
  const validation = validateKolkataPincode(val);
  if (!validation.valid) {
    errorEl.textContent = validation.message;
    errorEl.classList.remove("hidden");
    inputEl.classList.add("border-red-500", "focus:ring-red-300");
    return;
  }

  // Clear errors
  errorEl.classList.add("hidden");
  inputEl.classList.remove("border-red-500", "focus:ring-red-300");

  currentPincode = val;
  currentArea = lookupKolkataPincode(val);

  renderAqiDisplay();
  renderFamilyAdvice();

  // Smooth scroll down slightly to view results if on mobile
  const resultAnchor = document.getElementById("main-results");
  if (resultAnchor && window.innerWidth < 640) {
    resultAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Quick Pincode chip click
function selectQuickPincode(pincode) {
  const inputEl = document.getElementById("pincode-input");
  if (inputEl) {
    inputEl.value = pincode;
    handlePincodeSearch();
  }
}

// Toggle Family Member Selection
function toggleMember(memberKey) {
  const optionCard = document.getElementById(`option-${memberKey}`);
  if (selectedMembers.has(memberKey)) {
    selectedMembers.delete(memberKey);
    if (optionCard) {
      optionCard.classList.remove("selected");
      const check = optionCard.querySelector(".check-indicator");
      if (check) check.classList.add("opacity-0");
    }
  } else {
    selectedMembers.add(memberKey);
    if (optionCard) {
      optionCard.classList.add("selected");
      const check = optionCard.querySelector(".check-indicator");
      if (check) check.classList.remove("opacity-0");
    }
  }
}

// Simulate AQI Change
function setAqiSimulation(level) {
  simulatedAqiOverride = level;
  // Update buttons styling
  const buttons = document.querySelectorAll(".sim-btn");
  buttons.forEach(btn => {
    btn.classList.remove("ring-2", "ring-indigo-600", "font-extrabold");
  });

  const activeBtn = document.getElementById(`sim-${level}`);
  if (activeBtn) {
    activeBtn.classList.add("ring-2", "ring-indigo-600", "font-extrabold");
  }

  renderAqiDisplay();
  renderFamilyAdvice();
}

// Feature 1: Indoor Hacks Modal / Drawer
function openIndoorHacks() {
  const modal = document.getElementById("indoor-hacks-modal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeIndoorHacks() {
  const modal = document.getElementById("indoor-hacks-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

// Feature 2: Tomorrow's Plan Modal / Drawer
function openTomorrowPlan() {
  const modal = document.getElementById("tomorrow-plan-modal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeTomorrowPlan() {
  const modal = document.getElementById("tomorrow-plan-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

// Language Switch
function setLanguage(lang) {
  currentLanguage = lang;
  const enBtn = document.getElementById("lang-en");
  const bnBtn = document.getElementById("lang-bn");

  if (lang === "bn") {
    bnBtn.classList.add("bg-indigo-600", "text-white");
    bnBtn.classList.remove("bg-white", "text-slate-700");
    enBtn.classList.remove("bg-indigo-600", "text-white");
    enBtn.classList.add("bg-white", "text-slate-700");
  } else {
    enBtn.classList.add("bg-indigo-600", "text-white");
    enBtn.classList.remove("bg-white", "text-slate-700");
    bnBtn.classList.remove("bg-indigo-600", "text-white");
    bnBtn.classList.add("bg-white", "text-slate-700");
  }

  renderAqiDisplay();
  renderFamilyAdvice();
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  // Setup search enter key
  const inputEl = document.getElementById("pincode-input");
  if (inputEl) {
    inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handlePincodeSearch();
      }
    });

    // Auto clear error when typing
    inputEl.addEventListener("input", () => {
      const errorEl = document.getElementById("pincode-error");
      if (errorEl) errorEl.classList.add("hidden");
      inputEl.classList.remove("border-red-500", "focus:ring-red-300");
    });
  }

  // Initial renders
  renderAqiDisplay();
  renderFamilyAdvice();
});
