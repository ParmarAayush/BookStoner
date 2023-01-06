import * as firebase from "./firebase.js"; // configure using import to utilize code 

// alert("Upload javaScript Work")
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, collection, setDoc, doc, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";


const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
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
document.getElementById("coverpage").addEventListener("change", function uploadImage(e) {
    alert("Upload Function is Work");
    try {
        console.log(e.target.files[0]);
        const fileName = e.target.files[0];
        var name = fileName.name.split('.').shift() + Math.floor(Math.random() * 10);
        var type = fileName.type.split("/")[0];
        var path = type + '/' + name;
        console.log(path)
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytes(storageRef, e.target.files[0]);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
            (error) => {
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );
    } catch (error) {
        console.log(error)
        alert(error);
    }
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
