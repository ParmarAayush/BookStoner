let logedIn = 0;
let profile = document.getElementById("profileActive");

document.addEventListener("DOMContentLoaded", function regSignin(e) {
    e.preventDefault();

    if (logedIn == true) {
        document.getElementsByClassName("register")[0].classList.add("displaynone");
        document.getElementsByClassName("signIn")[0].classList.add("displaynone");
    }else
    {
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
