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

// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Loading screen HTML
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
    /* Style for the loading screen */
    @keyframes blink {
      0% { opacity: 0.3; transform: scale(1) rotate(90deg); }
      50% { opacity: 1; transform: scale(1.1) rotate(90deg); }
      100% { opacity: 0.3; transform: scale(1) rotate(90deg); }
    }
    #loadingScreen {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: hsl(217, 37%, 10%);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      padding: 24px;
      text-align: center;
    }
    .content-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 90%;
    }
    .info-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .paw-container {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }
    .paw-inner {
      position: relative;
      width: 144px;
      height: 48px;
    }
    .paw {
      width: 40px;
      height: 40px;
      animation: blink 1.5s infinite;
      transform: rotate(90deg);
      position: absolute;
    }
    .paw-1 { animation-delay: 0s; top: -8px; left: 0; }
    .paw-2 { animation-delay: 0.2s; top: 8px; left: 56px; }
    .paw-3 { animation-delay: 0.4s; top: -8px; left: 112px; }
    .text-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .loading-heading {
      font-family: 'Work Sans', sans-serif;
      font-size: 19px;
      font-weight: 600;
      margin: 0;
      text-align: center;
      letter-spacing: -0.64px;
    }
    .loading-body {
      font-family: 'Work Sans', sans-serif;
      font-size: 17px;
      font-weight: 400;
      margin: 16px 0 0 0;
      color: rgba(255, 255, 255, 0.9);
      text-align: center;
      letter-spacing: -0.64px;
    }
  </style>
`;

// Add the loading screen to the body
const loadingContainer = document.createElement('div');
loadingContainer.innerHTML = loadingScreenHTML;
document.body.appendChild(loadingContainer);

// Firebase auth state change listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If the user is authenticated, redirect to /campus/campuswelcome
    window.location.replace('/campus/campuswelcome');
  } else {
    // If not authenticated, remove the loading screen immediately
    removeLoadingScreen();
  }
});

// Function to remove the loading screen
function removeLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.remove();
    console.log('Loading screen removed.');
  }
}
