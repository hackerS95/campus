// Remove the loading screen after 1.5 seconds and log it
setTimeout(() => {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.remove(); // Directly remove the loading screen
    console.log('Loading screen removed');
  }
}, 1500); // 1.5s delay before removing the loading screen
