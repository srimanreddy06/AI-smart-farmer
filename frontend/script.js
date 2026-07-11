// API Endpoint Configuration
const getApiUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://127.0.0.1:5000/chat';
    }
    // Replace with your actual deployed Render/Railway backend service URL
    return 'https://ai-smart-farmer-yir3.onrender.com/chat';
};

const chatHistory = document.getElementById('chat-history');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;
const startAskingBtn = document.getElementById('start-asking-btn');

// Responsive Sidebar Drawer Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
const sidebarOverlay = document.getElementById('sidebar-overlay');

const toggleSidebar = () => {
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
};

if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleSidebar);
if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', toggleSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

// Close sidebar on category click and auto-submit search query
const categoryItems = document.querySelectorAll('.category-list li');
categoryItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            toggleSidebar();
        }
        userInput.value = `Tell me about ${item.textContent}`;
        document.getElementById('chat-section').scrollIntoView({ behavior: 'smooth' });
        chatForm.dispatchEvent(new Event('submit'));
    });
});

// Theme toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (themeIcon) {
        const isDarkMode = body.classList.contains('dark-mode');
        themeIcon.setAttribute('data-lucide', isDarkMode ? 'sun' : 'moon');
        themeToggle.setAttribute('title', isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode');
        lucide.createIcons();
    }
});

// Scroll to chat
if (startAskingBtn) {
    startAskingBtn.addEventListener('click', () => {
        document.getElementById('chat-section').scrollIntoView({ behavior: 'smooth' });
        userInput.focus();
    });
}

// Global function for dashboard cards
window.suggestQuestion = function (text) {
    userInput.value = text;
    document.getElementById('chat-section').scrollIntoView({ behavior: 'smooth' });
    chatForm.dispatchEvent(new Event('submit'));
};

// Localized & Randomized Prompt Chips pool
const chipsPool = {
    en: [
        "Organic farming schemes",
        "Drip irrigation setup",
        "Soil testing guide",
        "Kharif crop fertilizer",
        "Pest control for cotton",
        "How to get soil health card",
        "Best time to sow wheat",
        "Natural composting methods",
        "Subsidy for tractors",
        "Rainwater harvesting tips"
    ],
    hi: [
        "जैविक खेती योजनाएं",
        "टपक सिंचाई सेटअप",
        "मिट्टी परीक्षण गाइड",
        "खरीफ फसल उर्वरक",
        "कपास के लिए कीट नियंत्रण",
        "मृदा स्वास्थ्य कार्ड कैसे प्राप्त करें",
        "गेहूं बोने का सही समय",
        "प्राकृतिक खाद बनाने की विधि",
        "ट्रैक्टर पर सब्सिडी",
        "वर्षा जल संचयन के उपाय"
    ],
    te: [
        "సేంద్రీయ వ్యవసాయ పథకాలు",
        "బిందు సేద్యం అమరిక",
        "నేల పరీక్ష గైడ్",
        "ఖరీఫ్ పంట ఎరువులు",
        "పత్తిలో తెగుళ్ల నివారణ",
        "సాయిల్ హెల్త్ కార్డ్ ఎలా పొందాలి",
        "గోధుమలు నాటడానికి ఉత్తమ సమయం",
        "సహజ కంపోస్టింగ్ పద్ధతులు",
        "ట్రాక్టర్ల సబ్సిడీ",
        "వర్షపు నీటి నిల్వ చిట్కాలు"
    ],
    ta: [
        "இயற்கை விவசாய திட்டங்கள்",
        "சொட்டு நீர் பாசனம்",
        "மண் பரிசோதனை வழிகாட்டி",
        "காரிஃப் பயிர் உரம்",
        "பருத்தி பூச்சி கட்டுப்பாடு",
        "மண்வள அட்டை பெறுவது எப்படி",
        "கோதுமை விதைக்க சிறந்த நேரம்",
        "இயற்கை உரம் தயாரிக்கும் முறைகள்",
        "டிராக்டர் மானியம்",
        "மழைநீர் சேகரிப்பு குறிப்புகள்"
    ]
};

let currentLanguage = 'en';

