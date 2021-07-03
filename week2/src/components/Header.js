import React from "react";
import { Grid, Text, Button } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as UserAction } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import usePermit from "../shared/usePermit";

const Header = (props) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(UserAction.logoutFB());
  };

  return usePermit() ? (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text margin="0px" size="24px" bold>
            헬로
          </Text>
        </Grid>

        <Grid is_flex>
          <Button text="내정보"></Button>
          <Button text="알림"></Button>
          <Button text="로그아웃" _onClick={logout}></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text margin="0px" size="24px" bold>
            헬로
          </Text>
        </Grid>

        <Grid is_flex>
          <Button
            text="로그인"
            _onClick={() => history.push("/login")}
          ></Button>
          <Button
            text="회원가입"
            _onClick={() => history.push("/signup")}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
