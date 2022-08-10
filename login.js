import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyAbfpkxE5S2Wg8LJX2fezpdkMDaAlAD5g8",
    authDomain: "rizwanfirebaseproject.firebaseapp.com",
    projectId: "rizwanfirebaseproject",
    storageBucket: "rizwanfirebaseproject.appspot.com",
    messagingSenderId: "203270058411",
    appId: "1:203270058411:web:75b170cd24506a45e962ee"
};

const app = initializeApp(firebaseConfig);


var email = document.getElementById("email");
var password = document.getElementById("password");

var signin = document.getElementById("signinbtn");
var getinfo = document.getElementById("getinfobtn");

function signInUser() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            console.log(email.value);
            console.log(password.value);
            const user = userCredential.user;
            // ...
            alert("User signed in");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        window.location = 'private.html';
    } else {
        // User is signed out
        // ...
        // alert("account doesnot exists");
        // window.location = 'login.html';
    }
});

function UserInfo() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
        user.providerData.forEach((profile) => {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("Username: " + profile.username);
            console.log("Email: " + profile.email);
            console.log("Password: " + profile.password);
            console.log("Pan number : " + profile.pannumber);
            console.log("Phone number : " + profile.phonenumber);
        });
    }
}

signin.addEventListener('click', signInUser);
getinfo.addEventListener('click', UserInfo);