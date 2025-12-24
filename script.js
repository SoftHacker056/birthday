// ============================================
// SMOOTH SCROLLING FUNCTION
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================================
// MUSIC PLAYER FUNCTIONALITY
// ============================================
const backgroundMusic = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
let isPlaying = false;

function toggleMusic() {
    if (!backgroundMusic) return;
    
    if (isPlaying) {
        backgroundMusic.pause();
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        isPlaying = false;
    } else {
        // Try to play the music
        backgroundMusic.play().then(() => {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
            isPlaying = true;
        }).catch(error => {
            // If audio file doesn't exist, show a friendly message
            console.log('Audio file not found. You can add your own music file!');
            alert('🎵 Add your favorite motivational song to the music folder!\n\nPlace it as: music/motivational.mp3');
        });
    }
}

// Handle audio errors gracefully
if (backgroundMusic) {
    backgroundMusic.addEventListener('error', function() {
        console.log('Audio file not available. This is okay - you can add your own music later!');
    });
}

// ============================================
// EMOJI REACTION FUNCTIONALITY
// ============================================
const emojiOptions = ['😂', '🤣', '😄', '😆', '🎉', '🔥', '💯', '👏'];

function addEmojiReaction(jokeCard) {
    // Find the emoji reactions container
    const reactionsContainer = jokeCard.querySelector('.emoji-reactions');
    if (!reactionsContainer) return;
    
    // Create a new emoji element
    const emoji = document.createElement('span');
    emoji.className = 'emoji-reaction';
    
    // Pick a random emoji
    const randomEmoji = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
    emoji.textContent = randomEmoji;
    
    // Add to container
    reactionsContainer.appendChild(emoji);
    
    // Add a slight delay animation
    setTimeout(() => {
        emoji.style.animation = 'popIn 0.5s ease-out';
    }, 10);
    
    // Optional: Remove emoji after 3 seconds (or keep it)
    // setTimeout(() => {
    //     emoji.remove();
    // }, 3000);
}

// ============================================
// MEMORY MODAL FUNCTIONALITY
// ============================================
const memoryModal = document.getElementById('memoryModal');

