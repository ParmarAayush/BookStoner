import * as firebase from "./firebase.js"; // configure using import to utilize code 

// firebase import

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// creat variable to use services 

const auth = getAuth();
const db = getFirestore();

// profile.js code start from here 

let logedIn = false;
let profile = document.getElementById("profileActive");

document.addEventListener("DOMContentLoaded", function regSignin(e) {
    e.preventDefault();

    if (logedIn == true) {
        document.getElementsByClassName("register")[0].classList.add("displaynone");
        document.getElementsByClassName("signIn")[0].classList.add("displaynone");
    } else {
        document.getElementsByClassName("tempOne")[0].classList.add("displaynone");
        document.getElementsByClassName("register")[0].classList.add("displaynone");
        document.getElementsByClassName("signIn")[0].classList.remove("displaynone");
    }
})

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
            alert("Registration Successfull");

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