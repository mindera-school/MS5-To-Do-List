const bodyElement = document.querySelector("body");
const loginSideBarOpenBtn = document.getElementById("loginSideMenuBtn");
const loginSideBarCloseBtn = document.getElementById("loginSideMenuCloseBtn");
const loginSideBar = document.getElementById("loginSideBar");
const colorThemeSwitch = document.getElementsByClassName("switch")[0];
let lightMode = false;

loginSideBarOpenBtn.addEventListener("click", () => {
    loginSideBar.setAttribute("class", "loginSideMenu-show");
});

loginSideBarCloseBtn.addEventListener("click", () => {
    loginSideBar.setAttribute("class", "loginSideMenu-hidden");
    setTimeout(() => {
        loginSideBar.setAttribute("class", "loginSideMenu-nodisplay");
    }, 400);
});

colorThemeSwitch.addEventListener("click", ()=>{
    if(lightMode){
        lightMode = false;
        bodyElement.setAttribute("class","dark-mode");
    } else {
        lightMode = true;
        bodyElement.setAttribute("class","light-mode");
    }
});