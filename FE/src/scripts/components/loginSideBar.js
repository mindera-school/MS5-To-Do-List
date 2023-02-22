const loginSideBarOpenBtn = document.getElementById("loginSideMenuBtn");
const loginSideBarCloseBtn = document.getElementById("loginSideMenuCloseBtn");
const loginSideBar = document.getElementById("loginSideBar");

loginSideBarOpenBtn.addEventListener("click",() => {
    loginSideBar.setAttribute("class","loginSideMenu-show");
});

loginSideBarCloseBtn.addEventListener("click",() => {
    loginSideBar.setAttribute("class","loginSideMenu-hidden");
});