// Firebase initialization logic
function initFirebase() {
  console.log("Initializing Firebase...");

  // Loading Firebase SDKs using Promises
  import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js")
    .then(({ initializeApp }) => {
      console.log("Firebase App SDK loaded");

      return import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js")
        .then(({ getFirestore }) => {
          console.log("Firebase Firestore SDK loaded");

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

          console.log("Firebase configuration set", firebaseConfig);

          // Initialize Firebase
          const app = initializeApp(firebaseConfig);
          console.log("Firebase initialized", app);

          // Initialize Firestore (if needed)
          const firestore = getFirestore(app);
          console.log("Firestore initialized", firestore);
        })
        .catch(error => {
          console.error("Error loading Firestore SDK:", error);
        });
    })
    .catch(error => {
      console.error("Error loading Firebase App SDK:", error);
    });
}

// Call the initialization function directly, no need for DOMContentLoaded listener
initFirebase();
