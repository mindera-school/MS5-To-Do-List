import React from "react";
import {
  EditUserInfo, LoginMenu,
  RegisterMenu,
  UserProfile
} from "../components";
import ResetPassword from "../components/AccountMenus/ResetPassword";

export const accountMenuMap = {
  login: {
    el: <LoginMenu />,
    key: "login",
  },
  register: {
    el: <RegisterMenu />,
    key: "register",
  },
  logged: {
    el: <UserProfile />,
    key: "logged",
  },
  editInfoUser: {
    el: <EditUserInfo />,
    key: "editInfo",
  },
  forgotPassword: {
    el: <ResetPassword />,
    key: "forgotPassword",
  }
};
