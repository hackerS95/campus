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
    const { initializeApp, getApps, deleteApp } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
    await delay(150);

    const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");

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

    // Clear any existing Firebase apps
    if (getApps().length) {
      // Delete the Firebase app to ensure we are not using a cached instance
      await deleteApp(getApps()[0]);
      console.log("[Firebase] App deleted to prevent cache issues");
    }

    // Initialize Firebase app
    initializeApp(firebaseConfig);
    console.log("[Firebase] App initialized");

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
    if (error.message.includes("u[v]") || error.message.includes("is not a function")) {
      console.warn("[Auth] u[v] error, will retry");
      return "retry";
    }

    console.error("[Auth] Init failed:", error);
    return false;
  }
}

async function initAuthWithRetry(maxRetries = 3) {
  for (let i = 1; i <= maxRetries; i++) {
    const result = await loadAuthOnly();
    if (result === true) return;
    if (result === "retry") {
      console.warn(`[Auth] Retry ${i}/${maxRetries}`);
      await delay(1000);
    } else {
      removeLoadingScreen();
      return;
    }
  }
  console.error("[Auth] Max retries reached");
  removeLoadingScreen();
}

// Start full logic 500ms after script load and ensure cache is cleared
delay(500).then(() => initAuthWithRetry());
