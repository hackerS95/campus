(async function () {
  // Create a loading screen div
  const loadingScreen = document.createElement('div');
  loadingScreen.style.position = 'fixed';
  loadingScreen.style.top = '0';
  loadingScreen.style.left = '0';
  loadingScreen.style.width = '100%';
  loadingScreen.style.height = '100%';
  loadingScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  loadingScreen.style.color = 'white';
  loadingScreen.style.fontSize = '24px';
  loadingScreen.style.display = 'flex';
  loadingScreen.style.alignItems = 'center';
  loadingScreen.style.justifyContent = 'center';
  loadingScreen.style.zIndex = '10000';
  loadingScreen.innerHTML = 'Loading, please wait...';
  document.body.appendChild(loadingScreen);

  console.log("Loading Firebase Modules...");

  // Load Firebase Core
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js");
  console.log("Firebase Core Loaded");

  // Wait 100ms before loading Auth
  await new Promise(resolve => setTimeout(resolve, 100));
  const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js");
  console.log("Firebase Auth Loaded");

  // Wait 100ms before loading Firestore
  await new Promise(resolve => setTimeout(resolve, 100));
  const { getFirestore } = await import("https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js");
  console.log("Firebase Firestore Loaded");

  // Firebase Config
  const firebaseConfig = {
    apiKey: "AIzaSyBCtaCFznyAuuRXa1NdYvuIJs4HZ171_6k",
    authDomain: "login-86a7d.firebaseapp.com",
    projectId: "login-86a7d",
    storageBucket: "login-86a7d.firebasestorage.app",
    messagingSenderId: "961883289480",
    appId: "1:961883289480:web:fa55d56533e171bd74ec3d",
    measurementId: "G-BK0BTJ9EHD"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  console.log("Firebase Initialized:", app);

  // Check auth
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User logged in:", user);
      // Remove loading screen and show the content
      document.body.style.visibility = "visible";
      document.body.removeChild(loadingScreen);
    } else {
      console.log("No user logged in, redirecting...");
      window.location.href = "https://sauerlandpfoten.de/login";
    }
  });
})();
