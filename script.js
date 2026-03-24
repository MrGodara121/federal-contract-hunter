// ============================================
// FEDERAL CONTRACT HUNTER - COMPLETE JAVASCRIPT
// USA 50 States | All Cities | All Features
// ============================================

// Telegram WebApp Init
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// ========== USER DATA ==========
let currentUser = {
    id: null,
    name: null,
    tier: 'free',
    naics: null,
    location: null,
    city: null,
    savedContracts: []
};

let allContracts = [];
let filteredContracts = [];
let currentPage = 0;
const CONTRACTS_PER_PAGE = 10;

// ========== USA CITIES DATABASE (Top 100 Cities) ==========
const usaCities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "Austin",
    "San Jose", "Fort Worth", "Jacksonville", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle", "Denver", "Washington",
    "Boston", "El Paso", "Nashville", "Detroit", "Oklahoma City", "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore",
    "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Kansas City", "Mesa", "Atlanta", "Omaha", "Colorado Springs",
    "Raleigh", "Miami", "Long Beach", "Virginia Beach", "Oakland", "Minneapolis", "Tulsa", "Arlington", "New Orleans", "Wichita",
    "Cleveland", "Tampa", "Bakersfield", "Aurora", "Anaheim", "Honolulu", "Santa Ana", "Riverside", "Corpus Christi", "Lexington",
    "Stockton", "St. Louis", "Saint Paul", "Cincinnati", "Pittsburgh", "Henderson", "Greensboro", "Anchorage", "Plano", "Newark",
    "Lincoln", "Orlando", "Chula Vista", "Irvine", "Fort Wayne", "Jersey City", "Durham", "St. Petersburg", "Lubbock", "Madison",
    "Chandler", "Buffalo", "Laredo", "Gilbert", "Reno", "Winston-Salem", "Hialeah", "Garland", "Scottsdale", "Chesapeake",
    "North Las Vegas", "Fremont", "Baton Rouge", "Richmond", "Boise", "San Bernardino", "Spokane", "Des Moines", "Montgomery", "Fargo"
];

