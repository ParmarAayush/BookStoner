let logedIn = 1;
let profile = document.getElementById("profileActive");

profile.addEventListener("click", function regSignin(e) {
    e.preventDefault();

    if (logedIn == true) {
        document.getElementsByClassName("register")[0].classList.add("displaynone");
        document.getElementsByClassName("signIn")[0].classList.add("displaynone");
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
