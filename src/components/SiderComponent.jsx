import { Layout, Menu, Typography } from "antd";
import { FiHome } from "react-icons/fi";
import { PiUsersThree } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { LuGraduationCap, LuUserCog2 } from "react-icons/lu";
import { LiaUserTieSolid } from "react-icons/lia";
import { TbCertificate } from "react-icons/tb";
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
            const allRoute = ["dashboard", "employee", 'student', 'class', "position", "level"];
            const currentRoute = allRoute.find((item) => location.pathname.split("/")[1] === item);
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
            label: <Link to={"/dashboard"}>Tổng quan</Link>,
            icon: <FiHome size={20} />
        },
        {
            label: " Management Employee",
            icon: <PiUsersThree size={25} />,
            children: [
                {
                    key: "employee",
                    label: <Link to={"/employee"}>Nhân viên</Link>,
                    icon: <FaRegUser size={18} />,
                },
                {
                    key: "position",
                    label: <Link to={"/position"}>Chức vụ</Link>,
                    icon: <LiaUserTieSolid size={20} />,
                },
                {
                    key: "level",
                    label: <Link to={"/level"}>Trình độ</Link>,
                    icon: <LuGraduationCap size={20} />,
                },
                {
                    key: "expertise",
                    label: <Link to={"/"}>Chuyên môn</Link>,
                    icon: <LuUserCog2 size={20} />,
                },
                {
                    key: "certificate",
                    label: <Link to={"/"}>Bằng cấp</Link>,
                    icon: <TbCertificate size={20} />,
                },
            ]
        },
    ];
    return (
        <>
            <div className="" style={{ width: "200px" }}>
                <Sider theme="light" width={"100%"} style={{ height: "100vh" }}>
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
            </div>
        </>
    );
}

export default SiderComponent;