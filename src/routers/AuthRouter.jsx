import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, SignUp } from "../pages"


const AuthRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AuthRouter;