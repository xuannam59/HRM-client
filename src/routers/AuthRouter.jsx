import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Login, SignUp } from "../pages"
import ErrorPage from "../pages/ErrorPage";


const AuthRouter = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col content-center">
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>

    </>
  );
}

export default AuthRouter;