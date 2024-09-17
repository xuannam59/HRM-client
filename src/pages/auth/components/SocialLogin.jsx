import { Button, notification } from "antd";
import { useDispatch } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase/firebaseConfig";
import HandelAPI from "../../../api/handleAPI";
import { addAuth } from "../../../redux/reducers/authReducer";

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    'login_hint': 'leeminhnam2k2@gmail.com'
})
const SocialLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLoginWithGoogle = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            if (result) {
                const user = result.user;
                if (user) {
                    const data = {
                        fullName: user.displayName,
                        email: user.email,
                    }
                    const api = "auth/google-login";
                    try {
                        const res = await HandelAPI(api, data, "post");
                        if (res.data) {
                            dispatch(addAuth(res.data));
                        } else {
                            notification.error({
                                message: "Login Error",
                                description: JSON.stringify(res.message)
                            })
                        }
                    } catch (error) {
                        notification.error({
                            message: "Error",
                            description: error
                        })
                    } finally {
                        setIsLoading(false);
                    }
                }
            } else {
                notification.error({
                    message: "Login fail",
                    description: "Can`t not login with google"
                })
            }
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.message
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Button
                loading={isLoading}
                onClick={handleLoginWithGoogle}
                icon={
                    <img
                        width={24}
                        height={24}
                        src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo"
                    />
                }
                size="large"
                style={{ width: " 100%" }}
            >Google</Button>
        </>
    );
}

export default SocialLogin;