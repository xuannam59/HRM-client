import { useEffect, useState } from "react";
import { Button, notification, Popconfirm, Space, Table, Tooltip, Typography } from "antd";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import Link from "antd/es/typography/Link";
import ToggleModalCollaborate from "../modals/ToggleModalCollaborate";
import handelAPI from "../api/handleAPI";

const { Title } = Typography;

const CollaboratePage = () => {
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
        const api = `/collaborates?current=${current}&&pageSize=${pageSize}&&status=${status}`;
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
            title: 'Mã công tác',
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
            title: 'Tên đơn vị',
            dataIndex: "unitName",
        },
        {
            title: 'Thời gian',
            dataIndex: "date",
        },
        {
            title: 'Mô tả',
            dataIndex: "description"
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
                            title="Xoá công tác"
                            description="Bạn chắc chắn xoá công tác này không"
                            onConfirm={() => handleDeleteCollaborate(record._id)}
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


    const handleDeleteCollaborate = async (id) => {
        setIsLoading(true);
        const api = `/collaborates/delete/${id}`;
        try {
            const res = await handelAPI(api, "", "delete");
            if (res.data) {
                loadData();
                notification.success({
                    message: res.message,
                    description: "Xoá Công tác thành công"
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
                    <Title level={4}>Công Tác</Title>
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

            <ToggleModalCollaborate
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

export default CollaboratePage;