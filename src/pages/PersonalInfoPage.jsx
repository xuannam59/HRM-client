import { useEffect, useState } from "react";
import handelAPI from "../api/handleAPI";
import { Avatar, Descriptions, notification, Table, Tag, Typography } from "antd";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import moment from "moment";

const { Title } = Typography;

const PersonalInfoPage = () => {
    const user = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(false);
    const [dataEmployee, setDataEmployee] = useState({});

    useEffect(() => {
        getEmployee();
    }, []);

    const getEmployee = async () => {
        setIsLoading(true);
        const api = `/employees/detail/${user.employeeId}`;
        try {
            const res = await handelAPI(api);
            if (res.data) {
                setDataEmployee(res.data);
            } else {
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

    const items = [
        {
            label: 'Họ tên',
            children: dataEmployee.fullName,
        },
        {
            label: 'Số điện thoại ',
            children: dataEmployee.phoneNumber,
        },
        {
            label: 'Ngày sinh',
            children: moment(dataEmployee.birthday).format("DD/MM/YYYY"),
        },
        {
            label: 'Vai trò',
            children: dataEmployee.role,
        },
        {
            label: 'Địa chỉ',
            children: dataEmployee.address,
        },
        {
            label: "Lịch dạy",
            children: dataEmployee.schedule
        }
    ];

    const columns = [
        {
            title: 'STT',
            dataIndex: "index",
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: 'Họ tên',
            dataIndex: "fullName",
        },
        {
            title: "Chức vụ",
            dataIndex: "position",
        },
        {
            title: "Lương theo tháng",
            dataIndex: "wage",
            render: (text, record) => {
                return (
                    <Tag color="green">
                        {record.wage.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </Tag>
                )
            }
        },
        {
            title: 'Ngày công',
            dataIndex: "workDay",
            align: "center"
        },
        {
            title: 'Phụ cấp',
            dataIndex: "allowance",
            render: (text, record) => {
                return (
                    <Tag color={record.allowance > 0 ? "lime" : ""}>
                        {record.allowance.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </Tag>
                )
            }
        },
        {
            title: 'Tạm ứng',
            dataIndex: "advance",
            render: (text, record) => {
                return (
                    <Tag color={record.advance > 0 ? "volcano" : ""}>
                        {record.advance.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </Tag>
                )
            }
        },
        {
            title: 'Lương lĩnh',
            render: (text, record) => {
                const salary = (record.wage * record.workDay) + record.allowance - record.advance;
                return (
                    <Tag color="cyan">
                        {salary.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </Tag>
                )
            }
        },
        {
            title: 'trạng thái',
            dataIndex: "status",
            render: (text, record) => {
                return (
                    <Tag color={record.status === "paid" ? "#87d068" : "#f50"}>
                        {record.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                    </Tag>
                )
            }
        },
        {
            title: 'Ngày lập',
            dataIndex: "date",
            render: (text, record) => {
                return moment(record.date).format("DD/MM/YYYY")
            }
        },
    ];

    const dataSalary = [{
        _id: "nSMưGdssdeobUMm6671v1Zjv",
        fullName: "Lê Văn A",
        position: "Nhân viên",
        wage: 300000, // lương theo ngày
        workDay: 23,
        allowance: 500000, // phụ cấp
        advance: 0, // tạm ứng,
        status: "paid",
        date: "10/1/2024"
    }]

    console.log(items);

    return (<>
        <div className="row m-3">
            <Title level={4}>Thông tin nhân viên: {user.fullName}</Title>
        </div>
        <div className="container row justify-content-center m-3">
            <Avatar src={dataEmployee.avatar} size={100} />
        </div>
        <div className="container text-center mt-5">
            <Descriptions title="Thông tin nhân viên" bordered items={items} />
        </div>
        <div className="container text-center mt-5">
            <div className="row m-3">
                <Title level={5}>Bảng lương</Title>
            </div>
            <Table
                loading={isLoading}
                columns={columns}
                dataSource={dataSalary}
                pagination={{
                    position: ["bottomCenter"],
                    showSizeChanger: true,
                }}
                scroll={{
                    x: 'max-content'
                }}
                rowKey="_id"
                align="center"
            />
        </div>
    </>);
}

export default PersonalInfoPage;