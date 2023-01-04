import * as firebase from "./firebase.js"; // configure using import to utilize code 

alert("Upload javaScript Work")
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, collection, setDoc, doc, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();
const user = auth.currentUser;
let userEmail;
let logedIn;

document.addEventListener("DOMContentLoaded", function () {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            alert("True Work")
            logedIn = true;
            userEmail = user.email;
            console.log("User Found . Email is " + user.email);
        } else {
            alert("False Work")
            logedIn = false;
            console.log("User Not Found");
        }
    });
})
document.getElementById("upload").addEventListener("click", async function () {

    
    console.log(userEmail);
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value;
    let isbn = document.getElementById("isbn").value;
    console.log(title + " " + author)
    let path = `User/${userEmail}/Upload`;
    console.log(path);
    alert("Sub Collection Work ")
    try {
        alert("Add Data in sub collection");
        let query = doc(db, path, title)
        await setDoc(query, {
            Title: title,
            Author: author,
            Price: price,
            ISBN: isbn
        });
    } catch (error) {
        alert(error.message)
        console.log(error.message);
    }
})