import { useEffect, useState } from "react";
import { Button, notification, Popconfirm, Space, Table, Tag, Tooltip, Typography } from "antd";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import Link from "antd/es/typography/Link";
import ToggleModalFostering from "../modals/ToggleModalFostering";
import { IoIosAdd } from "react-icons/io";
import handelAPI from "../api/handleAPI";
import dayjs from "dayjs";


const { Title } = Typography;

const FosteringPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataSelected, setDataSelected] = useState(undefined);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        loadData();
    }, [current, pageSize]);

    const loadData = async () => {
        setIsLoading(true);
        const api = `/fostering?current=${current}&&pageSize=${pageSize}`;
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
            title: 'Mã bồi dưỡng',
            dataIndex: "_id",
            render: (text, record) => {
                return (
                    <Link>{record._id}</Link>
                );
            }
        },
        {
            title: 'Giáo viên',
            render: (record) => {
                return record.employeeId.fullName
            }
        },
        {
            title: 'Môn bồi dưỡng',
            dataIndex: "subject",
            align: "center"
        },
        {
            title: 'Lịch bồi dưỡng',
            dataIndex: "schedule",
            align: "center"
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
            title: 'trạng thái',
            dataIndex: "status",
            render: (text, record) => {
                return (
                    <Tag color={record.status === "active" ? "#87d068" : "#f50"}>{record.status === "active" ? "Hoạt động" : "Ngừng hoạt động"}</Tag>
                )
            }
        },
        {
            title: 'Mô tả',
            dataIndex: "description",
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
                            title="Xoá bồi dưỡng"
                            description="Bạn chắc chắn xoá bồi dưỡng này"
                            onConfirm={() => handleDeleteFostering(record._id)}
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

    const onChangeTable = (pagination, filters, sorter, extra) => {
        if (pagination.current && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination.pageSize && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
        }
    }

    const handleDeleteFostering = async (id) => {
        setIsLoading(true);
        const api = `/fostering/delete/${id}`;
        try {
            const res = await handelAPI(api, "", "delete");
            if (res.data) {
                loadData();
                notification.success({
                    message: res.message,
                    description: "Xoá Lịch bồi dưỡng thành công"
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
        setIsLoading(false);
    }


    return (
        <>
            <div className="row m-3">
                <div className="col text-left">
                    <Title level={4}>Lịch bồi dưỡng</Title>
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

            <ToggleModalFostering
                visible={visible}
                dataSelected={dataSelected}
                loadData={loadData}
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

export default FosteringPage;