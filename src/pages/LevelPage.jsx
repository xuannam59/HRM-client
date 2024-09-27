import { useEffect, useState } from "react";
import { Button, notification, Popconfirm, Space, Table, Tooltip, Typography } from "antd";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import ToggleModalLevel from "../modals/ToggleModalLevel";
import handelAPI from "../api/handleAPI";
import moment from "moment";
import { exportExcel } from "../utils/exportExcel.util";

const { Title } = Typography;

const LevelPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [levelSelected, setLevelSelected] = useState(undefined);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        loadData();
    }, [current, pageSize]);

    const loadData = async () => {
        setIsLoading(true);
        const api = `/levels?current=${current}&&pageSize=${pageSize}`;
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
            } else {
                notification.error({
                    message: "Error",
                    description: "Error"
                })
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

    const handleDeleteLevel = async (id) => {
        const api = `/levels/delete/${id}`;
        try {
            const res = await handelAPI(api, "", "delete");
            if (res.data) {

                loadData();
                notification.success({
                    message: res.message,
                    description: "Xoá trình độ thành công"
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
            dataIndex: "index",
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: 'Mã trình độ',
            dataIndex: "_id",
        },
        {
            title: 'Tên trình độ',
            dataIndex: "title",
        },
        {
            title: 'Mô tả',
            dataIndex: "description"
        },
        {
            title: 'Ngày tạo',
            dataIndex: "createdAt"
        },
        {
            title: 'Ngày sửa',
            dataIndex: "updatedAt"
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
                                    setLevelSelected(record);
                                    setVisible(true);
                                }}
                            />
                        </Tooltip>
                        <Popconfirm
                            placement="right"
                            title="Xoá giáo viên"
                            description="Bạn chắc chắn xoá nhân viên này không"
                            onConfirm={() => handleDeleteLevel(record._id)}
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
            <div className="row m-3">
                <div className="col text-left">
                    <Title level={4}>Trình độ</Title>
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

            <ToggleModalLevel
                visible={visible}
                levelSelected={levelSelected}
                loadData={loadData}
                onClose={() => {
                    setVisible(false);
                    setLevelSelected(undefined);
                }}
            />
        </>
    );
}

export default LevelPage;