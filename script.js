// ============================================
// FEDERAL CONTRACT HUNTER 2.0 - COMPLETE SCRIPT
// All Features: Trust, Speed, USA Coverage, AI Assistant
// ============================================

// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

// User Data
let currentUser = {
    id: null,
    name: null,
    tier: 'free',
    naics: null,
    location: null,
    state: null,
    city: null,
    contractsWon: 0,
    totalValue: 0
};

// Contracts Data
let allContracts = [];
let filteredContracts = [];
let savedContracts = [];

// USA Data - Complete 50 States + Major Cities
const usaData = {
    states: [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ],
    cities: [
        "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
        "San Antonio", "San Diego", "Dallas", "Austin", "San Jose", "Jacksonville",
        "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis",
        "Seattle", "Denver", "Washington DC", "Boston", "El Paso", "Nashville",
        "Detroit", "Oklahoma City", "Portland", "Las Vegas", "Memphis", "Louisville",
        "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento",
        "Kansas City", "Mesa", "Atlanta", "Omaha", "Colorado Springs", "Raleigh",
        "Miami", "Virginia Beach", "Long Beach", "Oakland", "Minneapolis", "Tulsa",
        "Arlington", "New Orleans", "Cleveland"
    ]
};

// Demo Contracts Data
const demoContracts = [
    {
        id: 1,
        title: "AI-Powered Cybersecurity Solutions",
        agency: "Department of Defense",
        value: "$75,000,000",
        deadline: "April 15, 2026",
        naics: "541511",
        setAside: "Small Business",
        location: "Nationwide",
        isHot: true,
        description: "Develop AI/ML solutions for threat detection and incident response.",
        requirements: "AI/ML expertise, security clearance, DOD experience",
        probability: "78%"
    },
    {
        id: 2,
        title: "Cloud Migration Services",
        agency: "NASA",
        value: "$12,000,000",
        deadline: "April 20, 2026",
        naics: "541512",
        setAside: "8(a)",
        location: "Nationwide",
        isHot: false,
        description: "Migrate legacy systems to cloud infrastructure.",
        requirements: "AWS/Azure/GCP experience, FedRAMP compliance",
        probability: "65%"
    },
    {
        id: 3,
        title: "IT Support Services",
        agency: "Department of Treasury",
        value: "$8,000,000",
        deadline: "April 25, 2026",
        naics: "541511",
        setAside: "Woman-Owned",
        location: "Washington DC",
        isHot: false,
        description: "24/7 IT support for Treasury systems.",
        requirements: "ITIL certification, help desk experience",
        probability: "72%"
    },
    {
        id: 4,
        title: "Construction of Federal Building",
        agency: "GSA",
        value: "$45,000,000",
        deadline: "May 1, 2026",
        naics: "236220",
        setAside: "Small Business",
        location: "Texas",
        isHot: true,
        description: "New federal courthouse construction.",
        requirements: "Construction license, bonding capacity, past federal projects",
        probability: "55%"
    },
    {
        id: 5,
        title: "Engineering Design Services",
        agency: "USACE",
        value: "$5,000,000",
        deadline: "April 28, 2026",
        naics: "541330",
        setAside: "Veteran-Owned",
        location: "California",
        isHot: false,
        description: "Infrastructure design for flood control.",
        requirements: "PE license, AutoCAD expertise",
        probability: "82%"
    }
];

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    // Get user from Telegram
    const initData = tg.initDataUnsafe;
    currentUser.id = initData.user?.id;
    currentUser.name = initData.user?.first_name || 'Contractor';
    
    // Set user name
    document.getElementById('userName').innerText = currentUser.name;
    
    // Load user data from storage
    await loadUserData();
    
    // Populate USA coverage badges
    populateUSACoverage();
    
    // Load contracts
    await loadContracts();
    
    // Generate referral link
    generateReferralLink();
    
    // Setup event listeners
    setupEventListeners();
    
    // Show welcome toast
    showToast(`Welcome ${currentUser.name}! Ready to win contracts?`, 'success');
});

// ============================================
// USA COVERAGE - Complete 50 States
// ============================================

