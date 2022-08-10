

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
// import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
// import {getAuth} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMjlrnV5UVsmgWhA3jJ1vwEZ4pBCxlEYE",
    authDomain: "ca-backend.firebaseapp.com",
    databaseURL: "https://ca-backend-default-rtdb.firebaseio.com",
    projectId: "ca-backend",
    storageBucket: "ca-backend.appspot.com",
    messagingSenderId: "672304993681",
    appId: "1:672304993681:web:0cd54a3b0475e8e5d33630",
    measurementId: "G-KWDYDH3B8D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);

// database reference

const db = getDatabase();
// console.log(db);

// The references

var username = document.getElementById("username");
var email = document.getElementById("email");
var pan = document.getElementById("pan");
var phno = document.getElementById("phno");
var password = document.getElementById("password");
var conformpassword = document.getElementById("conformpassword");

var submitbtn = document.getElementById("submitbtn");

// validating the values

function validation() {
    let usernameregex = /^[a-zA-Z0-9]{5,}$/;
    let emailregex = /^[a-zA-Z0-9]+@(gmail|outlook|yahoo)\.com$/;
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

// registering user to firebase

function registerUser() {
    if (!validation()) {
        return;
    }

    const dbRef = ref(db);
    // console.log(dbRef);

    get(child(dbRef, "usersList/" + pan.value)).then((snapshot) => {
        if (snapshot.exists()) {
            alert("user already exists");
        }
        else {
            set(ref(db, "usesList/" + pan.value),
                {
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    pancard: pan.value,
                    phonenumber: phno.value
                }).then(() => {
                    alert("useradded succesfully");
                }).catch((error) => {
                    alert("error : " + error);
                })
        }
    });
}

// assigning the event

submitbtn.addEventListener('click', registerUser);


        // submit.addEventListeners('click', (e) => {
        //     console.log("submit");
        // });

