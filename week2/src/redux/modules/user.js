import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { removeCookie, saveCookie } from "../../shared/Cookie";
import firebase from "firebase/app";
import { auth } from "../../shared/firebase";

// action type
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initial state
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
export const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        // Signed in
        console.log(user);
        auth.currentUser.updateProfile({ displayName: user_name }).then(() => {
          dispatch(
            setUser({ user_name, id, user_profile: "", uid: user.user.uid })
          );
          history.push("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const loginFB = (id, pwd) => {
  return function (dispatch, setState, { history }) {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        auth
          .signInWithEmailAndPassword(id, pwd)
          .then((user) => {
            // Signed in
            console.log(user);
            dispatch(
              setUser({
                user_name: user.user.displayName,
                id,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            history.push("/");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode, errorMessage);
          });
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
            id: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/"); // replace??? ????????????
    });
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        saveCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        removeCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  getUser,
  setUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
