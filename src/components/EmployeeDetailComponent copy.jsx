import { Avatar, Breadcrumb, Descriptions, notification, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import handelAPI from "../api/handleAPI";

const EmployeeDetailComponent = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [dataEmployee, setDataEmployee] = useState({});
    const navigate = useNavigate();
    const id = location.pathname.split("/")[3];

    useEffect(() => {
        getEmployee();
    }, []);

    const getEmployee = async () => {
        setIsLoading(true);
        const api = `/employees/detail/${id}`;
        try {
            const res = await handelAPI(api);
            if (res.data) {
                setDataEmployee(res.data);
            } else {
                navigate("/employee");
                notification.error({
                    message: "Error",
                    description: res.message
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }
    const items = [{
        label: 'Họ tên',
        children: dataEmployee.fullName,
    },
    {
        label: 'Số điện thoại ',
        children: dataEmployee.phoneNumber,
    },
    {
        label: 'Email',
        children: dataEmployee.email,
    },
    {
        label: 'Quê quán',
        children: dataEmployee.location,
    },
    {
        label: 'Địa chỉ',
        children: dataEmployee.address,
    }
    ];

    return (isLoading ? <div className="row align-items-center" style={{ height: "100%" }}><Spin /> </div> :
        <>
            <div className="m-3">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/employee">Employee</Link>,
                        },
                        {
                            title: `${dataEmployee.fullName}`,
                        }
                    ]}
                />
            </div>
            <div className="container row justify-content-center m-3">
                <Avatar src={dataEmployee.avatar} size={200} />
            </div>
            <div className="container text-center mt-5">
                <Descriptions title="Thông tin giáo viên" bordered items={items} />
            </div>
        </>
    )
}

export default EmployeeDetailComponent;