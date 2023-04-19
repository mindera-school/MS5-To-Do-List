import React from "react";
import { useAppContext } from "../../context.js";
import { StyledPopconfirm, StyledButton, ButtonsContainer } from "./style.js";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

export default function Popconfirm({
  display,
  right,
  top,
  setVerification,
  message,
}) {
  const theme = useAppContext().themeMode;
  return (
    <StyledPopconfirm display={display} theme={theme} right={right} top={top}>
      <span>{message}</span>
      <ButtonsContainer>
        <StyledButton onClick={() => setVerification(false)}>
          <AiOutlineClose size={16} color={"red"} />
        </StyledButton>
        <StyledButton onClick={() => setVerification(true)}>
          <AiOutlineCheck size={16} color={"green"} />
        </StyledButton>
      </ButtonsContainer>
    </StyledPopconfirm>
  );
}
