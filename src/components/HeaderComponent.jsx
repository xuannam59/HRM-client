import { Avatar, Button, Dropdown, Input, Popover, Space } from "antd";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, removeAuth } from "../redux/reducers/authReducer";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
    const user = useSelector(authSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = [
        {
            key: 'logout',
            label: "Đăng xuất",
            onClick: async () => {
                signOut(auth);
                dispatch(removeAuth({}));
                navigate("/login");
            }
        }
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