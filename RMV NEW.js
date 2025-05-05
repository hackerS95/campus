// firebase-auth.js
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function removeLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
}

// Track if loading screen has been removed
let loadingScreenRemoved = false;

let auth;

async function loadAuthOnly() {
  try {
    console.log("[Auth] Starting Firebase initialization...");

    const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
    await delay(150);  // Delay between imports

    console.log("[Auth] Firebase App module imported.");

    const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
    await delay(150);  // Delay between imports

    console.log("[Auth] Firebase Auth module imported.");

    const firebaseConfig = {
      apiKey: "AIzaSyBCtaCFznyAuuRXa1NdYvuIJs4HZ171_6k",
      authDomain: "login-86a7d.firebaseapp.com",
      databaseURL: "https://login-86a7d-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "login-86a7d",
      storageBucket: "login-86a7d.firebasestorage.app",
      messagingSenderId: "961883289480",
      appId: "1:961883289480:web:fa55d56533e171bd74ec3d",
      measurementId: "G-BK0BTJ9EHD"
    };

    if (!getApps().length) {
      initializeApp(firebaseConfig);
      console.log("[Firebase] Firebase app initialized.");
    }

    auth = getAuth();

    console.log("[Auth] Firebase auth initialized.");

    onAuthStateChanged(auth, user => {
      if (user) {
        console.log("[Auth] Logged in as:", user.email || "No Email");
        window.location.href = "/campus/campuswelcome";
      } else {
        console.log("[Auth] No user, removing loading screen...");
        if (!loadingScreenRemoved) {
          removeLoadingScreen();
          loadingScreenRemoved = true;
        }
      }
    });

    return true;
  } catch (error) {
    console.error("[Auth] Initialization failed:", error);

    // If the error is retryable (e.g., u[v] or function errors)
    if (error.message.includes("u[v]") || error.message.includes("is not a function")) {
      console.warn("[Auth] u[v] error, retrying...");
      return "retry";
    }

    // Handle any other unexpected error
    console.warn("[Auth] Unknown error, retrying...");
    await delay(1000); // Retry after 1 second
    return "retry";
  }
}

async function initAuthWithRetry(maxRetries = 3) {
  let attempts = 0;
  while (attempts < maxRetries) {
    const result = await loadAuthOnly();
    if (result === true) return;
    if (result === "retry") {
      attempts++;
      console.warn(`[Auth] Retry ${attempts}/${maxRetries}`);
      await delay(1000); // Retry after 1 second
    } else {
      if (!loadingScreenRemoved) {
        removeLoadingScreen();
        loadingScreenRemoved = true;
      }
      return;
    }
  }
  console.error("[Auth] Max retries reached");
  if (!loadingScreenRemoved) {
    removeLoadingScreen();
    loadingScreenRemoved = true;
  }
}

// Ensure cleanup when page reloads or is refreshed
window.addEventListener('beforeunload', () => {
  removeLoadingScreen();  // Ensure loading screen is removed on reload
});

// Start full logic 500ms after script load
document.addEventListener("DOMContentLoaded", () => {
  delay(500).then(() => {
    initAuthWithRetry();
  });
});

// Optionally, remove the loading screen immediately if possible (bypass delay)
if (document.readyState === "complete" && !loadingScreenRemoved) {
  removeLoadingScreen();
  loadingScreenRemoved = true;
}
