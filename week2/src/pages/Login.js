import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as UserActions } from "../redux/modules/user";
import { Text, Input, Grid, Button } from "../elements";
import { saveCookie } from "../shared/Cookie";

const Login = (props) => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const changeId = (e) => setId(e.target.value);
  const changePwd = (e) => setPwd(e.target.value);

  const dispatch = useDispatch();

  const login = (id, pwd) => {
    if (id === "" || pwd === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다. 입력해주세요.");
      return;
    }
    dispatch(UserActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={changeId}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            type="password"
            _onChange={changePwd}
          />
        </Grid>

        <Button text="로그인하기" _onClick={() => login(id, pwd)}></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
