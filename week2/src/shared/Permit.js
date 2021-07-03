import React from "react";
import usePermit from "./usePermit";

const Permit = ({ children }) => {
  return usePermit ? <>{children}</> : null;
};

export default Permit;