// ========== DEMO CONTRACTS DATA (USA All States) ==========
const demoContracts = [
    {
        id: 1,
        title: "AI-Powered Cybersecurity Solutions",
        agency: "Department of Defense",
        value: 75000000,
        valueFormatted: "$75,000,000",
        deadline: "April 15, 2026",
        naics: "541511",
        naicsName: "Custom Computer Programming",
        setAside: "Small Business",
        location: "Nationwide",
        state: "DC",
        city: "Washington",
        isHot: true,
        isNew: true,
        postedDate: "March 24, 2026"
    },
    {
        id: 2,
        title: "Cloud Migration Services",
        agency: "NASA",
        value: 12000000,
        valueFormatted: "$12,000,000",
        deadline: "April 20, 2026",
        naics: "541512",
        naicsName: "Computer Systems Design",
        setAside: "8(a)",
        location: "California, Texas, Florida",
        state: "CA",
        city: "Houston",
        isHot: false,
        isNew: true,
        postedDate: "March 23, 2026"
    },
    {
        id: 3,
        title: "IT Support Services",
        agency: "Department of Treasury",
        value: 8000000,
        valueFormatted: "$8,000,000",
        deadline: "April 25, 2026",
        naics: "541511",
        naicsName: "Custom Computer Programming",
        setAside: "Woman-Owned",
        location: "Virginia, Maryland, DC",
        state: "VA",
        city: "Arlington",
        isHot: false,
        isNew: false,
        postedDate: "March 22, 2026"
    },
    {
        id: 4,
        title: "Construction Services for Military Facilities",
        agency: "Department of Army",
        value: 45000000,
        valueFormatted: "$45,000,000",
        deadline: "May 1, 2026",
        naics: "236220",
        naicsName: "Commercial and Institutional Building Construction",
        setAside: "SDVOSB",
        location: "Texas, Oklahoma, Louisiana",
        state: "TX",
        city: "Fort Worth",
        isHot: true,
        isNew: false,
        postedDate: "March 21, 2026"
    },
    {
        id: 5,
        title: "Engineering Services for Infrastructure",
        agency: "Department of Transportation",
        value: 25000000,
        valueFormatted: "$25,000,000",
        deadline: "April 28, 2026",
        naics: "541330",
        naicsName: "Engineering Services",
        setAside: "Small Business",
        location: "California, Oregon, Washington",
        state: "CA",
        city: "Sacramento",
        isHot: false,
        isNew: true,
        postedDate: "March 24, 2026"
    },
    {
        id: 6,
        title: "Facilities Maintenance Services",
        agency: "General Services Administration",
        value: 15000000,
        valueFormatted: "$15,000,000",
        deadline: "April 18, 2026",
        naics: "561210",
        naicsName: "Facilities Support Services",
        setAside: "HUBZone",
        location: "Nationwide",
        state: "DC",
        city: "Washington",
        isHot: false,
        isNew: false,
        postedDate: "March 20, 2026"
    },
    {
        id: 7,
        title: "Management Consulting Services",
        agency: "Department of Health and Human Services",
        value: 5000000,
        valueFormatted: "$5,000,000",
        deadline: "May 5, 2026",
        naics: "541611",
        naicsName: "Administrative Management Consulting",
        setAside: "Woman-Owned",
        location: "Maryland, DC, Virginia",
        state: "MD",
        city: "Baltimore",
        isHot: false,
        isNew: true,
        postedDate: "March 23, 2026"
    },
    {
        id: 8,
        title: "Data Center Operations",
        agency: "Department of Homeland Security",
        value: 95000000,
        valueFormatted: "$95,000,000",
        deadline: "April 30, 2026",
        naics: "541519",
        naicsName: "Other Computer Related Services",
        setAside: "Small Business",
        location: "Virginia, North Carolina, Georgia",
        state: "VA",
        city: "Richmond",
        isHot: true,
        isNew: false,
        postedDate: "March 19, 2026"
    },
    {
        id: 9,
        title: "Software Development for Veterans Affairs",
        agency: "Department of Veterans Affairs",
        value: 32000000,
        valueFormatted: "$32,000,000",
        deadline: "May 10, 2026",
        naics: "541511",
        naicsName: "Custom Computer Programming",
        setAside: "SDVOSB",
        location: "Nationwide",
        state: "DC",
        city: "Washington",
        isHot: false,
        isNew: true,
        postedDate: "March 24, 2026"
    },
    {
        id: 10,
        title: "Environmental Remediation Services",
        agency: "Environmental Protection Agency",
        value: 18000000,
        valueFormatted: "$18,000,000",
        deadline: "May 15, 2026",
        naics: "562910",
        naicsName: "Remediation Services",
        setAside: "8(a)",
        location: "Florida, Georgia, Alabama",
        state: "FL",
        city: "Miami",
        isHot: false,
        isNew: false,
        postedDate: "March 18, 2026"
    }
];

