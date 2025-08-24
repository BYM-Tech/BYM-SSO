// This function is called when the user successfully signs in
function onSignIn(googleUser) {
    // Get the Google user profile information
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;  // Get ID Token

    // Log the user data (you can send this to your backend for further processing)
    console.log("User ID: " + profile.getId());
    console.log("Full Name: " + profile.getName());
    console.log("Email: " + profile.getEmail());

    // Send the ID Token to your backend for verification
    sendTokenToBackend(idToken);
}

// Function to send the ID token to your server for validation
function sendTokenToBackend(idToken) {
    fetch('/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: idToken }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}