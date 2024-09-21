import { Layout, Menu, Typography } from "antd";
import { FiHome } from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";
import { PiChalkboardTeacher, PiStudent } from "react-icons/pi";
import { appInfo } from "../constants/appInfos"

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const { Sider } = Layout
const { Text } = Typography

const SiderComponent = () => {
    const [current, setCurrent] = useState('');
    let location = useLocation();

    useEffect(() => {
        if (location && location.pathname) {
            const allRoute = ["dashboard", "teacher", 'student', 'class',];
            const currentRoute = allRoute.find((item) => location.pathname === `/${item}`);
            if (currentRoute) {
                setCurrent(currentRoute);
            } else {
                setCurrent("dashboard");
            }
        }

    }, [location]);
    const onClick = (e) => {
        setCurrent(e.key);
    };

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
            <Sider theme="light" width="14%" style={{ height: "100vh" }}>
                <div className="p-2 text-center">
                    <img src={appInfo.Logo} alt={appInfo.title} width={64} />
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: " 1.1rem"
                        }}
                    >Nhóm 8</Text>
                </div>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
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