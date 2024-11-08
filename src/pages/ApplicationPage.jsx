import { useEffect, useState } from "react";
import { Button, notification, Popconfirm, Space, Table, Tag, Tooltip, Typography } from "antd";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import ToggleModalApplication from "../modals/ToggleModalApplication";
import handelAPI from "../api/handleAPI";
import moment from "moment";
import Link from "antd/es/typography/Link";

const { Title } = Typography;

const ApplicationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataSelected, setDataSelected] = useState(undefined);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        loadData();
    }, [current, pageSize, status]);


    const loadData = async () => {
        setIsLoading(true);
        const api = `/applications?current=${current}&&pageSize=${pageSize}&&status=${status}`;
        try {
            const res = await handelAPI(api);

            if (res.data) {
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

    const columns = [
        {
            title: 'STT',
            dataIndex: "index",
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: 'Mã tuyển dụng',
            dataIndex: "_id",
            render: (text) => {
                return (
                    <Link>{text}</Link>
                )
            }

        },
        {
            title: 'Họ tên',
            dataIndex: "fullName",
        },
        {
            title: 'Email',
            dataIndex: "email",
        },
        {
            title: 'Số điện thoại',
            dataIndex: "phoneNumber",
        },
        {
            title: 'Vị trí tuyển dụng',
            dataIndex: "position",
        },
        {
            title: 'Tình trạng',
            dataIndex: "status",
            render: (text, record) => {
                return (
                    <Tag color={
                        record.status === "APPROVED" ? "#87d068"
                            : record.status === "REJECTED" ? "#f50" : "#2db7f5"
                    }>
                        {record.status}
                    </Tag>
                )
            }

        },
        {
            title: 'Địa chỉ',
            dataIndex: "address",
        },
        {
            title: 'Mô tả',
            dataIndex: "description"
        },
        {
            title: 'Ngày tạo',
            dataIndex: "createAt",
            render: (text, record) => {
                return (moment(record.createAt).format("DD/MM/YYYY"))
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
                        <Popconfirm
                            placement="right"
                            title="Xoá nhân viên"
                            description="Bạn chắc chắn xoá nhân viên này không"
                            onConfirm={() => handleDeleteApplication(record._id)}
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

    const handleDeleteApplication = async (id) => {
        const api = `/applications/delete/${id}`;
        try {
            const res = await handelAPI(api, "", "delete");
            if (res.data) {
                loadData();
                notification.success({
                    message: res.message,
                    description: "Xoá Đơn ứng tuyển thành công"
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
    return (
        <>
            <div className="row m-3">
                <div className="col text-left">
                    <Title level={4}>Tuyển dụng</Title>
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
            />

            <ToggleModalApplication
                visible={visible}
                dataSelected={dataSelected}
                onClose={() => {
                    setVisible(false);
                    setDataSelected(undefined);
                }}
                loadData={loadData}
                dataSource={dataSource}
                setDataSource={setDataSource}
            />
        </>
    );
}

export default ApplicationPage;