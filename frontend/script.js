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
const body = document.body;
const startAskingBtn = document.getElementById('start-asking-btn');
const chips = document.querySelectorAll('.chip');

// Theme toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Scroll to chat
if (startAskingBtn) {
    startAskingBtn.addEventListener('click', () => {
        document.getElementById('chat-section').scrollIntoView({ behavior: 'smooth' });
        userInput.focus();
    });
}

// Suggested chips
chips.forEach(chip => {
    chip.addEventListener('click', () => {
        userInput.value = chip.textContent;
        chatForm.dispatchEvent(new Event('submit'));
    });
});

// Global function for dashboard cards
window.suggestQuestion = function (text) {
    userInput.value = text;
    document.getElementById('chat-section').scrollIntoView({ behavior: 'smooth' });
    chatForm.dispatchEvent(new Event('submit'));
};

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');

    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Convert newlines to HTML breaks for better readability
    bubble.innerHTML = text.replace(/\n/g, '<br>');

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

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = userInput.value.trim();
    if (!message) return;

    const language = document.querySelector('.language-selector').value;

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
