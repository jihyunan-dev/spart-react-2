import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

const usePermit = () => {
  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  return is_login && is_session;
};

export default usePermit;
