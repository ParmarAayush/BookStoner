let logedIn = 0;
let profile = document.getElementById("profileActive");

profile.addEventListener("click", function regSignin(e) {
    e.preventDefault();

    if (logedIn == true) {
        document.getElementsByClassName("register")[0].classList.add("displaynone");
    } else if (logedIn == false) {
        document.getElementsByClassName("signIn")[0].classList.add("displaynone");
    }
})  