// firebase-init.js

// Function to check if Firebase is already initialized
function isFirebaseInitialized() {
    return window.firebase && window.firebase.apps && window.firebase.apps.length > 0;
}

// Function to initialize Firebase
async function initializeFirebase() {
    if (!isFirebaseInitialized()) {
        console.log("[LOG] Firebase is not initialized. Initializing now.");

        // Import Firebase App module and Firebase services
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
        console.log("[LOG] Firebase App module loaded.");

        // Firebase configuration
        const firebaseConfig = {
            apiKey: "your-api-key", // Replace with your Firebase API Key
            authDomain: "your-auth-domain", // Replace with your Firebase Auth Domain
            databaseURL: "your-database-url", // Replace with your Firebase Database URL
            projectId: "your-project-id", // Replace with your Firebase Project ID
            storageBucket: "your-storage-bucket", // Replace with your Firebase Storage Bucket
            messagingSenderId: "your-sender-id", // Replace with your Firebase Messaging Sender ID
            appId: "your-app-id", // Replace with your Firebase App ID
            measurementId: "your-measurement-id" // Replace with your Firebase Measurement ID
        };

        // Initialize Firebase App
        const app = initializeApp(firebaseConfig);
        console.log("[LOG] Firebase App initialized.");

        // Import Firebase Auth and Firestore modules
        const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
        console.log("[LOG] Firebase Auth module loaded.");

        const { getFirestore } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
        console.log("[LOG] Firebase Firestore module loaded.");

        // Initialize Firebase Auth and Firestore services
        const auth = getAuth(app);
        getFirestore(app);

        // Authentication state observer
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log("[LOG] User authenticated:", user.email || "No Email");
                // Handle authenticated user state here
            } else {
                console.log("[LOG] User not authenticated, redirecting to login page.");
                window.location.href = "/login"; // Redirect to login page if not authenticated
            }
        });

    } else {
        console.log("[LOG] Firebase is already initialized.");
    }
}

// Run Firebase initialization
initializeFirebase();
