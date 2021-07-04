import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import Button from "../elements/Button";

const Upload = (props) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading);

  const fileInput = useRef(null);

  const selectFile = (e) => {
    // 미리보기를 보여주려고 함. fileReader 사용
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.readAsDataURL(file);

    // 읽기가 끝나면 발생하는 이벤트
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("파일을 선택해주세요!");
      return;
    }

    dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
  };

  return (
    <React.Fragment>
      <input
        type="file"
        ref={fileInput}
        onChange={selectFile}
        disabled={uploading} // uploading이 true이면 disabled의 값이 true가 되므로, false가 될 때까지 또 입력할 수 없다.
      />
      <Button _onClick={uploadFB}>업로드하기</Button>
    </React.Fragment>
  );
};

export default Upload;
