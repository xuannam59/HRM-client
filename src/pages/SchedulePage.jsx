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
    const [scheduleSelected, setScheduleSelected] = useState(undefined);
    const [dataSource, setDataSource] = useState([{
        _id: "nSMưGnDsdeobUMm6671v1Zjv",
        date: "Thứ 2",
        subject: "Toán",
        startDate: moment("6", "hh:mm:ss").format("LTS"),
        endDate: moment("9", "hh:mm:ss").format("LTS"),
        room: "102"
    },
    {
        _id: "0gMl9WgIgrwsf5G3scxoj0a7R",
        date: "Thứ 2",
        subject: "Văn",
        startDate: moment("9", "hh:mm:ss").format("LTS"),
        endDate: moment("12", "hh:mm:ss").format("LTS"),
        room: "102"
    },
    {
        _id: "nSMưGnDsdeobUMm6671v1Zjv",
        date: "Thứ 3",
        subject: "Giáo dục",
        startDate: moment("6", "hh:mm:ss").format("LTS"),
        endDate: moment("9", "hh:mm:ss").format("LTS"),
        room: "103"
    },
    {
        _id: "nSMưGnDsdeobUMm6671v1Zjv",
        date: "Thứ 3",
        subject: "Anh",
        startDate: moment("9", "hh:mm:ss").format("LTS"),
        endDate: moment("12", "hh:mm:ss").format("LTS"),
        room: "201"
    },
    {
        _id: "nSMưGnDsdeobUMm6671v1Zjv",
        date: "Thứ 4",
        subject: "Lịch sử",
        startDate: moment("9", "hh:mm:ss").format("LTS"),
        endDate: moment("9", "hh:mm:ss").format("LTS"),
        room: "102"
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
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: "endDate"
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
                                    setScheduleSelected(record);
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
                dataSelected={scheduleSelected}
                onClose={() => {
                    setVisible(false);
                    setScheduleSelected(undefined);
                }}
                dataSource={dataSource}
                setDataSource={setDataSource}
            />
        </>
    );
}

export default SchedulePage;