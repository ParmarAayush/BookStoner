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
let storageRef;
let downloadURL;
const fileInput = document.getElementById("coverpage");
fileInput.onchange = () => {
    const fileName = fileInput.files[0];
    console.log(fileInput);
    var name = fileName.name.split('.').shift() + Math.floor(Math.random() * 10);
    var type = fileName.type.split("/")[0];
    var path = type + '/' + name;
    storageRef = ref(storage, path);

}

document.getElementById("upload").addEventListener("click", async function () {

    const uploadTask = uploadBytesResumable(storageRef, fileInput.files[0]);

    uploadTask.on('state_changed',
        (snapshot) => {
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
                console.log("Url From This Keyword " + downloadURL);
                this.downloadURL = downloadURL;
            });
        }
    );
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
        setDoc(query, {
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
