import { Divider, Layout, Menu, Typography } from "antd";
import { FiHome } from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";
import { PiChalkboardTeacher, PiStudent } from "react-icons/pi";
import { GiGraduateCap } from "react-icons/gi";
import { appInfo } from "../constants/appInfos"

import { Link } from "react-router-dom";
const { Sider } = Layout
const { Text } = Typography

const SiderComponent = () => {

    const items = [
        {
            key: 'dashboard',
            label: <Link to={"/"}>Dashboard</Link>,
            icon: <FiHome size={20} />
        },
        {
            key: "teacher",
            label: <Link to={"/teacher"}>Teacher</Link>,
            icon: <PiChalkboardTeacher size={20} />
        },
        {
            key: "studentClass",
            label: "Student/Class",
            icon: <img width={20} src="https://img.icons8.com/ios/50/graduation-cap.png" alt="graduation-cap" />,
            children: [
                {
                    key: 'student',
                    label: <Link to={"/student"}>Student</Link>,
                    icon: <PiStudent size={20} />,
                },
                {
                    key: 'class',
                    label: <Link to={"/class"}>Class</Link>,
                    icon: <SiGoogleclassroom size={20} />,
                },
            ]
        },
    ];
    return (
        <>
            <Sider theme="light" style={{ height: "100vh" }}>
                <div className="p-2 text-center">
                    <img src={appInfo.Logo} alt={appInfo.title} width={64} />
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: " 1.1rem"
                        }}
                    >Nhóm 8</Text>
                </div>
                <Divider style={{
                    marginTop: 0
                }} />
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"
                    items={items}
                />
            </Sider>
        </>
    );
}

export default SiderComponent;