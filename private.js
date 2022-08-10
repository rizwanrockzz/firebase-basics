import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAbfpkxE5S2Wg8LJX2fezpdkMDaAlAD5g8",
    authDomain: "rizwanfirebaseproject.firebaseapp.com",
    projectId: "rizwanfirebaseproject",
    storageBucket: "rizwanfirebaseproject.appspot.com",
    messagingSenderId: "203270058411",
    appId: "1:203270058411:web:75b170cd24506a45e962ee"
};

const app = initializeApp(firebaseConfig);

function userSignOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location = "login.html";
        alert("Signout succesful");
    }).catch((error) => {
        // An error happened.
        alert("An error occured please try again. After sometime");
    });
}


function UserInfo() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
        user.providerData.forEach((profile) => {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("Username: " + profile.username);
            console.log("Email: " + profile.email);
            document.getElementById("usermail").innerHTML = profile.email;
            console.log("Password: " + profile.password);
            console.log("Pan number : " + profile.pannumber);
            console.log("Phone number : " + profile.phonenumber);
        });
    }
}

var getinfo = document.getElementById("getinfo");
var signout = document.getElementById("signout");

getinfo.addEventListener('click', UserInfo);
signout.addEventListener('click', userSignOut);