const loadRandomChips = (lang) => {
    const chipsContainer = document.querySelector('.suggested-chips');
    if (!chipsContainer) return;
    
    chipsContainer.innerHTML = '';
    const pool = chipsPool[lang] || chipsPool['en'];
    
    // Pick 3 unique random elements
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    selected.forEach(text => {
        const chip = document.createElement('span');
        chip.classList.add('chip');
        chip.textContent = text;
        chip.addEventListener('click', () => {
            userInput.value = text;
            chatForm.dispatchEvent(new Event('submit'));
        });
        chipsContainer.appendChild(chip);
    });
};

// Language Button Selector Grid Logic
const langButtons = document.querySelectorAll('.lang-btn');
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLanguage = btn.getAttribute('data-lang');
        loadRandomChips(currentLanguage);
        
        if (window.innerWidth <= 900) {
            toggleSidebar();
        }
    });
});

// Helper for generating formatted timestamps
function getFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');

    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const textContent = document.createElement('div');
    textContent.innerHTML = text.replace(/\n/g, '<br>');
    bubble.appendChild(textContent);

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time');
    timeDiv.textContent = getFormattedTime();
    bubble.appendChild(timeDiv);

    messageDiv.appendChild(bubble);
    chatHistory.appendChild(messageDiv);

    // Auto-scroll
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'ai-message');
    loadingDiv.id = 'loading-indicator';

    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const loadingText = document.createElement('div');
    loadingText.style.fontSize = '0.85rem';
    loadingText.style.marginBottom = '0.3rem';
    loadingText.style.color = 'var(--text-muted)';
    loadingText.textContent = 'Smart Farmer AI is typing...';
    bubble.appendChild(loadingText);

    const dots = document.createElement('div');
    dots.classList.add('typing-dots');
    dots.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

    bubble.appendChild(dots);
    loadingDiv.appendChild(bubble);
    chatHistory.appendChild(loadingDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function hideLoading() {
    const loading = document.getElementById('loading-indicator');
    if (loading) {
        loading.remove();
    }
}

// Form Submission Event Listener
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = userInput.value.trim();
    if (!message) return;

    const language = currentLanguage;

    // 1. Add user message to UI
    addMessage(message, 'user');
    userInput.value = '';

    // 2. Show loading animation
    showLoading();

    try {
        // 3. Call backend API
        const response = await fetch(getApiUrl(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message, language })
        });

        const data = await response.json();
        hideLoading();

        if (response.ok) {
            addMessage(data.reply, 'ai');
        } else {
            addMessage(`Error: ${data.error || 'Something went wrong.'}`, 'ai');
        }

    } catch (error) {
        hideLoading();
        addMessage('Sorry, the server is unreachable. Please make sure the Flask backend is running.', 'ai');
        console.error('Fetch error:', error);
    }
});

// Simulated Weather Fetch
const loadWeatherData = () => {
    const weatherCard = document.getElementById('weather-card');
    if (!weatherCard) return;
    
    setTimeout(() => {
        weatherCard.classList.remove('skeleton');
        weatherCard.innerHTML = `
            <div class="card-icon"><i data-lucide="cloud-sun-rain" class="card-icon-lucide"></i></div>
            <h3>Weather Alerts</h3>
            <p>28°C - Partly Cloudy</p>
            <p style="font-size: 0.75rem; margin-top: 0.3rem; color: var(--text-muted);">Humidity: 65% | Wind: 12 km/h</p>
        `;
        // Render icons
        lucide.createIcons();
    }, 1500);
};

// Initial setup on Page Load
window.addEventListener('DOMContentLoaded', () => {
    // Render Lucide Icons
    lucide.createIcons();
    
    // Load initial prompt chips for default English
    loadRandomChips(currentLanguage);
    
    // Load weather data simulated fetch
    loadWeatherData();
    
    // Append time to the initial hardcoded message
    const initialBubble = document.querySelector('.chat-history .message .bubble');
    if (initialBubble) {
        const timeDiv = document.createElement('div');
        timeDiv.classList.add('message-time');
        timeDiv.textContent = getFormattedTime();
        initialBubble.appendChild(timeDiv);
    }
});
