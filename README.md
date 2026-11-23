# AirSafe Family - Urban Air Quality Assistant (Kolkata, India)
### ✨ Powered by Gemini AI

**AirSafe Family** is a clean, mobile-friendly urban air quality assistant designed specifically for families living in the Kolkata metropolitan area. It provides hyper-local AQI information by Kolkata pincode, and delivers personalized precautions for children, elders, asthma patients, and adults powered by Gemini AI.

---

## 🌟 Key Features

### 1. Kolkata Pincode Search & AQI Monitor (Home Page)
- **Big Search Box**: Enter any Kolkata pincode (e.g. `700091` for Salt Lake, `700156` for New Town, `700032` for Jadavpur).
- **Instant Area Resolution**:
  - `700091`: Salt Lake (Sector V & Bidhannagar IT Hub)
  - `700156`: New Town (Action Area I & Eco Park)
  - `700032`: Jadavpur (South Kolkata)
  - `700019`: Ballygunge
  - `700029`: Gariahat & Southern Avenue
  - `700020`: Bhowanipore & Elgin Road
  - `700001`: BBD Bagh / Dalhousie
  - `700084`: Garia & Mahamayatala
  - `700004`: Shyambazar & Hatibagan
  - ...and all valid Kolkata `700xxx` postal zones.
- **Color-Coded AQI Number**:
  - 🟢 **Green = Safe (0 - 100)**
  - 🟡 **Yellow = Moderate (101 - 200)**
  - 🔴 **Red = Poor (201 - 400)**
  - 🟣 **Dark Red = Severe (401 - 500+)**
- **Error Handling**: If a non-Kolkata pincode is entered (e.g., `999999`, `110001`, or invalid input), displays:
  > *"This pincode does not look like Kolkata, please enter a valid pincode"*

---

### 2. 👨‍👩‍👧‍👦 Family Mode (Main Feature)
Asks user: **"Who is in your family?"** with multi-select support for 4 groups:
1. **Child (0-10 years)**
2. **Elderly / Grandparents (60+ years)**
3. **Asthma / Breathing Problem Person**
4. **Normal Adult**

Clicking **"Check For My Family"** generates distinct, color-coded health precaution cards powered by Gemini AI:
- **Child Card (Sky Blue)**:
  - Direct Advice: *"Today do not send your child outside, let them play indoors after school"*
  - Details on high pediatric respiration rate and indoor game recommendations.
- **Elderly / Grandparents Card (Warm Amber)**:
  - Direct Advice: *"Do not take Dadi/Dada for morning walk today, take them after 4 PM in evening"*
  - Details on winter temperature inversion and afternoon sun dispersal.
- **Asthma / Breathing Problem Person Card (Crimson / Rose)**:
  - Direct Advice: *"Keep inhaler with you, keep windows closed"*
  - Action steps on emergency inhaler readiness, N95 masks, and night-time steam inhalation.
- **Normal Adult Card (Emerald)**:
  - Direct Advice: *"You can go out, but wear a mask"*
  - Action steps for auto-rickshaw, metro, and bus commuters in Kolkata.

Each card includes:
- 🔊 **"Listen Advice"**: Uses browser text-to-speech so elders and children can hear the precautions.
- 📱 **"WhatsApp Share"**: One-click sharing formatted for family WhatsApp groups.

---

### 3. 🏠 Feature 1: Indoor Hacks
Button: **"3 things to clean your home air today"**
Reveals 3 actionable, Kolkata-specific indoor air quality hacks:
1. **Wet Mopping Instead of Dry Sweeping**: Avoids kicking settled PM2.5 and street soot back into breathing air.
2. **Kolkata Ventilation Window (12:30 PM - 3:30 PM)**: Opening windows only when solar radiation breaks ground smog.
3. **Low-Cost Purifying Plants**: Using local Areca Palm, Snake Plant, and Money Plant to detox indoor air.

---

### 4. 🏃 Feature 2: Tomorrow's Plan
Button: **"Should I go for jogging tomorrow morning?"**
Gemini AI provides a scientifically backed morning forecast:
- **Verdict**: ⚠️ *NO — Avoid 6:00 AM outdoor jogging in Kolkata tomorrow.*
- **Reasoning**: Kolkata's winter nocturnal cooling traps toxic diesel soot below 100 meters over open parks (Maidan, Rabindra Sarobar, Eco Park).
- **Alternative**: 25 minutes of indoor workout or brisk walking after 4:15 PM.

---

## 🚀 How to Run

### Option 1: Run with Node.js
Open PowerShell or Command Prompt:
```bash
cd "C:\Users\PAULO390\.gemini\antigravity\scratch\airsafe-family"
node server.js
```
Then open your browser to [http://localhost:3000](http://localhost:3000).

### Option 2: Open Directly in Browser
You can open `index.html` directly in Google Chrome, Microsoft Edge, or any modern web browser without any local server.
