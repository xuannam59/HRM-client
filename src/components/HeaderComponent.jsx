import { Avatar, Button, Dropdown, Input, Popover, Space } from "antd";
import { CiLogout, CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { MdLockReset } from "react-icons/md";
import { authSelector, removeAuth } from "../redux/reducers/authReducer";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";

const HeaderComponent = () => {
    const user = useSelector(authSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = [
        {
            key: 'personalInfo',
            label: <Link to="/personal-info">Thông tin cá nhân</Link>,
            icon: <PiUserCircle size={20} />,
        },
        {
            key: 'resetPassword',
            label: <Link to="/reset-password">Đổi mật khẩu</Link>,
            icon: <MdLockReset size={20} />,
        },
        {
            key: 'logout',
            label: "Đăng xuất",
            icon: <CiLogout size={20} />,
            onClick: async () => {
                signOut(auth);
                dispatch(removeAuth({}));
                navigate("/login");
            }
        },
    ];
    return (<>
        <div className="row bg-white gx-0 align-items-center"
            style={{ height: "80px", width: "100%" }}>
            <div className="col text-center">
                <Input
                    style={{
                        borderRadius: "100px",
                        width: "70%"
                    }}
                    placeholder="Search..."
                    size="large"
                    prefix={<CiSearch className="text-muted" size={20} />} />
            </div>
            <div className="col text-end me-3">
                <Space>
                    <Button type="text" icon={<IoMdNotificationsOutline size={24} color="#5d6679" />} />
                    <Dropdown menu={{ items }} trigger={"click"}>
                        <Avatar src={user.avatar} size={40} style={{ cursor: "pointer" }} />
                    </Dropdown>
                </Space>
            </div>
        </div>
    </>);
}

export default HeaderComponent