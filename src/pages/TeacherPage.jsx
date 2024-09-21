import { Button, Popconfirm, Radio, Space, Table, Tag, Tooltip, Typography } from "antd";
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
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        const api = `/teachers`;
        try {
            const res = await handelAPI(api);

            res.data && setDataSource(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return index + 1;
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
                        <Popconfirm
                            placement="bottomRight"
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={""}
                            onCancel={""}
                            okText="Yes"
                            cancelText="No"
                        >

                            <Button type="text" icon={<MdOutlineDeleteForever size={20} />} danger />
                        </Popconfirm>
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
                                    <Radio.Group onChange={""} defaultValue={"all"} buttonStyle="solid">
                                        <Radio.Button value={"all"}>Tất cả</Radio.Button>
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
                pagination={{}}
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