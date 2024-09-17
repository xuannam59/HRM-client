import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Login, SignUp } from "../pages"


const AuthRouter = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col content-center">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
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