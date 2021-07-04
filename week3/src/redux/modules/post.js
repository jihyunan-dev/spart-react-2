import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";

import { firestore } from "../../shared/firebase";
import { storage } from "../../shared/firebase";
import { actionCreators as imageActions } from "./image";

const postDB = firestore.collection("post");

// action type
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
// const EDIT_POST = "EDIT_POST";
// const DELETE_POST = "DELETE_POST";

// action creators
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

// initialPost
const initialPost = {
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

// FB
const getPostFB =
  () =>
  (dispatch, getState, { history }) => {
    postDB.get().then((docs) => {
      let post_list = [];
      docs.forEach((doc) => {
        if (doc.exists) {
          const {
            user_id,
            user_name,
            user_profile,
            image_url,
            contents,
            insert_dt,
          } = doc.data();

          let post = {
            user_info: {
              user_id,
              user_name,
              user_profile,
            },
            image_url,
            contents,
            insert_dt,
            id: doc.id,
          };
          post_list.push(post);
        }
      });
      dispatch(setPost(post_list));
    });
  };

const addPostFB =
  (contents = "") =>
  (dispatch, getState, { history }) => {
    const _user = getState().user.user;
    let userInfo = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost, // 가짜 데이터
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    const _image = getState().image.preview;

    console.log(_image);

    const _upload = storage // 스토리지에 업로드하는 Promise 생성
      .ref(`images/${userInfo.user_id}_${new Date().getTime()}`) // 혹시 이미지 이름이 겹치면 안되니까 이렇게 설정
      .putString(_image, "data_url"); // 문자열로 넣을 때는 putString()을 사용한다.

    _upload
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL() // storage에 업로드한 url 받아오기
          .then((url) => {
            dispatch(imageActions.uploadImage(url)); // redux에 업로드 해주기
            return url; // url 다시 return 해야 다음 체인에서 쓸 수 있음
          })
          .then((url) => {
            postDB
              .add({ ..._post, ...userInfo, image_url: url }) // post에 image_url 같이 저장해줘야 함(firestore)
              .then((doc) => {
                let post = {
                  // firestore에 저장한 값 + post의 id + image_url = redux에 저장할 post 객체
                  ..._post,
                  user_info: userInfo,
                  id: doc.id,
                  image_url: url,
                };
                dispatch(addPost(post)); // redux에 저장하는 액션 발생
                history.replace("/"); // 홈으로 이동
              })
              .catch((err) => {
                window.alert("앗! 포스트 작성에 문제가 있어요!");
                console.log("post 작성 실패", err);
              });
          });
      })
      .catch((err) => {
        window.alert("앗! 이미지 업로드에 문제가 있어요!");
        console.log(err);
      });
  };

// initialSTate
const initialState = {
  list: [],
};

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
};

export { actionCreators };
