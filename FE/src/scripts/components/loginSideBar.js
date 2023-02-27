const bodyElement = document.body;
const loginSideBarOpenBtn = document.getElementById("loginSideMenuBtn");
const loginSideBarCloseBtn = document.getElementById("loginSideMenuCloseBtn");
const loginSideBar = document.getElementById("loginSideBar");
const colorThemeSwitch = document.getElementsByClassName("switch")[0];
const deleteBtnIcon = document.getElementById("deleteBtnIcon");
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

colorThemeSwitch.addEventListener("change", ()=>{
    if(lightMode === true){
        bodyElement.setAttribute("class","navy-theme");
        deleteBtnIcon.src = "./src/assets/icons/delete-navy-theme.svg";
        lightMode = false;
    } else {
        bodyElement.setAttribute("class","light-theme");
        deleteBtnIcon.src = "./src/assets/icons/delete-light-theme.svg";
        lightMode = true;
    }
});