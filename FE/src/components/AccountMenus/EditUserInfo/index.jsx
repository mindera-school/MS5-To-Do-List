import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../context.js";
import {
  EditForm,
  EditLabel,
  CancelBtn,
  FormContainer,
  EditInput,
  SaveBtn,
  Title,
  LabelName,
} from "./style";
import { ImCancelCircle } from "react-icons/im";
import { BiSave } from "react-icons/bi";
import { ErrorDisplay } from "../../ErrorDisplay";

export const EditUserInfo = () => {
  const setMenuType = useAppContext().setMenuType;
  const theme = useAppContext().themeMode;
  const setUser = useAppContext().setCurrentUser;
  const currentUser = useAppContext().currentUser;
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let userInfo = {
    userName,
    firstName,
    lastName,
    newPassword,
    confirmPassword,
    currentPassword,  
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  });

  const checkObj = () => {
    let updatedInfo = {};
    if (userName === "") {
      updatedInfo.userName = null;
    }
    if (firstName === "") {
      updatedInfo.firstName = null;
    }
    if (lastName === "") {
      updatedInfo.lastName = null;
    }
    if (newPassword === "") {
      updatedInfo.newPassword = null;
    }
    if (confirmPassword === "") {
      updatedInfo.confirmPassword = null;
    }
    if (currentPassword === "") {
      return false;
    }
    return { ...userInfo, ...updatedInfo };
  };

  const handleSave = (e, data) => {
    e.preventDefault();
    if (!checkPassword(data.newPassword)) {
      setErrorMessage("Password does not match the requirements!	");
      return;
    }
    const updatedUserInfo = checkObj();
    if (updatedUserInfo === false) {
      setErrorMessage("Password is required!	");
      return;
    }
    if (updatedUserInfo.newPassword !== updatedUserInfo.confirmPassword) {
      return;
    }
    fetch(`http://localhost:8086/todo/users/${currentUser.userId}`, {
      method: "PATCH",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: updatedUserInfo.userName,
        firstName: updatedUserInfo.firstName,
        lastName: updatedUserInfo.lastName,
        password: updatedUserInfo.newPassword,
        currentPassword: updatedUserInfo.currentPassword,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.code === 11) {
          setErrorMessage("Username is already taken!	");
          return;
        } else if (r.code === 10) {
          setErrorMessage("Wrong credentials!	");
          return;
        } else {
          setUser(r);
          setMenuType("logged");
          setUserName("");
          setFirstName("");
          setLastName("");
          setNewPassword("");
          setConfirmPassword("");
          setCurrentPassword("");
        }
      })
      .catch((r) => console.error(r));
  };

  return (
    <FormContainer>
      <CancelBtn onClick={() => setMenuType("logged")}>
        <ImCancelCircle size={30} />
      </CancelBtn>
      <ErrorDisplay theme={theme} error={errorMessage}>
        {errorMessage}
      </ErrorDisplay>
      <EditForm onSubmit={handleSave}>
        <Title theme={theme}>Edit your account information</Title>
        <EditLabel htmlFor="">
          <LabelName theme={theme}>UserName</LabelName>
          <EditInput
            type="text"
            theme={theme}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </EditLabel>
        <EditLabel htmlFor="">
          <LabelName theme={theme}>First Name</LabelName>
          <EditInput
            type="text"
            theme={theme}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </EditLabel>
        <EditLabel htmlFor="">
          <LabelName theme={theme}>Last Name</LabelName>
          <EditInput
            type="text"
            theme={theme}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </EditLabel>
        <EditLabel htmlFor="">
          <LabelName theme={theme}>New Password</LabelName>
          <EditInput
            type="password"
            theme={theme}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </EditLabel>
        <EditLabel htmlFor="">
          <LabelName theme={theme}>Confirm Password</LabelName>
          <EditInput
            type="password"
            theme={theme}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </EditLabel>
        <EditLabel htmlFor="">
          <LabelName theme={theme}>Current Password</LabelName>
          <EditInput
            required
            type="password"
            theme={theme}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </EditLabel>
        <SaveBtn onClick={(e) => handleSave(e, userInfo)}>
          <BiSave size={30} color={theme?.fontColor} />
        </SaveBtn>
      </EditForm>
    </FormContainer>
  );
};

const checkPassword = (password) => {
  if (password === "") {
    return true;
  }
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
  return password.match(regex);
};
