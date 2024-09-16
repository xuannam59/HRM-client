import { useDispatch, useSelector } from "react-redux"
import { addAuth, authSelector } from "../redux/reducers/authReducer"
import AuthRouter from "./AuthRouter"
import MainRouter from "./MainRouter"
import { useEffect, useState } from "react"
import { Spin } from "antd"

const Router = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = localStorage.getItem("authData");
    res && dispatch(addAuth(JSON.parse(res)));
  }


  return isLoading ? <Spin /> : !auth.token ? <AuthRouter /> : <MainRouter />
}

export default Router; 