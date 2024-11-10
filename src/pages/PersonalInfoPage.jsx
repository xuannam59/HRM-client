import { useEffect, useState } from "react";
import handelAPI from "../api/handleAPI";
import { Avatar, Descriptions, notification, Space, Table, Tag, Typography } from "antd";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import moment from "moment";
import dayjs from "dayjs";

const { Title } = Typography;

const PersonalInfoPage = () => {
    const user = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(false);
    const [dataEmployee, setDataEmployee] = useState({});
    const [dataSchedule, setDataSchedule] = useState([]);
    const [dataSalaries, setDataSalaries] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setIsLoading(true);
        const apiEmployee = `/employees/detail/${user.employeeId}`;
        const apiSchedule = `/schedules/${user.employeeId}`;
        const apiSalary = `/salaries/${user.employeeId}`;
        try {
            const resEmployee = await handelAPI(apiEmployee);
            if (resEmployee.data) {
                setDataEmployee(resEmployee.data);
            } else {
                notification.error({
                    message: "Error",
                    description: resEmployee.message
                })
            }
            const resSchedule = await handelAPI(apiSchedule);
            if (resSchedule.data) {
                setDataSchedule(resSchedule.data);
            } else {
                notification.error({
                    message: "Error",
                    description: resSchedule.message
                })
            }
            const resSalaries = await handelAPI(apiSalary);
            if (resSalaries.data) {
                setDataSalaries(resSalaries.data);
            } else {
                notification.error({
                    message: "Error",
                    description: resSalaries.message
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
        }
    ];

    const columnsSalary = [
        {
            title: 'STT',
            dataIndex: "index",
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: 'Giáo viên',
            render: (record) => {
                return record.employeeId.fullName
            }
        },
        {
            title: 'Chức vụ',
            render: (record) => {
                return record.employeeId.position
            }
        },
        {
            title: "Lương sở sở",
            dataIndex: "baseSalary",
            render: (text) => {
                return (<Tag color="green">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text)}
                </Tag>
                )
            }
        },
        {
            title: 'Hệ số lương',
            dataIndex: "salaryCoefficient",
            align: "center"
        },
        {
            title: 'Phụ cấp',
            dataIndex: "allowance",
            render: (text) => {
                return (
                    <Tag color={text > 0 ? "green" : ""}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text)}
                    </Tag>
                )
            }
        },
        {
            title: 'Tổng lương',
            render: (text, record) => {
                const salary = (record.baseSalary * record.salaryCoefficient) + record.allowance;
                return (
                    <Tag color="cyan">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salary)}
                    </Tag>
                )
            }
        },
        {
            title: 'trạng thái',
            dataIndex: "status",
            render: (text, record) => {
                return (
                    <Tag color={record.status === "active" ? "#87d068" : "#f50"}>
                        {record.status === "inactive" ? "Đã thanh toán" : "Chưa thanh toán"}
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

    const columnsSchedule = [
        {
            title: 'STT',
            dataIndex: "index",
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: 'Giáo viên',
            render: (record) => {
                return record.employeeId.fullName
            }
        },
        {
            title: 'Thứ',
            dataIndex: "day",
        },
        {
            title: 'Môn học',
            dataIndex: "subject",
        },
        {
            title: 'Giờ bắt đầu',
            render: (text, record) => {
                return (<Tag color="lime">{dayjs(record.startTime).format("HH:mm:ss")}</Tag>)
            },
            align: "center"
        },
        {
            title: 'Giờ kết thúc',
            render: (text, record) => {
                return (<Tag color="volcano">{dayjs(record.endTime).format("HH:mm:ss")}</Tag>)
            },
            align: "center"
        },
        {
            title: 'Phòng học',
            dataIndex: "room"
        },
        {
            title: 'Mô tả',
            dataIndex: "descriptions"
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
                <Title level={5}>Lịch dạy</Title>
            </div>
            <Table
                loading={isLoading}
                columns={columnsSchedule}
                dataSource={dataSchedule}
                pagination={{
                    position: ["bottomCenter"],
                    pageSize: 5,
                }}
                rowKey="_id"
                align="center"
            />
        </div>

        <div className="container text-center mt-5">
            <div className="row m-3">
                <Title level={5}>Bảng lương</Title>
            </div>
            <Table
                loading={isLoading}
                columns={columnsSalary}
                dataSource={dataSalaries}
                pagination={{
                    pageSize: 5,
                    position: ["bottomCenter"],
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