import { useEffect } from "react";
import { getLocalStorage } from "../Redux/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const useUser = () => {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch( getLocalStorage() );

    // eslint-disable-next-line
  }, []);

  /* console.log("user", user) */

  return user;
};

export {
  useUser
};