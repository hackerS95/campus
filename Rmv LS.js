// firebase-init.js

// Delay function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to remove the loading screen
function removeLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
}

// Function to initialize Firebase
async function initializeFirebase() {
  try {
    // Wait for 500ms before importing Firebase modules
    await delay(500);

    // Dynamically import Firebase modules
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

    // Initialize Firebase if not already done
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    // Wait for 1500ms before starting the authentication check
    await delay(1500);

    // Check for authentication state
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

// Initialize Firebase after the page loads
delay(500).then(() => {
  initializeFirebase();
});
