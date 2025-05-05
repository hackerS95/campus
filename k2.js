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
    @keyframes blink {
      0%   { opacity: 0.3; transform: scale(1) rotate(90deg); }
      50%  { opacity: 1; transform: scale(1.1) rotate(90deg); }
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
      opacity: 1;
      transition: opacity 0.5s;
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

const loadingContainer = document.createElement('div');
loadingContainer.innerHTML = loadingScreenHTML;
document.body.appendChild(loadingContainer);

window.onload = function () {
  function removeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let app, auth, firestore; // store outside for reuse

  async function loadFirebaseAndInit() {
    try {
      const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
      await delay(100);

      const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
      await delay(100);

      const { getFirestore } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");

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

      // Initialize only if not already done
      if (!getApps().length) {
        app = initializeApp(firebaseConfig);
        console.log("[Firebase] App initialized");
      } else {
        console.log("[Firebase] App already initialized");
      }

      if (!auth) {
        auth = getAuth();
      }

      if (!firestore) {
        firestore = getFirestore();
      }

      let authHandled = false;

      onAuthStateChanged(auth, user => {
        authHandled = true;
        if (user) {
          console.log("[Firebase] Authenticated:", user.email || "No Email");
          window.location.href = "/campus/campuswelcome";
        } else {
          console.log("[Firebase] No user, removing loading screen.");
          removeLoadingScreen();
        }
      });

      return true;
    } catch (error) {
      if (error.message.includes("u[v]") || error.message.includes("is not a function")) {
        console.warn("[Firebase] Caught u[v] error, will retry.");
        return "retry";
      }

      console.error("[Firebase] Initialization failed:", error);
      return false;
    }
  }

  async function initWithRetry(maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const result = await loadFirebaseAndInit();

      if (result === true) {
        console.log(`[Firebase] Initialization successful on attempt ${attempt}`);
        return;
      }

      if (result === "retry") {
        console.warn(`[Firebase] Retrying due to u[v] error... (${attempt}/${maxRetries})`);
        await delay(1000);
      } else {
        console.error("[Firebase] Non-retryable error. Aborting.");
        removeLoadingScreen();
        return;
      }
    }

    console.error("[Firebase] Max retries reached. Removing loading screen.");
    removeLoadingScreen();
  }

  initWithRetry();
};
