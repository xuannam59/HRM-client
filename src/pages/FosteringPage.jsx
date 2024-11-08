import { useState } from "react";
import { Button, notification, Popconfirm, Space, Table, Tag, Tooltip, Typography } from "antd";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import moment from "moment";
import Link from "antd/es/typography/Link";
import ToggleModalFostering from "../modals/ToggleModalFostering";
import { IoIosAdd } from "react-icons/io";

const { Title } = Typography;

const FosteringPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataSelected, setDataSelected] = useState(undefined);
    const [dataSource, setDataSource] = useState([{
        _id: "nSMưGdssdeobUMm6671v1Zjv",
        teacher: "Lê Văn E",
        subject: "Toán",
        schedule: "Thứ 2",
        status: "active"
    },
    {
        _id: "0gMl9WgIgrwsf5G3scxoj0a7R",
        teacher: "Lê Văn B",
        subject: "Văn",
        schedule: "Thứ 3",
        status: "active"
    },
    {
        _id: "nSMưGnDsdeobUMm6671v1Zjv",
        teacher: "Lê Văn A",
        subject: "Giáo dục",
        schedule: "Thứ 3",
        status: "active"
    },
    {
        _id: "nSMưGnDsưdabUMm6671v1Zjv",
        teacher: "Lê Văn C",
        subject: "Anh",
        schedule: "Thứ 4",
        status: "inactive"
    },
    {
        _id: "nSMưGnDsdeobUMm6671ưeZjv",
        teacher: "Thứ 4",
        subject: "Lịch sử",
        schedule: "Thứ 6",
        status: "active"
    }]);


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
            dataIndex: "teacher",
        },
        {
            title: 'Môn bồi dưỡng',
            dataIndex: "subject",
        },
        {
            title: 'Lịch bồi dưỡng',
            dataIndex: "schedule",
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
        setIsLoading(true);
        const data = dataSource.filter(item => item._id !== id);
        setDataSource(data);
        notification.success({
            message: "Update success",
            description: "Xoá Lịch thánh công"
        });
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

            <ToggleModalFostering
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

export default FosteringPage;