// Generate more contracts for all 50 states
for (let i = 11; i <= 150; i++) {
    const states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];
    const cities = usaCities;
    const randomState = states[Math.floor(Math.random() * states.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const values = [250000, 500000, 1000000, 2500000, 5000000, 10000000, 25000000, 50000000, 100000000];
    const naicsList = ["541511","541512","541513","541519","541330","236220","561210","541611","541614","541618"];
    const setAsides = ["Small Business", "8(a)", "Woman-Owned", "SDVOSB", "HUBZone", "None"];
    
    demoContracts.push({
        id: i,
        title: `Contract Opportunity ${i}: ${["IT Services", "Construction", "Consulting", "Maintenance", "Software"][Math.floor(Math.random() * 5)]} Project`,
        agency: ["DOD", "NASA", "DHS", "VA", "GSA", "Treasury", "HHS"][Math.floor(Math.random() * 7)],
        value: values[Math.floor(Math.random() * values.length)],
        valueFormatted: `$${values[Math.floor(Math.random() * values.length)].toLocaleString()}`,
        deadline: `April ${Math.floor(Math.random() * 30) + 1}, 2026`,
        naics: naicsList[Math.floor(Math.random() * naicsList.length)],
        naicsName: "Various Services",
        setAside: setAsides[Math.floor(Math.random() * setAsides.length)],
        location: `${randomCity}, ${randomState}`,
        state: randomState,
        city: randomCity,
        isHot: Math.random() > 0.8,
        isNew: Math.random() > 0.9,
        postedDate: `March ${Math.floor(Math.random() * 24) + 1}, 2026`
    });
}

allContracts = demoContracts;
filteredContracts = [...allContracts];

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', async () => {
    const initData = tg.initDataUnsafe;
    currentUser.id = initData.user?.id || Math.floor(Math.random() * 1000000);
    currentUser.name = initData.user?.first_name || 'Contractor';
    
    document.getElementById('userName').innerText = currentUser.name;
    
    await loadUserStatus();
    updateStats();
    renderContracts();
    setupEventListeners();
    generateReferralLink();
    
    tg.ready();
});

// ========== LOAD USER STATUS ==========
async function loadUserStatus() {
    const savedTier = localStorage.getItem(`fch_tier_${currentUser.id}`);
    if (savedTier) {
        currentUser.tier = savedTier;
        updateUserBadge();
    }
    
    const savedNaics = localStorage.getItem(`fch_naics_${currentUser.id}`);
    if (savedNaics) {
        currentUser.naics = savedNaics;
        document.getElementById('naicsSelect').value = savedNaics;
    }
    
    const savedState = localStorage.getItem(`fch_state_${currentUser.id}`);
    if (savedState) {
        currentUser.location = savedState;
        document.getElementById('stateSelect').value = savedState;
    }
    
    const savedCity = localStorage.getItem(`fch_city_${currentUser.id}`);
    if (savedCity) {
        currentUser.city = savedCity;
        document.getElementById('citySearch').value = savedCity;
    }
}

function updateUserBadge() {
    const badge = document.getElementById('userBadge');
    if (currentUser.tier === 'premium') {
        badge.innerHTML = '<span class="badge-premium">⭐ PREMIUM</span>';
        document.querySelectorAll('.premium-only').forEach(el => el.classList.remove('hidden'));
    } else if (currentUser.tier === 'elite') {
        badge.innerHTML = '<span class="badge-elite">👑 ELITE</span>';
        document.querySelectorAll('.premium-only').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('.elite-only').forEach(el => el.classList.remove('hidden'));
    } else {
        badge.innerHTML = '<span class="badge-free">FREE</span>';
    }
}

// ========== STATS UPDATE ==========
function updateStats() {
    const todayContracts = allContracts.filter(c => c.postedDate.includes('March 24')).length || allContracts.length;
    const totalValue = allContracts.reduce((sum, c) => sum + c.value, 0);
    
    document.getElementById('todayContracts').innerText = todayContracts;
    document.getElementById('totalValue').innerText = `$${(totalValue / 1000000000).toFixed(1)}B`;
}

