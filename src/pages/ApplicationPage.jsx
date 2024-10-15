import { useState } from "react";
import { Button, notification, Popconfirm, Space, Table, Tooltip, Typography } from "antd";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import ToggleModalApplication from "../modals/ToggleModalApplication";

const { Title } = Typography;

const ApplicationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [applicationSelected, setApplicationSelected] = useState(undefined);
    const [dataSource, setDataSource] = useState([{
        _id: "nSMưGnD6kDobUMm6671v1Zjv",
        fullName: "Lê Văn A",
        email: "levana@gmail.com",
        phoneNumber: "123456789",
        address: "Bắc Ninh",
        description: "ứng tuyển vị trí nhân viên development",
    },
    {
        _id: "0gMl9WgIm1JuY5G3scxoj0a7R",
        fullName: "Lê Văn B",
        email: "levanb@gmail.com",
        phoneNumber: "123456789",
        address: "Bắc Ninh",
        description: "ứng tuyển vị trí nhân viên Kế toán",
    }]);



    const handleDeleteApplication = async (id) => {
        setIsLoading(true);
        const data = dataSource.filter(item => item._id !== id);
        setDataSource(data);
        notification.success({
            message: "Update success",
            description: "Xoá tuyển dụng thánh công"
        });
        setIsLoading(false);
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
            title: 'Mã Tuyển dụng',
            dataIndex: "_id",
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
            title: 'Địa chỉ',
            dataIndex: "address",
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
                                    setApplicationSelected(record);
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
                applicationSelected={applicationSelected}
                onClose={() => {
                    setVisible(false);
                    setApplicationSelected(undefined);
                }}
                dataSource={dataSource}
                setDataSource={setDataSource}
            />
        </>
    );
}

export default ApplicationPage;