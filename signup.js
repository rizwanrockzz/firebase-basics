import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

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
const auth = getAuth();

var username = document.getElementById("username");
var email = document.getElementById("email");
var pan = document.getElementById("pan");
var phno = document.getElementById("phno");
var password = document.getElementById("password");
var conformpassword = document.getElementById("conformpassword");

var submit = document.getElementById("submitbtn");
var signin = document.getElementById("signinbtn");
var getinfo = document.getElementById("getinfobtn");


function validation() {
    let usernameregex = /^[a-zA-Z0-9]{5,}$/;
    let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let panregex = /^[a-zA-Z0-9]{10}$/;
    let phnoregex = /^[0-9]{10}$/;
    let passwordregex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/;

    if (!usernameregex.test(username.value)) {
        alert("username contains atleast 5 characters");
        return false;
    }

    if (!emailregex.test(email.value)) {
        alert("check your email");
        return false;
    }

    if (!panregex.test(pan.value)) {
        alert("re check your pan card number");
        return false;
    }

    if (!phnoregex.test(phno.value)) {
        alert("re check your phno number size");
        return false;
    }

    if (!passwordregex.test(password.value)) {
        alert("password should contain atleast one small letter,one capital letter, one number , one special character and should be atleast 6 characters long.");
        return false;
    }

    return true;
}

function signUpUser() {
    if (!validation()) {
        return;
    }

    console.log("inside function");
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const db = getDatabase();

            set(ref(db, 'rizwanusers/' + user.uid), {
                username: username.value,
                email: email.value,
                password: password.value,
                pannumber: pan.value,
                phonenumber: phno.value
            });
            console.log(username.value);
            console.log(email.value);
            console.log(password.value);
            console.log(pan.value);
            console.log(phno.value);
            console.log("succesful");
            alert("User Created Succesfullly");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode == "auth/email-already-in-use") {
                alert("The email is already used by someone please use a new email");
            }
            console.log(errorCode);
            console.log(errorMessage);
            // alert(errorCode + errorMessage);
        });
}

submit.addEventListener('click', signUpUser);




