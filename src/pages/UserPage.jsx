import { Button, notification, Popconfirm, Radio, Space, Table, Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import ToggleModal from "../modals/ToggleModal";
import handelAPI from "../api/handleAPI";
import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { exportExcel } from "../utils/exportExcel.util";
import moment from "moment";
import UserModal from "../modals/ToggleModalUser";

const { Title } = Typography;

const UserPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [userSelected, setUserSelected] = useState();
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState("");

    useEffect(() => {
        loadData();
    }, [current, pageSize, status]);

    const loadData = async () => {
        setIsLoading(true);
        const api = `/auth?current=${current}&&pageSize=${pageSize}&&status=${status}`;
        try {
            const res = await handelAPI(api);

            if (res.data) {
                res.data.forEach(item => {
                    item.createdAt = moment(item.createdAt).format("DD/MM/YYYY");
                    item.updatedAt = moment(item.updatedAt).format("DD/MM/YYYY");
                });
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

    const onChangeStatus = (event) => {
        setStatus(event.target.value);
        setCurrent(1);
    }

    const handleDeleteEmployee = async (id) => {
        const api = `/auth/delete/${id}`;
        try {
            const res = await handelAPI(api, "", "delete");
            if (res.data) {
                loadData();
                notification.success({
                    message: res.message,
                    description: "Xoá nguời dùng thành công"
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
            title: 'Họ tên',
            render: (item) => {
                return (
                    <>
                        <Link to={`/employee/detail/${item._id}`} >{item.fullName}</Link>
                    </>
                );
            },
            fixed: "left",
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Vai trò",
            dataIndex: "role"
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt"
        },
        {
            title: "Ngày cập nhập",
            dataIndex: "updatedAt"
        },
        {
            title: "Action",
            fixed: "right",
            render: (item) => {
                return (<>
                    <Space>
                        <Tooltip title="Edit" color="#2db7f5">
                            <Button
                                type="link"
                                icon={<MdOutlineEdit size={20} />}
                                onClick={() => {
                                    console.log(item);
                                    setUserSelected(item);
                                    setVisible(true);
                                }}
                            />
                        </Tooltip>
                        <Popconfirm
                            placement="right"
                            title="Xoá nhân viên"
                            description="Bạn chắc chắn xoá nhân viên này không"
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
        const api = `/employees/all`;
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
    return (
        <>
            <div className="row m-3">
                <div className="col text-left">
                    <Title level={4}>Danh sách người dùng</Title>
                </div>


                <div className="col text-end">
                    <Button
                        type="primary"
                        onClick={() => { setVisible(true) }}
                        icon={<IoIosAdd size={20} />}
                    >
                        Thêm</Button>
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

            <UserModal
                visible={visible}
                loadData={loadData}
                userSelected={userSelected}
                onClose={() => {
                    setVisible(false);
                    setUserSelected(undefined);
                }}
            />
        </>
    );
}

export default UserPage;