// ========== RENDER CONTRACTS ==========
function renderContracts() {
    const container = document.getElementById('contractsList');
    const start = currentPage * CONTRACTS_PER_PAGE;
    const end = start + CONTRACTS_PER_PAGE;
    const contractsToShow = filteredContracts.slice(start, end);
    
    if (contractsToShow.length === 0 && currentPage === 0) {
        container.innerHTML = '<div class="loading-container"><p>No contracts found for your filters.</p></div>';
        return;
    }
    
    if (contractsToShow.length === 0 && currentPage > 0) {
        document.getElementById('loadMoreBtn').style.display = 'none';
        return;
    }
    
    let html = '';
    contractsToShow.forEach(contract => {
        const isPremiumFeature = currentUser.tier === 'free' && (contract.isHot || contract.isNew);
        
        html += `
            <div class="contract-item" onclick="viewContract(${contract.id})">
                <div class="contract-title">
                    ${contract.title}
                    ${contract.isHot ? '<span class="hot-badge">🔥 HOT</span>' : ''}
                    ${contract.isNew ? '<span class="new-badge">🆕 NEW</span>' : ''}
                    ${isPremiumFeature ? '<span class="hot-badge">⭐ PREMIUM</span>' : ''}
                </div>
                <div class="contract-meta">
                    <span>🏛️ ${contract.agency}</span>
                    <span class="contract-value">💰 ${contract.valueFormatted}</span>
                    <span class="contract-deadline">📅 ${contract.deadline}</span>
                </div>
                <div class="contract-meta">
                    <span>🔢 NAICS: ${contract.naics}</span>
                    <span>📍 ${contract.location}</span>
                    <span>🏷️ ${contract.setAside}</span>
                </div>
                ${isPremiumFeature ? '<div class="premium-banner" style="margin-top:8px; font-size:11px; color:#f39c12;">⭐ Upgrade to Premium to view full details</div>' : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
    document.getElementById('loadMoreBtn').style.display = filteredContracts.length > end ? 'block' : 'none';
}

// ========== VIEW CONTRACT DETAILS ==========
function viewContract(contractId) {
    const contract = allContracts.find(c => c.id === contractId);
    if (!contract) return;
    
    const isPremiumContent = contract.isHot || contract.isNew;
    
    if (isPremiumContent && currentUser.tier === 'free') {
        tg.showPopup({
            title: "⭐ Premium Content",
            message: "This contract is only visible to Premium members.\n\nUpgrade now to see all hot contracts and get 20+ daily opportunities!",
            buttons: [{text: "Upgrade Now"}, {text: "Cancel"}]
        }, (buttonId) => {
            if (buttonId === 0) showPaymentOptions();
        });
        return;
    }
    
    const message = `
📄 **${contract.title}**

🏛️ **Agency:** ${contract.agency}
💰 **Value:** ${contract.valueFormatted}
📅 **Deadline:** ${contract.deadline}
🔢 **NAICS:** ${contract.naics} - ${contract.naicsName}
📍 **Location:** ${contract.location}
🏷️ **Set-Aside:** ${contract.setAside}

📌 **Description:**
${getContractDescription(contract)}

💡 **Bid Strategy:**
${getBidStrategy(contract)}

🔗 **Full Details:** sam.gov/opp/${contract.id}
    `;
    
    tg.showPopup({
        title: contract.title,
        message: message,
        buttons: [{text: "Close"}]
    });
}

function getContractDescription(contract) {
    const descriptions = {
        "541511": "This contract requires expertise in custom software development, AI/ML integration, and cybersecurity protocols.",
        "236220": "This contract involves commercial and institutional building construction with federal compliance requirements.",
        "541330": "This contract requires engineering design, analysis, and project management services.",
        "default": "This federal contract opportunity requires qualified vendors with relevant past performance."
    };
    return descriptions[contract.naics] || descriptions.default;
}

function getBidStrategy(contract) {
    return `✅ Highlight past performance in ${contract.naicsName}\n✅ Demonstrate team qualifications\n✅ Price competitively (${(contract.value / 1000000).toFixed(0)}M range)\n✅ Include all required certifications`;
}

// ========== SEARCH & FILTER ==========
function searchContracts() {
    const searchTerm = document.getElementById('globalSearch').value.toLowerCase();
    const filterType = document.querySelector('.chip.active')?.dataset.filter || 'all';
    const naics = document.getElementById('naicsSelect').value;
    const state = document.getElementById('stateSelect').value;
    const city = document.getElementById('citySearch').value.toLowerCase();
    const priceRange = document.getElementById('priceRange').value;
    
    filteredContracts = allContracts.filter(contract => {
        if (searchTerm && !contract.title.toLowerCase().includes(searchTerm) && 
            !contract.agency.toLowerCase().includes(searchTerm)) return false;
        
        if (filterType !== 'all') {
            const filterMap = {
                'small_biz': 'Small Business',
                '8a': '8(a)',
                'wosb': 'Woman-Owned',
                'sdvosb': 'SDVOSB',
                'hubzone': 'HUBZone'
            };
            if (contract.setAside !== filterMap[filterType]) return false;
        }
        
        if (naics && contract.naics !== naics) return false;
        if (state && contract.state !== state) return false;
        if (city && !contract.city.toLowerCase().includes(city)) return false;
        
        if (priceRange) {
            const value = contract.value;
            const ranges = {
                'under_100k': value < 100000,
                '100k_1m': value >= 100000 && value < 1000000,
                '1m_10m': value >= 1000000 && value < 10000000,
                '10m_100m': value >= 10000000 && value < 100000000,
                'over_100m': value >= 100000000
            };
            if (!ranges[priceRange]) return false;
        }
        
        return true;
    });
    
    currentPage = 0;
    renderContracts();
}

function sortByValue() {
    filteredContracts.sort((a, b) => b.value - a.value);
    renderContracts();
}

function sortByDate() {
    filteredContracts.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    renderContracts();
}

// ========== PLAN SELECTION ==========
function selectPlan(plan) {
    if (plan === 'premium') {
        showPaymentOptions();
    } else if (plan === 'elite') {
        showPaymentOptions();
    } else if (plan === 'free') {
        tg.showAlert("You are already on Free Tier! Upgrade to Premium for 20+ daily contracts.");
    }
}

function showPaymentOptions() {
    const buttons = [
        {text: "💳 Pay with Card", callback_data: "card"},
        {text: "⭐ Pay with Telegram Stars", callback_data: "stars"},
        {text: "₿ Pay with Crypto (USDT)", callback_data: "crypto"},
        {text: "💰 PayPal", callback_data: "paypal"}
    ];
    
    tg.showPopup({
        title: "Choose Payment Method",
        message: "Select how you want to pay for Premium ($29/month) or Elite ($79/month)",
        buttons: buttons
    }, (buttonId) => {
        if (buttonId === 0) initiateCardPayment();
        else if (buttonId === 1) initiateStarsPayment();
        else if (buttonId === 2) initiateCryptoPayment();
        else if (buttonId === 3) initiatePayPalPayment();
    });
}

function initiateCardPayment() {
    tg.showInvoice({
        title: "Premium Monthly",
        description: "20+ federal contracts daily, NAICS filter, location filter, deadline alerts",
        currency: "USD",
        prices: [{label: "Premium Plan", amount: 2900}],
        payload: JSON.stringify({plan: "premium", user_id: currentUser.id})
    });
}

function initiateStarsPayment() {
    tg.showInvoice({
        title: "Premium Monthly",
        description: "20+ federal contracts daily",
        currency: "XTR",
        prices: [{label: "Premium Plan", amount: 5800}],
        payload: JSON.stringify({plan: "premium", user_id: currentUser.id})
    });
}

function initiateCryptoPayment() {
    tg.showAlert("Send USDT (TON) to: UQCD3wXJQ5sL5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x\n\nMemo: PREMIUM_" + currentUser.id);
}

function initiatePayPalPayment() {
    tg.openLink(`https://paypal.me/yourusername/29`);
}

// ========== REFERRAL SYSTEM ==========
function generateReferralLink() {
    const link = `https://t.me/FederalContractHunterBot?start=ref_${currentUser.id}`;
    document.getElementById('referralLink').value = link;
    
    const referrals = JSON.parse(localStorage.getItem(`fch_referrals_${currentUser.id}`) || '[]');
    document.getElementById('referralCount').innerText = referrals.length;
    
    const earnings = referrals.length * 2.9;
    document.getElementById('referralEarnings').innerText = `$${earnings}`;
    
    const nextReward = referrals.length < 5 ? (5 - referrals.length) + ' more referrals' : 'Lifetime Premium Unlocked!';
    document.getElementById('nextReward').innerText = nextReward;
}

function copyReferralLink() {
    const link = document.getElementById('referralLink');
    link.select();
    document.execCommand('copy');
    tg.showAlert('Referral link copied! Share with other contractors.');
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    document.getElementById('searchSubmit').addEventListener('click', searchContracts);
    document.getElementById('clearSearch').addEventListener('click', () => {
        document.getElementById('globalSearch').value = '';
        searchContracts();
    });
    document.getElementById('sortByValue').addEventListener('click', sortByValue);
    document.getElementById('sortByDate').addEventListener('click', sortByDate);
    document.getElementById('loadMoreBtn').addEventListener('click', () => {
        currentPage++;
        renderContracts();
    });
    document.getElementById('copyReferralBtn').addEventListener('click', copyReferralLink);
    document.getElementById('premiumBtn').addEventListener('click', () => selectPlan('premium'));
    document.getElementById('eliteBtn').addEventListener('click', () => selectPlan('elite'));
    
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function() {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            searchContracts();
        });
    });
    
    document.getElementById('naicsSelect').addEventListener('change', () => {
        if (currentUser.tier === 'premium' || currentUser.tier === 'elite') {
            localStorage.setItem(`fch_naics_${currentUser.id}`, document.getElementById('naicsSelect').value);
            searchContracts();
        } else {
            tg.showAlert("NAICS filtering is a Premium feature. Upgrade now!");
        }
    });
    
    document.getElementById('stateSelect').addEventListener('change', () => {
        if (currentUser.tier === 'premium' || currentUser.tier === 'elite') {
            localStorage.setItem(`fch_state_${currentUser.id}`, document.getElementById('stateSelect').value);
            searchContracts();
        } else {
            tg.showAlert("Location filtering is a Premium feature. Upgrade now!");
        }
    });
    
    document.getElementById('citySearch').addEventListener('input', () => {
        if (currentUser.tier === 'premium' || currentUser.tier === 'elite') {
            localStorage.setItem(`fch_city_${currentUser.id}`, document.getElementById('citySearch').value);
            searchContracts();
        }
    });
    
    document.getElementById('priceRange').addEventListener('change', searchContracts);
    document.getElementById('globalSearch').addEventListener('input', () => {
        document.getElementById('clearSearch').style.display = 
            document.getElementById('globalSearch').value ? 'block' : 'none';
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            const tab = this.dataset.tab;
            handleTabChange(tab);
        });
    });
}

