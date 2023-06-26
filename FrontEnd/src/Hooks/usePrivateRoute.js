import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLocalStorage } from "../Redux/Auth/AuthSlice";

const usePrivateRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //recuperar datos de sesion de navegador
  const { user } = useSelector((state) => state.auth);
 
  useEffect(() => {

    dispatch( getLocalStorage() );

    if (!user && !localStorage.getItem("user")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

};

export {
  usePrivateRoute
};