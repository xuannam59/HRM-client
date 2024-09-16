import { useSelector } from "react-redux";
import HomePage from "../pages/HomePage";
import { authSelector } from "../redux/reducers/authReducer";

const MainRouter = () => {
  return (
    <>
      <HomePage />
    </>
  );
}

export default MainRouter;