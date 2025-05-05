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

let auth;

async function loadAuthOnly() {
  try {
    const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
    await delay(150);  // Delay between imports

    const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
    await delay(150);  // Delay between imports

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

    // Initialize Firebase only if not already initialized
    if (!getApps().length) {
      initializeApp(firebaseConfig);
      console.log("[Firebase] App initialized");
    }

    auth = getAuth();

    onAuthStateChanged(auth, user => {
      if (user) {
        console.log("[Auth] Logged in as:", user.email || "No Email");
        window.location.href = "/campus/campuswelcome";
      } else {
        console.log("[Auth] No user, removing loading screen");
        removeLoadingScreen();
      }
    });

    return true;
  } catch (error) {
    console.error("[Auth] Init failed:", error);

    // If the error is a retryable error (e.g., u[v] or function errors)
    if (error.message.includes("u[v]") || error.message.includes("is not a function")) {
      console.warn("[Auth] u[v] error, will retry");
      return "retry";
    }

    // If a non-specific error occurs, retry after 1 second
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
      removeLoadingScreen();
      return;
    }
  }
  console.error("[Auth] Max retries reached");
  removeLoadingScreen();
}

// Ensure cleanup when page reloads or is refreshed
window.addEventListener('beforeunload', () => {
  removeLoadingScreen();  // Ensure loading screen is removed on reload
});

// Start full logic 1 second after script load
delay(1000).then(() => initAuthWithRetry());
