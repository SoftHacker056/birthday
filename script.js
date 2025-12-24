// ==================================================
// GLOBAL STATE
// ==================================================
let userLocation = null;
let deviceData = null;

// ==================================================
// SMOOTH SCROLL
// ==================================================
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ==================================================
// MUSIC PLAYER
// ==================================================
const backgroundMusic = document.getElementById("backgroundMusic");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
let isPlaying = false;

function toggleMusic() {
    if (!backgroundMusic) return;

    if (isPlaying) {
        backgroundMusic.pause();
        playIcon.style.display = "inline";
        pauseIcon.style.display = "none";
        isPlaying = false;
    } else {
        backgroundMusic.play().then(() => {
            playIcon.style.display = "none";
            pauseIcon.style.display = "inline";
            isPlaying = true;
        }).catch(() => {
            alert("Add music file: music/motivational.mp3");
        });
    }
}

// ==================================================
// EMOJI REACTIONS
// ==================================================
const emojiOptions = ["😂","🤣","😄","😆","🎉","🔥","💯","👏"];

function addEmojiReaction(card) {
    const box = card.querySelector(".emoji-reactions");
    if (!box) return;

    const span = document.createElement("span");
    span.className = "emoji-reaction";
    span.textContent = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
    box.appendChild(span);
}

// ==================================================
// MEMORY MODAL
// ==================================================
const memoryModal = document.getElementById("memoryModal");

function openMemoryModal() {
    memoryModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeMemoryModal() {
    memoryModal.classList.remove("show");
    document.body.style.overflow = "auto";
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && memoryModal.classList.contains("show")) {
        closeMemoryModal();
    }
});

// ==================================================
// MOTIVATION TYPING EFFECT
// ==================================================
const typingText = document.getElementById("typingText");
const quotes = [
    "Black coat loading…",
    "Future Advocate in progress ⏳",
    "Justice is coming ⚖️",
    "Courtroom mode ON 🎯"
];

let qi = 0, ci = 0, deleting = false;

function typeEffect() {
    if (!typingText) return;
    const text = quotes[qi];

    typingText.textContent = deleting
        ? text.substring(0, --ci)
        : text.substring(0, ++ci);

    if (!deleting && ci === text.length) {
        deleting = true;
        setTimeout(typeEffect, 1500);
        return;
    }

    if (deleting && ci === 0) {
        deleting = false;
        qi = (qi + 1) % quotes.length;
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

setTimeout(typeEffect, 1000);

// ==================================================
// DEVICE + LOCATION
// ==================================================
function detectDevice() {
    const ua = navigator.userAgent;
    return {
        device: /android/i.test(ua) ? "Android" :
                /iphone|ipad/i.test(ua) ? "iPhone" : "Desktop",
        browser: /chrome/i.test(ua) ? "Chrome" :
                 /firefox/i.test(ua) ? "Firefox" : "Other",
        userAgent: ua
    };
}

function getLocation() {
    return new Promise(resolve => {
        if (!navigator.geolocation) return resolve(null);
        navigator.geolocation.getCurrentPosition(
            pos => resolve({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            }),
            () => resolve(null),
            { timeout: 5000 }
        );
    });
}

// ==================================================
// ENTRY ACCESS LOGIC (WELCOME HIDE FIXED)
// ==================================================
async function checkUserAccess() {
    const input = document.getElementById("userNameInput");
    const name = input.value.trim();

    if (!name) {
        input.style.borderColor = "red";
        return;
    }

    deviceData = detectDevice();
    userLocation = await getLocation();

    const normalized = name.toLowerCase();

    // CLEAR OLD STATE
    localStorage.removeItem("accessType");

    if (normalized === "anshu") {
        // HIDE WELCOME CARD
        document.getElementById("entryModal").classList.add("hidden");

        // SHOW MAIN WEBSITE
        document.getElementById("mainWebsite").style.display = "block";
        document.body.style.overflow = "auto";

        localStorage.setItem("accessType", "main");
        localStorage.setItem("userName", name);
    } else {
        localStorage.setItem("accessType", "birthday");
        localStorage.setItem("userName", name);
        window.location.href = "birthday.html";
    }
}

// ==================================================
// PAGE LOAD (NO AUTO REDIRECT)
// ==================================================
window.addEventListener("load", () => {
    localStorage.removeItem("accessType");
    document.getElementById("entryModal").style.display = "flex";
    document.getElementById("mainWebsite").style.display = "none";
});

// ==================================================
// ADMIN ACCESS
// ==================================================
function checkAdminAccess() {
    const pass = prompt("Enter admin password:");
    if (pass === "kimiry@123") {
        window.location.href = "admin/admin.html";
    } else if (pass !== null) {
        alert("Access Denied 😄");
    }
}

// ==================================================
// GAME NAVIGATION
// ==================================================
function openGame(game) {
    window.location.href = `games/${game}.html`;
}

// ==================================================
// CONSOLE MESSAGE
// ==================================================
console.log("%c⚖️ Future Advocate 2025 ⚖️", "color:#4f46e5;font-size:20px;font-weight:bold");
console.log("%cWebsite made by Piyush 💙", "color:#ec4899;font-size:14px");