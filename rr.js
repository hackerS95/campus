// loadingScreen.js

const loadingScreenHTML = `
  <div id="loadingScreen" role="alert" aria-live="assertive">
    <div class="content-wrapper">
      <div class="info-wrapper">
        <div class="paw-container">
          <div class="paw-inner">
            <img src="https://raw.githubusercontent.com/hackerS95/material/refs/heads/main/1114.svg" class="paw paw-1" alt="Paw" />
            <img src="https://raw.githubusercontent.com/hackerS95/material/refs/heads/main/1114.svg" class="paw paw-2" alt="Paw" />
            <img src="https://raw.githubusercontent.com/hackerS95/material/refs/heads/main/1114.svg" class="paw paw-3" alt="Paw" />
          </div>
        </div>
        <div class="text-wrapper">
          <h1 class="loading-heading">Ein Therapie-Team werden</h1>
          <p class="loading-body">Die wahre Größe eines Hundes liegt in der Art, wie er unser Herz heilt.</p>
        </div>
      </div>
    </div>
  </div>

  <style>
    /* Same styles as you provided */
  </style>
`;

const loadingContainer = document.createElement('div');
loadingContainer.innerHTML = loadingScreenHTML;
document.body.appendChild(loadingContainer);

// Function to initialize Firebase
function initializeFirebase() {
  // Load Firebase App SDK
  setTimeout(() => {
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
    script.onload = () => {
      console.log('Firebase app module loaded.');
      loadAuthModule(); // Now load the auth module
    };
    document.head.appendChild(script);
  }, 200);
}

// Function to load Firebase Auth SDK
function loadAuthModule() {
  setTimeout(() => {
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
    script.onload = () => {
      console.log('Firebase auth module loaded.');
      initializeFirebaseApp(); // Now initialize Firebase
    };
    document.head.appendChild(script);
  }, 500);
}

// Function to initialize Firebase with the config
function initializeFirebaseApp() {
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

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth(app);

  // Check if the user is logged in
  auth.onAuthStateChanged(user => {
    if (user) {
      // Redirect user to /campus/campuswelcome if logged in
      window.location.href = '/campus/campuswelcome';
    } else {
      // Only remove loading screen if user is not logged in
      removeLoadingScreen();
    }
  });
}

// Function to remove the loading screen
function removeLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.remove(); // Immediately remove the loading screen
    console.log('Loading screen removed.');
  } else {
    console.log('Loading screen was not found.');
  }
}

// Call Firebase initialization
initializeFirebase();
