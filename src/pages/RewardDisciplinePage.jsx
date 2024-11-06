import { useState } from "react";
import { Button, notification, Popconfirm, Space, Table, Tag, Tooltip, Typography } from "antd";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import moment from "moment";
import Link from "antd/es/typography/Link";
import ToggleModalRewardDiscipline from "../modals/ToggleModalRewardDiscipline";

const { Title } = Typography;

const RewardDisciplinePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataSelected, setDataSelected] = useState(undefined);
    const [dataSource, setDataSource] = useState([
        {
            _id: "nSMưGdssdeobUMm6671v1Zjv",
            fullName: "Lê Văn A",
            types: "punish",
            content: "Đi làm muộn",
            money: 500000,
            date: "9/5/2024",
            descriptions: ""
        },
        {
            _id: "nSMưGdssdeo34Mm6671v1Zjv",
            fullName: "Lê Văn B",
            types: "bonus",
            content: "Nhân viên của năm",
            money: 300000,
            date: "10/24/2024",
            descriptions: ""
        },
        {
            _id: "nSMưGdssdfobUMm6671v1Zjv",
            fullName: "Lê Văn C",
            types: "bonus",
            content: "Nhân viên của năm",
            money: 450000,
            date: "3/23/2024",
            descriptions: ""
        },
        {
            _id: "nSMưGdssdeobhgfdes71v1Zjv",
            fullName: "Lê Văn D",
            types: "punish",
            content: "Nhân viên của năm",
            money: 350000,
            date: "6/16/2024",
            descriptions: ""
        },

    ]);

    console.log(moment(moment.now()).format("DD/MM/YYYY"))
    const columns = [
        {
            title: 'STT',
            dataIndex: "index",
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: 'Mã phần thưởng',
            dataIndex: "_id",
            render: (text, record) => {
                return (
                    <Link>{record._id}</Link>
                );
            }
        },
        {
            title: 'Nhân viên',
            dataIndex: "fullName",
        },
        {
            title: 'Loại',
            dataIndex: "types",
            render: (text, record) => {
                return (
                    <Tag color={record.types === "bonus" ? "#87d068" : "#f50"} >
                        {record.types === "bonus" ? "Thưởng" : "Kỷ luật"}
                    </Tag>
                )
            }
        },
        {
            title: 'Số tiền',
            dataIndex: "money",
            render: (text, record) => {
                return (
                    <Tag color={record.types === "bonus" ? "#87d068" : "#f50"} >
                        {record.money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </Tag>
                )
            }
        },
        {
            title: 'Nội dung',
            dataIndex: "content",
        },
        {
            title: 'Ngày lập',
            dataIndex: "date",
            render: (text, record) => {
                return moment(record.date).format("DD/MM/YYYY")
            }
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
                    </Space>
                </>);
            }
        }

    ];


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

            <ToggleModalRewardDiscipline
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

export default RewardDisciplinePage;