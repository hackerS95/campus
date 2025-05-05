// firebase-auth.js

// Function to introduce a delay (ms)
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Remove the loading screen after Firebase is initialized
function removeLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
}

// Initialize Firebase and Authentication
let auth;

async function loadAuthOnly() {
  try {
    // Add cache-busting query parameters to the Firebase script imports
    const { initializeApp, getApps, deleteApp } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js?v=" + new Date().getTime());
    await delay(150);  // Delay for 150ms before loading the next script

    const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js?v=" + new Date().getTime());

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

    // Clear any existing Firebase apps to ensure fresh initialization
    if (getApps().length) {
      await deleteApp(getApps()[0]);  // Delete the existing Firebase app instance
      console.log("[Firebase] App instance deleted to prevent cache issues");
    }

    // Initialize Firebase app with the provided config
    initializeApp(firebaseConfig);
    console.log("[Firebase] Firebase app initialized");

    auth = getAuth();

    // Listen for auth state changes
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log("[Auth] Logged in as:", user.email || "No Email");
        window.location.href = "/campus/campuswelcome";  // Redirect if user is logged in
      } else {
        console.log("[Auth] No user, removing loading screen");
        removeLoadingScreen();  // Remove loading screen if no user
      }
    });

    return true;
  } catch (error) {
    if (error.message.includes("u[v]") || error.message.includes("is not a function")) {
      console.warn("[Auth] u[v] error, will retry");
      return "retry";  // Retry on specific error
    }

    console.error("[Auth] Initialization failed:", error);
    return false;  // Handle any other errors
  }
}

// Retry logic for initializing Firebase Auth
async function initAuthWithRetry(maxRetries = 3) {
  for (let i = 1; i <= maxRetries; i++) {
    const result = await loadAuthOnly();
    if (result === true) return;
    if (result === "retry") {
      console.warn(`[Auth] Retry ${i}/${maxRetries}`);
      await delay(1000);  // Retry after 1 second if error occurs
    } else {
      removeLoadingScreen();  // Ensure loading screen is removed on failure
      return;
    }
  }
  console.error("[Auth] Max retries reached");
  removeLoadingScreen();  // Ensure loading screen is removed if retries are exhausted
}

// Initialize Firebase Auth after a 500ms delay to ensure smooth loading
delay(500).then(() => initAuthWithRetry());
