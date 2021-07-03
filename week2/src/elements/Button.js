import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, is_float } = props;

  if (is_float) {
    return (
      <>
        <FloatButton onClick={_onClick}>{text}</FloatButton>
      </>
    );
  }

  return (
    <React.Fragment>
      <ElButton onClick={_onClick}>{text}</ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: "텍스트",
  is_float: false,
  _onClick: () => {},
};

const ElButton = styled.button`
  width: 100%;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
  color: #ffffff;
  background-color: #212121;
`;

const FloatButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  padding: 16px;
  color: black;
  border: none;
  border-radius: 50%;
  background-color: #ffd600;
  font-size: 36px;
  font-weight: 800;
`;

export default Button;
