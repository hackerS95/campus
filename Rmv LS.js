// firebase-init.js

// Delay function with logging
function delay(ms) {
  console.log(`Delaying for ${ms}ms...`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to remove the loading screen with logging
function removeLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    console.log("Removing loading screen...");
    loadingScreen.style.display = 'none';
  }
}

// Function to initialize Firebase with logging
async function initializeFirebase() {
  try {
    // Wait for 1 second before starting Firebase initialization
    console.log("Waiting for 1 second before Firebase initialization...");
    await delay(1000); // 1 second delay before starting

    // Dynamically import Firebase modules with logging
    console.log("Importing Firebase modules...");
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
    await delay(150); // Wait 150ms between imports

    const { getAuth, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js');
    await delay(150); // Wait 150ms between imports

    // Firebase configuration
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

    console.log("Initializing Firebase...");
    // Initialize Firebase if not already done
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    // Wait for 1500ms before starting the authentication check with logging
    console.log("Waiting for 1500ms before checking auth state...");
    await delay(1500);

    // Check for authentication state
    console.log("Checking auth state...");
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log("Logged in as:", user.email || "No email");
        window.location.href = "/campus/campuswelcome"; // Redirect to campus
      } else {
        console.log("No user, removing loading screen.");
        removeLoadingScreen();
      }
    });
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

// Initialize Firebase after the page loads (1 second after page load)
console.log("Starting Firebase initialization process...");
delay(1000).then(() => {
  initializeFirebase();
});
