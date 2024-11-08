import { useState } from "react";
import { Button, notification, Popconfirm, Space, Table, Tooltip, Typography } from "antd";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import ToggleModalSchedule from "../modals/ToggleModalSchedule";
import moment from "moment";
import Link from "antd/es/typography/Link";

const { Title } = Typography;

const SchedulePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataSelected, setDataSelected] = useState(undefined);
    const [dataSource, setDataSource] = useState([{
        _id: "nSMưGdssdeobUMm6671v1Zjv",
        date: "Thứ 2",
        subject: "Toán",
        startDate: "6",
        endDate: "9",
        room: "102"
    },
    {
        _id: "0gMl9WgIgrwsf5G3scxoj0a7R",
        date: "Thứ 2",
        subject: "Văn",
        startDate: "9",
        endDate: "12",
        room: "102"
    },
    {
        _id: "nSMưGnDsdeobUMm6671v1Zjv",
        date: "Thứ 3",
        subject: "Giáo dục",
        startDate: "6",
        endDate: "9",
        room: "103"
    },
    {
        _id: "nSMưGnDsưdabUMm6671v1Zjv",
        date: "Thứ 3",
        subject: "Anh",
        startDate: "9",
        endDate: "12",
        room: "201"
    },
    {
        _id: "nSMưGnDsdeobUMm6671ưeZjv",
        date: "Thứ 4",
        subject: "Lịch sử",
        startDate: "9",
        endDate: "9",
        room: "102"
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
            title: 'Mã lịch',
            dataIndex: "_id",
            render: (text, record) => {
                return (
                    <Link>{record._id}</Link>
                );
            }
        },
        {
            title: 'Ngày dạy',
            dataIndex: "date",
        },
        {
            title: 'Môn học',
            dataIndex: "subject",
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: "startDate",
            render: (text, record) => {
                return moment(record.startDate, "hh:mm:ss").format("LTS")
            }
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: "endDate",
            render: (text, record) => {
                return moment(record.endDate, "hh:mm:ss").format("LTS")
            }
        },
        {
            title: 'Phòng học',
            dataIndex: "room"
        },
        {
            title: 'Mô tả',
            dataIndex: "descriptions"
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
                            title="Xoá Lịch"
                            description="Bạn chắc chắn xoá lịch này không"
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
                    <Title level={4}>Lịch dạy</Title>
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

            <ToggleModalSchedule
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

export default SchedulePage;