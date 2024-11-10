import { useEffect, useState } from "react";
import { Button, notification, Popconfirm, Space, Table, Tag, Tooltip, Typography } from "antd";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import moment from "moment";
import Link from "antd/es/typography/Link";
import ToggleModalRewardDiscipline from "../modals/ToggleModalRewardDiscipline";
import handelAPI from "../api/handleAPI";

const { Title } = Typography;

const RewardDisciplinePage = () => {
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
        const api = `/reward-discipline?current=${current}&&pageSize=${pageSize}`;
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

    const columns = [
        {
            title: 'STT',
            dataIndex: "index",
            render: (text, record, index) => {
                return index + 1;
            },
            fixed: "left",
        },
        {
            title: 'Mã phần thưởng',
            dataIndex: "_id",
            render: (text, record) => {
                return (
                    <Link>{record._id}</Link>
                );
            },
            fixed: "left",
        },
        {
            title: 'Giáo viên',
            render: (record) => {
                return record.employeeId.fullName
            }
        },
        {
            title: 'Loại',
            dataIndex: "types",
            render: (text, record) => {
                return (
                    <Tag color={record.types === "bonus" ? "#87d068" : "#f50"} >
                        {record.types === "bonus" ? "Khen thưởng" : "Kỷ luật"}
                    </Tag>
                )
            }
        },
        {
            title: 'Nội dung',
            dataIndex: "content",
        },
        {
            title: 'Mô tả',
            dataIndex: "description",
            width: 400
        },
        {
            title: 'Ngày lập',
            dataIndex: "createdAt",
            render: (text, record) => {
                return moment(record.createdAt).format("DD/MM/YYYY")
            }
        },
        {
            title: 'Ngày sửa',
            dataIndex: "updatedAt",
            render: (text, record) => {
                return moment(record.updatedAt).format("DD/MM/YYYY")
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
                            title="Xoá thưởng & kỷ luật"
                            description="Bạn chắc chắn xoá thưởng & kỷ luật này không"
                            onConfirm={() => handleDeleteRewardDiscipline(record._id)}
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

    const handleDeleteRewardDiscipline = async (id) => {
        const api = `/reward-discipline/delete/${id}`;
        try {
            const res = await handelAPI(api, "", "delete");
            if (res.data) {
                loadData();
                notification.success({
                    message: res.message,
                    description: "Xoá lịch thành công"
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
                    <Title level={4}>Khen thưởng & kỷ luật</Title>
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

            <ToggleModalRewardDiscipline
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

export default RewardDisciplinePage;