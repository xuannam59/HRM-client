import { Button, notification, Popconfirm, Radio, Space, Table, Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import handelAPI from "../../api/handleAPI";
import moment from "moment";
import ToggleModalDepartment from "../../modals/ToggleModalDepartment";
import { Link } from "react-router-dom";

const { Title } = Typography;

const DepartmentPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [departmentSelected, setDepartmentSelected] = useState(undefined);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        loadData();
    }, [current, pageSize]);

    const loadData = async () => {
        setIsLoading(true);
        const api = `/departments?current=${current}&&pageSize=${pageSize}`;
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

    const handleDeleteEmployee = async (id) => {
        const api = `/departments/delete/${id}`;
        try {
            const res = await handelAPI(api, "", "delete");
            if (res.data) {

                loadData();
                notification.success({
                    message: res.message,
                    description: "Xoá phòng ban thành công"
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
                return (index + 1) + (current - 1) * pageSize;
            },
            width: 'max-content'
        },
        {
            title: 'Mã phòng ban',
            render: (text, record) => {
                return <Link to={`/department/detail/${record._id}`} >{record._id}</Link>
            }

        },
        {
            title: 'Tên phòng ban',
            dataIndex: "title",
        },
        {
            title: 'Số nhân viên',
            dataIndex: "employeeQuantity",
            align: "center",
            render: (text) => {
                return <Tag color={text < 1 ? "#f50" : "#87d068"}>{text}</Tag>
            }
        },
        {
            title: 'Mô tả',
            dataIndex: "description",
            width: 250
        },
        {
            title: 'Ngày tạo',
            dataIndex: "createdAt"
        },
        {
            title: 'Người tạo',
            dataIndex: "infoCreatedBy"
        },
        {
            title: 'Ngày sửa',
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
                                    setDepartmentSelected(item);
                                    setVisible(true);
                                }}
                            />
                        </Tooltip>
                        <Popconfirm
                            placement="right"
                            title="Xoá phòng ban"
                            description="Bạn chắc chắn xoá phòng ban này không"
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
    return (
        <>
            <div className="row m-3">
                <div className="col text-left">
                    <Title level={4}>Danh sách phòng ban</Title>
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
                scroll={
                    { x: 'max-content' }
                }
                onChange={onChangeTable}
                rowKey="_id"
            />

            <ToggleModalDepartment
                visible={visible}
                loadData={loadData}
                departmentSelected={departmentSelected}
                onClose={() => {
                    setVisible(false);
                }}
            />
        </>
    );
}

export default DepartmentPage;