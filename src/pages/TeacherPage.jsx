import { Button, notification, Popconfirm, Radio, Space, Table, Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import ToggleModal from "../modals/ToggleModal";
import handelAPI from "../api/handleAPI";

const { Title } = Typography;

const TeacherPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [teacherSelected, setTeacherSelected] = useState();
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState("");

    useEffect(() => {
        loadData();
    }, [current, pageSize, status]);

    const loadData = async () => {
        setIsLoading(true);
        const api = `/teachers?current=${current}&&pageSize=${pageSize}&&status=${status}`;
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

    const handleDeleteTeacher = async (id) => {
        const api = `/teachers/delete/${id}`;
        try {
            const res = await handelAPI(api, "", "delete");
            if (res.data) {
                loadData();
                notification.success({
                    message: res.message,
                    description: "Xoá giáo viên thành công"
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
            }
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
        },
        {
            title: 'Môn dạy',
            dataIndex: 'subject',
        },
        {
            title: "Lớp",
            dataIndex: "class"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Giới tính",
            dataIndex: "gender"
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (_, record) => {
                let color, status;
                switch (record.status) {
                    case "active":
                        color = "green";
                        status = "Đang công tác"
                        break
                    case "inactive":
                        color = "red";
                        status = "Ngừng công tác";
                        break
                    default:
                        color = "#f50";
                        status = "Chưa cập nhập";
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
                        <Tooltip title="Edit" color="#2db7f5">
                            <Button
                                type="link"
                                icon={<MdOutlineEdit size={20} />}
                                onClick={() => {
                                    setTeacherSelected(item);
                                    setVisible(true);
                                }}
                            />
                        </Tooltip>
                        <Popconfirm
                            placement="right"
                            title="Xoá giáo viên"
                            description="Bạn chắc chắn xoá giáo viên này không"
                            onConfirm={() => handleDeleteTeacher(item._id)}
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
    return (
        <>
            <Table
                loading={isLoading}
                title={() => {
                    return (
                        <>
                            <div className="row">
                                <div className="col text-left">
                                    <Title level={4}>List teacher</Title>
                                </div>

                                <div className="col text-center">
                                    <Radio.Group onChange={(event) => onChangeStatus(event)} defaultValue={status} buttonStyle="solid">
                                        <Radio.Button value={""}>Tất cả</Radio.Button>
                                        <Radio.Button value={"active"}>Đang công tác</Radio.Button>
                                        <Radio.Button value={"inactive"}>Ngừng công tác</Radio.Button>
                                    </Radio.Group>
                                </div>

                                <div className="col text-end">
                                    <Button
                                        type="primary"
                                        onClick={() => { setVisible(true) }}
                                    >
                                        <IoIosAdd size={20} />Thêm</Button>
                                </div>
                            </div >
                        </>
                    );
                }}
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
                onChange={onChangeTable}
                rowKey="_id"
            />

            <ToggleModal
                visible={visible}
                loadData={loadData}
                teacherSelected={teacherSelected}
                onClose={() => {
                    setVisible(false);
                    setTeacherSelected(undefined);
                }}
            />
        </>
    );
}

export default TeacherPage;