import Switch from "@mui/material/Switch";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { MdError, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import { useAppContext } from "../../../context";
import { CloseWarningBtn, ConnectWarning, IconHolder, LoginBtn, LoginContent, LoginDiv, LoginWarning, LoginWarningText, RegisterBtn, ThemeSwitchHolder, UserImg, WarningContent, WarningText } from "./styled-components";

async function sendLoginInfo(data, logger, setConnect, setLoginError) {
  if (data.username === "" || data.password === "") {
    console.log("Data is empty");
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  await fetch("http://localhost:8086/todo/users/login", {
    method: "POST",
    headers: headers,
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((r) => {
      if (typeof r.userId === "number") {
        logger(r);
      }
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    })
    .catch((r) => setConnect(true));
}

function createSendObj(username, password) {
  return { username, password };
}

const getCurrentMode = (theme) => {
  return theme.primaryColor === "white" ? false : true;
};

export const LoginMenu = () => {
  const [userContent, setUserContent] = useState("");
  const [passwordContent, setPasswordContent] = useState("");
  const setUser = useAppContext().setCurrentUser;
  const setMenuType = useAppContext().setMenuType;
  const [connectWarning, setConnect] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const theme = useAppContext().themeMode;
  const setTheme = useAppContext().setTheme;
  const [darkMode, setDarkMode] = useState(getCurrentMode(theme));


  useEffect(() => {
    darkMode ? setTheme("darkMode") : setTheme("lightMode");
  }, [darkMode]);
  return (
    <LoginDiv theme={theme}>
      <RegisterBtn theme={theme} onClick={() => setMenuType("register")}>
        Sign Up
        <FiUserPlus size={25} />
      </RegisterBtn>
      <UserImg theme={theme}>
        <FaRegUser size={80} />
      </UserImg>
      <LoginWarning open={loginError}>
        <MdError size={50} color={"red"}></MdError>
        <LoginWarningText>We could not sign you in. Please check your credentials and try again!</LoginWarningText>
      </LoginWarning>
      <LoginContent theme={theme}>
        <label>
          <span>Username:</span>
          <input
            type="text"
            value={userContent}
            onChange={(e) => setUserContent(e.target.value)}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            value={passwordContent}
            onChange={(e) => {
              setPasswordContent(e.target.value);
            }}
          />
        </label>
      </LoginContent>
      <LoginBtn
        theme={theme}
        onClick={() =>
          sendLoginInfo(createSendObj(userContent, passwordContent), setUser, setConnect, setLoginError)
        }
      >
        Login
      </LoginBtn>
      <ConnectWarning show={connectWarning}>
        <CloseWarningBtn onClick={() => setConnect(false)}>
          <GrFormClose size={35} />
        </CloseWarningBtn>
        <WarningContent>
          <IconHolder>
            <MdSignalWifiStatusbarNotConnected size={50} color="red" />
          </IconHolder>
          <WarningText>
            Network connection seems to be offline.
            Please check your connectivity.
          </WarningText>
        </WarningContent>
      </ConnectWarning>
      <ThemeSwitchHolder theme={theme}>
        <label>Dark Mode</label>
        <Switch value={darkMode} onChange={() => setDarkMode(darkMode ? false : true)}></Switch>
      </ThemeSwitchHolder>
    </LoginDiv>
  );
};
