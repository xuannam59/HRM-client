import { useState } from "react";
import { Button, notification, Popconfirm, Space, Table, Tag, Tooltip, Typography } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import moment from "moment";
import Link from "antd/es/typography/Link";
import { IoIosAdd } from "react-icons/io";
import ToggleModalSalary from "../modals/ToggleModalSalary";

const { Title } = Typography;

const SalaryPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataSelected, setDataSelected] = useState(undefined);
    const [dataSource, setDataSource] = useState([
        {
            _id: "nSMưGdssdeobUMm6671v1Zjv",
            fullName: "Lê Văn A",
            position: "Nhân viên",
            wage: 300000, // lương theo ngày
            workDay: 23,
            allowance: 500000, // phụ cấp
            advance: 0, // tạm ứng,
            status: "paid",
            date: "10/1/2024"
        },
        {
            _id: "nSMưGdssdeobUMm6671v1Zjv",
            fullName: "Lê Văn A",
            position: "Trưởng khoa",
            wage: 500000, // lương theo ngày
            workDay: 23,
            allowance: 500000, // phụ cấp
            advance: 0, // tạm ứng,
            status: "paid",
            date: "9/1/2024"
        },
    ]);


    const columns = [
        {
            title: 'STT',
            dataIndex: "index",
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: 'Mã lương',
            dataIndex: "_id",
            render: (text, record) => {
                return (
                    <Link>{record._id}</Link>
                );
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
        {
            title: "Action",
            fixed: "right",
            render: (text, record) => {
                return (<>
                    <Space>
                        <Tooltip title="Edit" color="#2db7f5">
                            <Button
                                type="link"
                                icon={<MdOutlineEdit size={20} />}
                                onClick={() => {
                                    setDataSelected(record);
                                    setVisible(true);
                                }}
                            />
                        </Tooltip>
                    </Space>
                </>);
            }
        },
    ];


    return (
        <>
            <div className="row m-3">
                <div className="col text-left">
                    <Title level={4}>Lương nhân viên</Title>
                </div>
                <div className="col text-end">
                    <Button
                        type="primary"
                        onClick={() => { setVisible(true) }}
                        icon={<IoIosAdd size={20} />}
                    >
                        Thêm</Button>
                </div>
            </div >

            <Table
                loading={isLoading}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    position: ["bottomCenter"],
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 50],
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                }}
                scroll={{
                    x: 'max-content'
                }}
                rowKey="_id"
                align="center"
            />

            <ToggleModalSalary
                visible={visible}
                dataSelected={dataSelected}
                onClose={() => {
                    setVisible(false);
                    setDataSelected(undefined);
                }}
                dataSource={dataSource}
                setDataSource={setDataSource}
            />
        </>
    );
}

export default SalaryPage;