// PostList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as PostActions } from "../redux/modules/post";

import Post from "../components/Post";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);

  useEffect(() => dispatch(PostActions.getPostFB()), []);

  return (
    <React.Fragment>
      {post_list.map((post, idx) => (
        <Post key={post.id} {...post} />
      ))}
    </React.Fragment>
  );
};

export default PostList;
