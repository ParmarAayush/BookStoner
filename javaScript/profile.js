import * as firebase from "./firebase.js"; // configure using import to utilize code 

// firebase import

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// creat variable to use services 

const auth = getAuth();
const db = getFirestore();
const user = auth.currentUser;

// profile.js code start from here 
let logedIn;

function regSignin() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            logedIn = true;
            hidden();
            console.log("User Find UID" + user.uid);
        } else {
            logedIn = false;
            hidden();
            console.log("User Not Found");
        }
    });
}

function hidden() {
    console.log("hide functionality work");
    if (logedIn == true) {
        console.log("Execute True")
        document.getElementsByClassName("register")[0].classList.add("displaynone");
        document.getElementsByClassName("signIn")[0].classList.add("displaynone");
        document.getElementsByClassName("tempOne")[0].classList.remove("displaynone")
    } else {
        console.log("Execute False")
        document.getElementsByClassName("tempOne")[0].classList.add("displaynone");
        document.getElementsByClassName("register")[0].classList.add("displaynone");
        document.getElementsByClassName("signIn")[0].classList.remove("displaynone");
    }
}




document.addEventListener("DOMContentLoaded", regSignin);

document.getElementById("signinLink").addEventListener("click", function () {
    document.getElementsByClassName("register")[0].classList.add("displaynone");
    document.getElementsByClassName("signIn")[0].classList.remove("displaynone");
})

document.getElementById("regLink").addEventListener("click", function () {
    document.getElementsByClassName("signIn")[0].classList.add("displaynone");
    document.getElementsByClassName("register")[0].classList.remove("displaynone");
})

document.getElementById("registerBtn").addEventListener("click", function () {

    //get from data
    let name = document.getElementById("name").value;
    let telNumber = document.getElementById("telNumber").value;

    let gender;
    let radioBtn = document.querySelectorAll("input[name='radio']");
    let findSelected = () => {
        let selected = document.querySelector("input[name='radio']:checked").value;
        gender = selected;
    }
    radioBtn.forEach(radioBtn => {
        radioBtn.addEventListener("change", findSelected);
    });
    findSelected();
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    console.log(gender);
    //data geted now use it 

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user.uid);
            alert("Registration Successfully");

            setDoc(doc(db, "User", email), {
                Name: name,
                Mobile_No: telNumber,
                Gender: gender,
                Email: email,
                Password: password
            });
            console.log("Data Add at FireStore dataBase");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
})

document.getElementById("signinBtn").addEventListener("click", function () {

    let email = document.getElementById("signInemail").value;
    let password = document.getElementById("signInPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Log In SuccessFully");
            console.log(userCredential.user.uid);
            logedIn = userCredential.user.uid != null ? true : false;
            hidden();
            console.log(logedIn);
            // location.replace("/BookStoner/index.html");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    // [error] regSignin(e); its give error resolve it 
})

document.getElementById("logOuta").addEventListener("click", function () {
    console.log("Log Out Function Is Work");
    signOut(auth).then(() => {
        alert("Sign-out successful.");
        regSignin();
        hidden();
    }).catch((error) => {
        console.log(error.message);
        // An error happened.
    });
})