function handleTabChange(tab) {
    if (tab === 'home') {
        document.querySelectorAll('.search-section, .contracts-section, .trust-section, .referral-section').forEach(el => el.style.display = 'block');
    } else if (tab === 'search') {
        document.getElementById('globalSearch').focus();
    } else if (tab === 'saved') {
        tg.showAlert("Saved contracts feature coming soon! Upgrade to Premium to save contracts.");
    } else if (tab === 'profile') {
        showProfile();
    } else if (tab === 'help') {
        showHelp();
    }
}

function showProfile() {
    tg.showPopup({
        title: "Your Profile",
        message: `👤 Name: ${currentUser.name}\n⭐ Plan: ${currentUser.tier.toUpperCase()}\n🔢 NAICS: ${currentUser.naics || 'Not set'}\n📍 Location: ${currentUser.city || 'Not set'}, ${currentUser.location || 'Not set'}\n\nUpgrade to Premium for full access!`,
        buttons: [{text: "Close"}]
    });
}

function showHelp() {
    tg.showPopup({
        title: "Help Center",
        message: "📌 How to use:\n1. Set your NAICS code\n2. Select your state/city\n3. Browse daily contracts\n4. Upgrade to Premium for full access\n\n📧 Support: support@federalcontracthunter.com\n⏰ Response: Within 24 hours",
        buttons: [{text: "Close"}]
    });
}
