import { Avatar, Breadcrumb, Button, notification, Popconfirm, Space, Spin, Table, Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import handelAPI from "../../api/handleAPI";
import moment from "moment";
import { Link } from "react-router-dom";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import { exportExcel } from "../../utils/exportExcel.util";
import { IoIosAdd } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import AddDepartmentEmployee from "../../modals/addDepartmentEmployee";

const { Title } = Typography;

const DepartmentDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [current, setCurrent] = useState(1);
    const [departmentTitle, setDepartmentTitle] = useState("");
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const id = location.pathname.split("/")[3];

    useEffect(() => {
        loadData();
    }, [current, pageSize]);

    const loadData = async () => {
        setIsLoading(true);
        const api = `/departments/detail-employee/${id}?current=${current}&&pageSize=${pageSize}`;
        try {
            const res = await handelAPI(api);

            if (res.data) {
                res.data.forEach(item => {
                    item.createdAt = moment(item.createdAt).format("DD/MM/YYYY");
                    item.updatedAt = moment(item.updatedAt).format("DD/MM/YYYY");
                });
                setDepartmentTitle(res.departmentTitle);
                setDataSource(res.data);
                setCurrent(res.meta.current);
                setPageSize(res.meta.pageSize);
                setTotal(res.meta.total);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const onChangeTable = (pagination, filters, sorter, extra) => {
        if (pagination.current && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination.pageSize && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
        }
    }

    const handleDeleteEmployee = async (id) => {
        const api = `/departments/detail-employee/delete/${id}`;
        try {
            const res = await handelAPI(api, "", "delete");
            if (res.data) {
                loadData();
                notification.success({
                    message: res.message,
                    description: "Xoá nhân viên khỏi phòng ban thành công"
                })
            } else {
                notification.error({
                    message: "Delete Error",
                    description: res.message,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (index + 1) + (current - 1) * pageSize;
            },
            fixed: "left",
        },
        {
            title: "Avatar",
            render: (item, record) => {
                return (
                    <>
                        <Avatar src={item.avatar} size={50} />
                    </>
                )
            },
            fixed: "left",
        },
        {
            title: 'Họ tên',
            dataIndex: "fullName",
            fixed: "left",
        },
        {
            title: "Chuyên môn",
            dataIndex: "infoSpecialize"
        },
        {
            title: "Chức vụ",
            dataIndex: "infoPosition"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber"
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (_, record) => {
                let color, status;
                switch (record.status) {
                    case "active":
                        color = "green";
                        status = "Làm việc"
                        break
                    case "inactive":
                        color = "red";
                        status = "Nghỉ việc";
                        break
                    default:
                        color = "#f50";
                        status = "Updating";
                }
                return (
                    <Tag color={color}>{status}</Tag>
                )
            }
        },
        {
            title: "Action",
            fixed: "right",
            render: (item) => {
                return (<>
                    <Space>
                        <Popconfirm
                            placement="right"
                            title="Xoá nhân viên khỏi phòng ban"
                            description="Bạn chắc chắn xoá nhân viên này"
                            onConfirm={() => handleDeleteEmployee(item._id)}
                            onCancel={""}
                            okText="Yes"
                            cancelText="No"
                        >

                            <Button
                                type="text"
                                icon={<MdOutlineDeleteForever size={20} />}
                                danger
                            />
                        </Popconfirm>
                    </Space>
                </>);
            }
        }
    ];

    const handleExportExcel = async () => {
        const api = `/departments/all`;
        try {
            const res = await handelAPI(api);
            if (res.data) {
                const data = res.data;
                delete data.passport;
                exportExcel(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (isLoading ? <div className="row align-items-center" style={{ height: "100%" }}><Spin /> </div> :
        <>
            <div className="m-3">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/department">Department</Link>,
                        },
                        {
                            title: `${departmentTitle}`,
                        }
                    ]}
                />
            </div>
            <div className="row m-3">
                <div className="col text-left">
                    <Title level={5}>{departmentTitle}</Title>
                </div>

                <div className="col text-end">
                    <Button
                        type="primary"
                        onClick={() => { setVisible(true) }}
                        icon={<IoIosAdd size={20} />}
                    >
                        Thêm Nhân viên</Button>
                    <Button className="ms-2" icon={<FiDownload />} onClick={handleExportExcel}>Xuất excel</Button>
                </div>
            </div >
            <Table
                loading={isLoading}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    total: total,
                    position: ["bottomCenter"],
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 50],
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                }}
                scroll={{
                    x: 'max-content'
                }}
                onChange={onChangeTable}
                rowKey="_id"
            />

            <AddDepartmentEmployee
                visible={visible}
                loadData={loadData}
                onClose={() => {
                    setVisible(false);
                }}
                departmentId={id}
            />
        </>
    );
}

export default DepartmentDetail;