function populateUSACoverage() {
    const container = document.getElementById('coverageBadges');
    if (!container) return;
    
    let html = '';
    usaData.states.forEach(state => {
        html += `<span class="coverage-badge">${state}</span>`;
    });
    html += `<span class="coverage-badge">🇺🇸 DC</span>`;
    html += `<span class="coverage-badge">🇵🇷 Puerto Rico</span>`;
    html += `<span class="coverage-badge">🇻🇮 USVI</span>`;
    html += `<span class="coverage-badge">🇬🇺 Guam</span>`;
    
    container.innerHTML = html;
}

// ============================================
// LOAD CONTRACTS
// ============================================

async function loadContracts() {
    // Show loading
    document.getElementById('contractsList').innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading contracts...</div>';
    
    // Simulate API call (replace with actual SAM.gov API)
    setTimeout(() => {
        allContracts = demoContracts;
        filteredContracts = [...allContracts];
        renderContracts();
        updateContractCount();
    }, 500);
}

function renderContracts() {
    const container = document.getElementById('contractsList');
    
    if (!filteredContracts || filteredContracts.length === 0) {
        container.innerHTML = '<div class="loading">No contracts found. Try adjusting filters.</div>';
        return;
    }
    
    let html = '';
    filteredContracts.forEach(contract => {
        html += `
            <div class="contract-item" onclick="viewContract(${contract.id})">
                <div class="contract-title">
                    <span>${contract.title}</span>
                    ${contract.isHot ? '<span class="hot-badge">🔥 HOT</span>' : ''}
                </div>
                <div class="contract-meta">
                    <span><i class="fas fa-building"></i> ${contract.agency}</span>
                    <span class="contract-value"><i class="fas fa-dollar-sign"></i> ${contract.value}</span>
                    <span class="contract-deadline"><i class="fas fa-calendar"></i> ${contract.deadline}</span>
                </div>
                <div class="contract-meta">
                    <span><i class="fas fa-tag"></i> NAICS: ${contract.naics}</span>
                    <span><i class="fas fa-trophy"></i> ${contract.setAside}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${contract.location}</span>
                </div>
                <div style="margin-top: 8px;">
                    <span style="font-size: 11px; color: var(--success);">🎯 Win Probability: ${contract.probability}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function updateContractCount() {
    const count = filteredContracts.length;
    document.getElementById('contractCount').innerHTML = `${count} opportunities`;
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === '') {
            filteredContracts = [...allContracts];
        } else {
            filteredContracts = allContracts.filter(contract => 
                contract.title.toLowerCase().includes(searchTerm) ||
                contract.agency.toLowerCase().includes(searchTerm) ||
                contract.naics.includes(searchTerm) ||
                contract.location.toLowerCase().includes(searchTerm)
            );
        }
        renderContracts();
        updateContractCount();
    });
}

function filterBy(filter) {
    // Update active chip
    document.querySelectorAll('.chip').forEach(chip => {
        chip.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (filter === 'all') {
        filteredContracts = [...allContracts];
    } else if (filter === '541511') {
        filteredContracts = allContracts.filter(c => c.naics === '541511');
    } else if (filter === '236220') {
        filteredContracts = allContracts.filter(c => c.naics === '236220');
    } else if (filter === '541330') {
        filteredContracts = allContracts.filter(c => c.naics === '541330');
    } else if (filter === 'small') {
        filteredContracts = allContracts.filter(c => c.setAside === 'Small Business');
    } else if (filter === '8a') {
        filteredContracts = allContracts.filter(c => c.setAside === '8(a)');
    } else if (filter === 'woman') {
        filteredContracts = allContracts.filter(c => c.setAside === 'Woman-Owned');
    } else if (filter === 'veteran') {
        filteredContracts = allContracts.filter(c => c.setAside === 'Veteran-Owned');
    }
    
    renderContracts();
    updateContractCount();
}

function startVoiceSearch() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('searchInput').value = transcript;
            // Trigger search
            const inputEvent = new Event('input');
            document.getElementById('searchInput').dispatchEvent(inputEvent);
        };
        
        recognition.onerror = () => {
            showToast('Voice search not supported', 'error');
        };
    } else {
        showToast('Voice search not supported on this device', 'error');
    }
}

// ============================================
// PLAN SELECTION & PAYMENT
// ============================================

let selectedPlan = null;

function selectPlan(plan) {
    selectedPlan = plan;
    
    // Remove selected class from all plans
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to chosen plan
    if (plan === 'free') {
        document.getElementById('freePlan').classList.add('selected');
        showToast('You are on Free Tier! Upgrade for more contracts.', 'info');
    } else if (plan === 'premium') {
        document.getElementById('premiumPlan').classList.add('selected');
        showPaymentMethods('premium', 29);
    } else if (plan === 'elite') {
        document.getElementById('elitePlan').classList.add('selected');
        showPaymentMethods('elite', 79);
    }
}

function showPaymentMethods(plan, amount) {
    tg.showPopup({
        title: `Upgrade to ${plan.toUpperCase()}`,
        message: `Pay $${amount}/month for ${plan.toUpperCase()} features. Choose payment method:`,
        buttons: [
            {text: "💳 Card", callback_data: "card"},
            {text: "📱 Apple Pay", callback_data: "apple"},
            {text: "⭐ Stars", callback_data: "stars"},
            {text: "₿ Crypto", callback_data: "crypto"},
            {text: "💰 PayPal", callback_data: "paypal"},
            {text: "Cancel", callback_data: "cancel"}
        ]
    }, (buttonId) => {
        if (buttonId && buttonId !== 'cancel') {
            initiatePayment(plan, amount, buttonId);
        }
    });
}

function initiatePayment(plan, amount, method) {
    // All payments go through Telegram Stars/Invoice system
    const starsAmount = amount * 200; // $1 = 200 Stars
    
    const invoice = {
        title: `${plan.toUpperCase()} Subscription`,
        description: `Monthly access to federal contracts filtered by your industry`,
        currency: "XTR",
        prices: [{ label: `${plan.toUpperCase()} Plan`, amount: starsAmount }],
        payload: JSON.stringify({
            plan: plan,
            user_id: currentUser.id,
            method: method,
            timestamp: Date.now()
        })
    };
    
    tg.showInvoice(invoice);
}

// Payment success handler (called by bot/webhook)
function onPaymentSuccess(plan) {
    currentUser.tier = plan;
    updateUserUI();
    showToast(`✅ Success! You are now on ${plan.toUpperCase()} plan!`, 'success');
    
    // Update badge
    const badgeStatus = document.getElementById('badgeStatus');
    const badgeText = document.getElementById('badgeText');
    
    if (plan === 'premium') {
        badgeStatus.className = 'badge-status premium';
        badgeText.innerText = 'PREMIUM';
    } else if (plan === 'elite') {
        badgeStatus.className = 'badge-status elite';
        badgeText.innerText = 'ELITE';
    }
    
    // Reload contracts with premium data
    loadContracts();
}

function updateUserUI() {
    if (currentUser.tier === 'premium') {
        document.getElementById('badgeStatus').className = 'badge-status premium';
        document.getElementById('badgeText').innerText = '⭐ PREMIUM';
    } else if (currentUser.tier === 'elite') {
        document.getElementById('badgeStatus').className = 'badge-status elite';
        document.getElementById('badgeText').innerText = '👑 ELITE';
    }
}

// ============================================
// AI ASSISTANT
// ============================================

function openAIAssistant() {
    tg.showPopup({
        title: "🤖 AI Contract Assistant",
        message: "Ask me anything about federal contracts!\n\nExamples:\n• What NAICS code should I use?\n• How to write a winning bid?\n• Help me find contracts in Texas\n• What's the best pricing strategy?",
        buttons: [{text: "Start Chat", callback_data: "start"}]
    }, () => {
        // Open AI chat (can be implemented via bot)
        tg.showAlert("💡 Tip: Use the search bar above with keywords like 'NAICS 541511' or 'Small Business contracts'");
    });
}

// Update AI suggestions based on user activity
function updateAISuggestion() {
    const suggestions = [
        "💡 Try searching for 'NAICS 541511' for IT contracts",
        "🔥 Hot tip: Set aside contracts have less competition",
        "📈 Small business set-asides increased 23% this year",
        "🎯 Focus on your NAICS code for better results",
        "💰 Average contract value this month: $2.4M"
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    const aiSuggestion = document.getElementById('aiSuggestion');
    if (aiSuggestion) {
        aiSuggestion.innerHTML = randomSuggestion;
    }
}

// Rotate AI suggestions every 30 seconds
setInterval(updateAISuggestion, 30000);

// ============================================
// REFERRAL SYSTEM
// ============================================

function generateReferralLink() {
    const link = `https://t.me/FederalContractHunterBot?start=ref_${currentUser.id}`;
    const referralInput = document.getElementById('referralLink');
    if (referralInput) {
        referralInput.value = link;
    }
}

function copyReferralLink() {
    const link = document.getElementById('referralLink');
    link.select();
    document.execCommand('copy');
    showToast('Referral link copied! Share with other contractors.', 'success');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showTab(tab) {
    // Update active nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
    
    if (tab === 'home') {
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'search') {
        document.getElementById('searchInput').focus();
    } else if (tab === 'saved') {
        showToast('Saved contracts feature coming soon!', 'info');
    } else if (tab === 'analytics') {
        showAnalytics();
    } else if (tab === 'profile') {
        showProfile();
    }
}

function showAnalytics() {
    tg.showPopup({
        title: "Your Analytics",
        message: `📊 Performance Stats\n\n` +
                 `🏆 Contracts Won: ${currentUser.contractsWon}\n` +
                 `💰 Total Value: $${currentUser.totalValue}\n` +
                 `⭐ Current Plan: ${currentUser.tier.toUpperCase()}\n` +
                 `📅 Member Since: ${new Date().toLocaleDateString()}`,
        buttons: [{text: "Close"}]
    });
}

function showProfile() {
    tg.showPopup({
        title: "Your Profile",
        message: `👤 ${currentUser.name}\n` +
                 `⭐ Plan: ${currentUser.tier.toUpperCase()}\n` +
                 `🔢 NAICS: ${currentUser.naics || 'Not set'}\n` +
                 `📍 Location: ${currentUser.location || 'Not set'}\n` +
                 `🏆 Contracts Won: ${currentUser.contractsWon}\n\n` +
                 `Open Mini App to update preferences.`,
        buttons: [{text: "Close"}]
    });
}

function viewContract(contractId) {
    const contract = allContracts.find(c => c.id === contractId);
    if (contract) {
        tg.showPopup({
            title: contract.title,
            message: `🏛️ ${contract.agency}\n\n` +
                     `💰 Value: ${contract.value}\n` +
                     `📅 Deadline: ${contract.deadline}\n` +
                     `🔢 NAICS: ${contract.naics}\n` +
                     `🏷️ Set-Aside: ${contract.setAside}\n\n` +
                     `📌 Description:\n${contract.description}\n\n` +
                     `✅ Requirements:\n${contract.requirements}\n\n` +
                     `🎯 Win Probability: ${contract.probability}`,
            buttons: [
                {text: "Save Contract"},
                {text: "View on SAM.gov", callback_data: "view"}
            ]
        }, (buttonId) => {
            if (buttonId === 'view') {
                tg.openLink(`https://sam.gov/opp/${contract.id}`);
            } else if (buttonId === 'Save Contract') {
                saveContract(contractId);
            }
        });
    }
}

function saveContract(contractId) {
    if (!savedContracts.includes(contractId)) {
        savedContracts.push(contractId);
        showToast('Contract saved! View in "Saved" tab.', 'success');
    }
}

// ============================================
// LOAD USER DATA
// ============================================

async function loadUserData() {
    // Simulate loading from backend
    // In production, fetch from your database
    
    // Demo data
    currentUser.contractsWon = 2;
    currentUser.totalValue = 1250000;
    
    document.getElementById('contractsWon').innerHTML = `🏆 ${currentUser.contractsWon} Contracts Won`;
    document.getElementById('totalValue').innerHTML = `💰 $${(currentUser.totalValue / 1000000).toFixed(1)}M Value`;
}

function setupEventListeners() {
    // Keyboard search on Enter
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                // Search already handled by input event
            }
        });
    }
}

// ============================================
// PAYMENT METHODS (All via Telegram)
// ============================================

function payWith(method) {
    if (!selectedPlan) {
        showToast('Please select a plan first!', 'error');
        return;
    }
    
    let amount = selectedPlan === 'premium' ? 29 : 79;
    initiatePayment(selectedPlan, amount, method);
}
