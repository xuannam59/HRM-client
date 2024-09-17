import { Button } from "antd";
import { useDispatch } from "react-redux";
import { removeAuth } from "../redux/reducers/authReducer";
import { auth } from "../firebase/firebaseConfig";

const HomePage = () => {
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(removeAuth({}));
        auth.signOut();
    }
    return (
        <>
            <Button onClick={logOut}>Log out</Button>
        </>
    );
}

export default HomePage;