function openMemoryModal() {
    if (memoryModal) {
        memoryModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeMemoryModal() {
    if (memoryModal) {
        memoryModal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Close modal when clicking outside of it
if (memoryModal) {
    memoryModal.addEventListener('click', function(event) {
        if (event.target === memoryModal) {
            closeMemoryModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && memoryModal && memoryModal.classList.contains('show')) {
        closeMemoryModal();
    }
});

// ============================================
// TYPING ANIMATION FOR MOTIVATION SECTION
// ============================================
const typingText = document.getElementById('typingText');
const motivationQuotes = [
    "Black coat loading…",
    "Future Advocate in progress ⏳",
    "Justice is coming...",
    "Courtroom ready mode: ON 🎯",
    "From student to Advocate... the journey begins! ⚖️"
];

let currentQuoteIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100; // milliseconds

function typeText() {
    if (!typingText) return;
    
    const currentQuote = motivationQuotes[currentQuoteIndex];
    
    if (isDeleting) {
        // Delete characters
        typingText.textContent = currentQuote.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50; // Faster when deleting
    } else {
        // Type characters
        typingText.textContent = currentQuote.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100; // Normal speed when typing
    }
    
    // When quote is complete, wait then start deleting
    if (!isDeleting && currentCharIndex === currentQuote.length) {
        typingSpeed = 2000; // Wait 2 seconds before deleting
        isDeleting = true;
    }
    // When quote is deleted, move to next quote
    else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentQuoteIndex = (currentQuoteIndex + 1) % motivationQuotes.length;
        typingSpeed = 500; // Wait 0.5 seconds before typing next
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', function() {
    // Wait a bit before starting the animation
    setTimeout(() => {
        if (typingText) {
            typeText();
        }
    }, 1000);
});

// ============================================
// SCROLL ANIMATIONS (Fade in on scroll)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.about, .dream-wall, .law-fun, .music-section, .memory-section, .motivation');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// ============================================
// BUTTON CLICK ANIMATIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// ============================================
// ADD RIPPLE EFFECT STYLE (dynamically)
// ============================================
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// LOCATION TRACKING & DEVICE DETECTION
// ============================================
function detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let deviceInfo = 'Unknown Device';
    let isMobile = false;
    
    // Detect mobile brands
    if (/android/i.test(userAgent)) {
        deviceInfo = 'Android Device';
        isMobile = true;
        // Try to detect specific brand
        if (/samsung/i.test(userAgent)) deviceInfo = 'Samsung';
        else if (/xiaomi/i.test(userAgent)) deviceInfo = 'Xiaomi';
        else if (/oneplus/i.test(userAgent)) deviceInfo = 'OnePlus';
        else if (/oppo/i.test(userAgent)) deviceInfo = 'Oppo';
        else if (/vivo/i.test(userAgent)) deviceInfo = 'Vivo';
        else if (/realme/i.test(userAgent)) deviceInfo = 'Realme';
        else if (/redmi/i.test(userAgent)) deviceInfo = 'Redmi';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        deviceInfo = 'Apple Device';
        isMobile = true;
        if (/iPhone/.test(userAgent)) deviceInfo = 'iPhone';
        else if (/iPad/.test(userAgent)) deviceInfo = 'iPad';
    }
    
    return {
        device: deviceInfo,
        userAgent: userAgent,
        isMobile: isMobile,
        browser: getBrowserName(userAgent)
    };
}

function getBrowserName(userAgent) {
    if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
    if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
    if (userAgent.indexOf('Safari') > -1) return 'Safari';
    if (userAgent.indexOf('Edge') > -1) return 'Edge';
    if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) return 'Opera';
    return 'Unknown Browser';
}

function saveVisitorInfo(lat, lng, deviceData) {
    const visitData = {
        visitTime: new Date().toLocaleString(),
        visitDate: new Date().toISOString(),
        latitude: lat || 'Not Available',
        longitude: lng || 'Not Available',
        device: deviceData.device,
        browser: deviceData.browser,
        userAgent: deviceData.userAgent,
        isMobile: deviceData.isMobile
    };
    
    // Get existing visitors from localStorage
    let visitors = JSON.parse(localStorage.getItem('websiteVisitors') || '[]');
    
    // Add new visitor
    visitors.push(visitData);
    
    // Save back to localStorage
    localStorage.setItem('websiteVisitors', JSON.stringify(visitors));
    
    console.log('Visitor info saved:', visitData);
}

// ============================================
// ENTRY FLOW - USER ACCESS CONTROL
// ============================================
let userLocation = null;
let deviceData = null;

// Check if user has already entered (to avoid showing modal again)
function hasUserEntered() {
    return localStorage.getItem('userEntered') === 'true';
}

// Request location permission (before routing)
function requestLocationPermission() {
    return new Promise((resolve) => {
        deviceData = detectDevice();
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    resolve(userLocation);
                },
                function(error) {
                    console.log('Location access denied or error:', error.message);
                    userLocation = null;
                    resolve(null);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            console.log('Geolocation not supported');
            resolve(null);
        }
    });
}

// Check user access and route accordingly
async function checkUserAccess() {
    const nameInput = document.getElementById('userNameInput');
    const userName = nameInput.value.trim();
    
    if (!userName) {
        nameInput.style.borderColor = '#ef4444';
        nameInput.placeholder = 'Please enter your name';
        setTimeout(() => {
            nameInput.style.borderColor = '';
            nameInput.placeholder = 'Enter your name';
        }, 2000);
        return;
    }
    
    // Request location before routing
    await requestLocationPermission();
    
    // Check if name is Anshu (case-insensitive: Anshu, ANSHU, anshu)
    const normalizedName = userName.toLowerCase();
    
    if (normalizedName === 'anshu') {
        // Allow access to main website
        grantMainWebsiteAccess(userName);
    } else {
        // Redirect to birthday page
        redirectToBirthdayPage(userName);
    }
}

// Grant access to main website
async function grantMainWebsiteAccess(userName) {
    // Save user data
    const userData = {
        name: userName,
        accessType: 'Main Site (Anshu)',
        visitTime: new Date().toLocaleString(),
        visitDate: new Date().toISOString(),
        location: userLocation,
        device: deviceData,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveUserToLocalStorage(userData);
    
    // Send to API
    await saveUserToAPI(userData);
    
    // Also save to Neon PostgreSQL
    saveUserToNeonDB(userData);
    
    // Hide entry modal and show main website
    document.getElementById('entryModal').classList.add('hidden');
    document.getElementById('mainWebsite').style.display = 'block';
    localStorage.setItem('userEntered', 'true');
    localStorage.setItem('userName', userName);
    localStorage.setItem('accessType', 'main');
}

// Redirect to birthday page
function redirectToBirthdayPage(userName) {
    // Save user data
    const userData = {
        name: userName,
        accessType: 'Birthday Site',
        visitTime: new Date().toLocaleString(),
        visitDate: new Date().toISOString(),
        location: userLocation,
        device: deviceData,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveUserToLocalStorage(userData);
    
    // Send to API (async, don't wait)
    saveUserToAPI(userData);
    
    // Redirect to birthday page
    localStorage.setItem('userEntered', 'true');
    localStorage.setItem('userName', userName);
    localStorage.setItem('accessType', 'birthday');
    window.location.href = 'birthday.html';
}

// Save user to localStorage
function saveUserToLocalStorage(userData) {
    let allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    allUsers.push(userData);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
}

// Save user to API
async function saveUserToAPI(userData) {
    try {
        const response = await fetch('/api/saveUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (response.ok) {
            console.log('User data saved to API');
        }
    } catch (error) {
        console.error('Error saving user to API:', error);
        // Continue even if API fails (localStorage backup)
    }
}

// Save user to Neon PostgreSQL database
async function saveUserToNeonDB(userData) {
    try {
        const neonData = {
            name: userData.name,
            device: userData.device?.device || userData.device?.userAgent || 'Unknown',
            latitude: userData.location?.latitude || null,
            longitude: userData.location?.longitude || null,
            visit_time: userData.visitTime || new Date().toISOString()
        };
        
        const response = await fetch('/api/save-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(neonData)
        });
        
        if (response.ok) {
            console.log('User data saved to Neon PostgreSQL');
        }
    } catch (error) {
        console.error('Error saving user to Neon DB:', error);
        // Continue even if DB save fails
    }
}

// Initialize entry flow on page load
window.addEventListener('load', function() {
    // Check if user already entered
    if (hasUserEntered()) {
        const accessType = localStorage.getItem('accessType');
        if (accessType === 'main') {
            // Show main website
            document.getElementById('entryModal').classList.add('hidden');
            document.getElementById('mainWebsite').style.display = 'block';
        } else if (accessType === 'birthday') {
            // Redirect to birthday page
            window.location.href = 'birthday.html';
            return;
        }
    } else {
        // Show entry modal
        document.getElementById('entryModal').style.display = 'flex';
    }
    
    // Also save visitor info (for existing tracking)
    if (deviceData) {
        saveVisitorInfo(userLocation?.latitude || null, userLocation?.longitude || null, deviceData);
    }
});

// ============================================
// ADMIN ACCESS CHECK
// ============================================
function checkAdminAccess() {
    const password = prompt('Enter password to access admin panel:');
    
    if (password === 'kimiry@123') {
        // Redirect to admin panel
        window.location.href = 'admin/admin.html';
    } else if (password !== null) {
        // User entered something but wrong password
        alert('Access Denied 😄');
    }
    // If password is null, user cancelled - do nothing
}

// ============================================
// GAME NAVIGATION
// ============================================
function openGame(gameName) {
    window.location.href = `games/${gameName}.html`;
}

// ============================================
// CONSOLE MESSAGE (Easter Egg)
// ============================================
console.log('%c⚖️ Future Advocate 2025 ⚖️', 'color: #4f46e5; font-size: 20px; font-weight: bold;');
console.log('%cMade with friendship, madness & belief ❤️', 'color: #fbbf24; font-size: 14px;');
console.log('%cBuilt by Piyush', 'color: #ec4899; font-size: 12px;');
