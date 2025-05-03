// Firebase initialization logic
function initFirebase() {
  // Loading Firebase SDKs using Promises
  import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js")
    .then(({ initializeApp }) => {
      return import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js")
        .then(({ getAuth }) => {
          return import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js")
            .then(({ getFirestore }) => {
              // Firebase config
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
              const app = initializeApp(firebaseConfig);
              const auth = getAuth(app);
              getFirestore(app);

              // Check authentication status
              auth.onAuthStateChanged(user => {
                if (user) {
                  console.log("[Firebase] Authenticated:", user.email || "No Email");
                  window.location.href = "/campus/campuswelcome";
                } else {
                  const loadingScreen = document.getElementById('loadingScreen');
                  if (loadingScreen) {
                    loadingScreen.style.display = 'none'; // Remove loading screen after auth check
                  }
                }
              });
            });
        });
    });
}

// Call the Firebase initialization function
initFirebase();
