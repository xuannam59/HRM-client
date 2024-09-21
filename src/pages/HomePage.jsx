import { Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, refreshToken, removeAuth } from "../redux/reducers/authReducer";
import handleApi from "../api/handleAPI";

const HomePage = () => {
    // lấy dữ liệu nếu mà token k đúng thì k có quyền và nếu token hết hạn thì xét lại 
    // const getTeacher = async () => {
    //     const api = 'school/teachers';

    //     const res = await handleApi(api);
    //     if (res.data) {
    //         console.log(res.data);
    //     } else {
    //         // token Error
    //         console.log(res);
    //         if (res.message !== "jwt expired") {
    //             notification.error({
    //                 message: "Error data teacher",
    //                 description: "Không lấy được đữ liệu"
    //             });
    //         }
    //         handleRefreshToken()
    //     }
    // }

    // const handleRefreshToken = async () => {
    //     const api = `auth/refresh-token?id=${auth._id}`;
    //     try {
    //         const res = await handleApi(api);
    //         if (res.token) {
    //             dispatch(refreshToken(res.token));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    return (
        <>
            Home Page
        </>
    );
}

export default HomePage;