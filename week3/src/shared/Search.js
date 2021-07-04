import React, { useCallback, useState } from "react";
import _ from "lodash";
import { Input } from "../elements";

const Search = () => {
  const [text, setText] = useState("");

  const debounce = _.debounce((e) => {
    console.log("debouce:::", e.target.value);
  }, 1000);

  const throttle = _.throttle((e) => {
    console.log("throttle:::", e.target.value);
  }, 5000);

  const keyPress = useCallback(debounce, []);

  const onChange = (e) => {
    setText(e.target.value);
    keyPress(e);
  };
  return (
    <div>
      <Input type="text" _onChange={onChange} value={text} />
    </div>
  );
};

export default Search;
