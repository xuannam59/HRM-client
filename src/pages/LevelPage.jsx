import { useState } from "react";
import { Button, Popconfirm, Space, Table, Tooltip, Typography } from "antd";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import ToggleModalLevel from "../modals/ToggleModalLevel";

const { Title } = Typography;

const LevelPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const columns = [
        {
            title: 'STT',
            dataIndex: "index",
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: 'Mã Chức vụ',
            dataIndex: "_id",
        },
        {
            title: 'Tên Chức vụ',
            dataIndex: "title",
        },
        {
            title: 'Lương ngày',
            dataIndex: "salary"
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
            title: 'Người tạo',
            dataIndex: "createdBy"
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
                            // onClick={() => {
                            //     setEmployeeSelected(item);
                            //     setVisible(true);
                            // }}
                            />
                        </Tooltip>
                        <Popconfirm
                            placement="right"
                            title="Xoá giáo viên"
                            description="Bạn chắc chắn xoá nhân viên này không"
                            // onConfirm={() => handleDeleteEmployee(item._id)}
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
    const dataSource = [
        {
            key: '1',
            _id: "123123",
            title: 'Mike',
            salary: 32,
            dataIndex: '10 Downing Street',
        },
        {
            key: '2',
            _id: "12312qưeqwe3",
            title: 'Mike',
            salary: 32,
            dataIndex: '10 Downing Street',
        },
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
                    <Button className="ms-2" icon={<FiDownload />} onClick={() => console.log("đang cập nhập")}>Xuất excel</Button>
                </div>
            </div >
            <Table
                loading={isLoading}
                columns={columns}
                dataSource={dataSource}
                // pagination={{
                //     current: current,
                //     pageSize: pageSize,
                //     total: total,
                //     position: ["bottomCenter"],
                //     showSizeChanger: true,
                //     pageSizeOptions: [5, 10, 20, 50],
                //     showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                // }}
                scroll={{
                    x: 'max-content'
                }}
                // onChange={onChangeTable}
                rowKey="_id"
            />

            <ToggleModalLevel
                visible={visible}
                setVisible={setVisible}
            />
        </>
    );
}

export default LevelPage;