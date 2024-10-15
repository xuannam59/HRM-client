import { Layout, Menu, Typography } from "antd";
import { FiPieChart } from "react-icons/fi";
import { PiUsersThree } from "react-icons/pi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { FaRegUser, FaUserPlus } from "react-icons/fa";
import { LuGraduationCap, LuUserCog2 } from "react-icons/lu";
import { LiaUserTieSolid } from "react-icons/lia";
import { RiLuggageDepositFill } from "react-icons/ri";
import { GrSchedule } from "react-icons/gr";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { ImTree } from "react-icons/im";
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
            const allRoute = [
                "dashboard", "employee", 'student',
                'class', "position", "level",
                "specialize", "department", "application",
                "schedule", "collaborate", "fostering",
                "salary",];
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
            icon: <FiPieChart size={20} />
        },
        {
            label: "Quản lý nhân viên",
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
                    key: "specialize",
                    label: <Link to={"/specialize"}>Chuyên môn</Link>,
                    icon: <LuUserCog2 size={20} />,
                },
            ]
        },
        {
            key: "department",
            label: <Link to={"/department"}>Quản lý phòng ban</Link>,
            icon: <ImTree size={20} />,
        },
        {
            label: "Khen thưởng và kỷ luật",
            icon: <FaMoneyBillTransfer size={20} />,
            children: [
                {
                    key: "reward",
                    label: <Link to={"/reward"}>Khen thưởng</Link>,
                    icon: <GiReceiveMoney size={18} />,
                },
                {
                    key: "discipline",
                    label: <Link to={"/discipline"}>Kỷ luật</Link>,
                    icon: <GiPayMoney size={18} />,
                }
            ]
        },
        {
            key: "application",
            label: <Link to={"/application"}>Quản lý tuyển dụng</Link>,
            icon: <FaUserPlus size={20} />,
        },
        {
            key: "schedule",
            label: <Link to={"/schedule"}>Quản lý lịch dạy</Link>,
            icon: <GrSchedule size={20} />,
        },
        {
            key: "collaborate",
            label: <Link to={"/collaborate"}>Quản lý công tác</Link>,
            icon: <RiLuggageDepositFill size={20} />,
        },
        {
            key: "fostering",
            label: <Link to={"/fostering"}>Quản lý bồi dưỡng</Link>,
            icon: <BsClipboard2CheckFill size={20} />,
        },
        {
            key: "salary",
            label: <Link to={"/salary"}>Quản lý lương</Link>,
            icon: <GiMoneyStack size={20} />,
        },
    ];
    return (
        <>
            <div className="" style={{ width: "220px" }}>
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