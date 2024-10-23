import { useState } from "react";
import { Button, Space, Table, Tooltip, Typography } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import moment from "moment";
import Link from "antd/es/typography/Link";
import ToggleModalCollaborate from "../modals/ToggleModalCollaborate";

const { Title } = Typography;

const CollaboratePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataSelected, setDataSelected] = useState(undefined);
    const [dataSource, setDataSource] = useState([{
        _id: "nSMưGnDsdeobUMm6671v1Zjv",
        fullName: "Lê Văn A",
        unitName: "Trường Nguyễn Xuyến",
        time: moment("2024-09-28T09:51:21.253+00:00").format("LL")
    },
    {
        _id: "TNkQp1WLAc3Cp6yvRLREcJc",
        fullName: "Trần Quốc Bảo",
        unitName: "Trường Nguyễn Đăng Đạo",
        time: moment("2024-09-21T15:55:19.220+00:00").format("LL")
    },
    {
        _id: "TvrmI9Q20pa0CFWoh067Yt8cv",
        fullName: "Nguyễn Thị Mai",
        unitName: "Trường Nội Duệ",
        time: moment("2024-09-21T16:20:58.461+00:00").format("LL")
    },
    {
        _id: "dupJErnAODtLUzK52b9AFjKG",
        fullName: "Nguyên Lan Phương",
        unitName: "Trường Ngô Gia Tự",
        time: moment("2024-10-22T16:20:58.461+00:00").format("LL")
    },
    {
        _id: "jưjMTETc3mmdLkDzVkiYbhCKv",
        fullName: "Nguyễn Thị Trang",
        unitName: "Trường Lý Thái Tổ",
        time: moment("2025-01-11T16:20:58.461+00:00").format("LL")
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
            title: 'Mã công tác',
            dataIndex: "_id",
            render: (text, record) => {
                return (
                    <Link>{record._id}</Link>
                );
            }
        },
        {
            title: 'Mã nhân viên',
            dataIndex: "fullName",
        },
        {
            title: 'Tên đơn vị',
            dataIndex: "unitName",
        },
        {
            title: 'Thời gian',
            dataIndex: "time",
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

            <ToggleModalCollaborate
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

export default CollaboratePage;