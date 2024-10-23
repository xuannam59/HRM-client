import { DatePicker, Form, Input, Modal, notification, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { generateString } from "../utils/generateString.util";

const ToggleModalSchedule = (props) => {
    const {
        visible, onClose,
        setDataSource, dataSource,
        dataSelected
    } = props

    const user = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (dataSelected) {
            form.setFieldsValue(dataSelected);
        }
    }, [dataSelected]);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setIsLoading(true);
        // Push vào phần tử
        const data = dataSource;
        if (!dataSelected) {
            data.push(values)
            setDataSource(data);
        } else {
            const index = data.findIndex(item => item._id === dataSelected._id);
            data[index] = {
                _id: values._id,
                date: values.date,
                subject: values.subject,
                startDate: moment(values.startDate, "hh:mm:ss").format("LTS"),
                endDate: moment(values.endDate, "hh:mm:ss").format("LTS"),
                room: values.room
            };

            setDataSource(data);
        }
        notification.success(dataSelected ? {
            message: "Update success",
            description: "Cập nhập tuyển dụng thánh công"
        } : {
            message: "Create success",
            description: "Thêm mới tuyển dụng thánh công"
        })
        handleCancel();
        setIsLoading(false);
    }

    const handleCancel = () => {
        form.resetFields();
        onClose();
    }
    return (<>
        <Modal
            closable={!isLoading}
            title={dataSelected ? "Update application" : "Create application"}
            open={visible}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText={dataSelected ? "Update" : "CREATE"}
            okButtonProps={{
                loading: isLoading
            }}
            maskClosable={false}
            style={{
                maxWidth: "800px",
                minWidth: "700px"
            }}
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                disabled={isLoading}
                initialValues={{
                    "_id": !dataSelected && generateString(25)
                }}
            >
                <Form.Item
                    name={"_id"}
                    label={"Mã lịch"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Input disabled={true} />
                </Form.Item>
                <Form.Item
                    name={"date"}
                    label={"Ngày dạy"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Select options={[
                        { value: 'Thứ 2', label: 'Thứ 2' },
                        { value: 'Thứ 3', label: 'Thứ 3' },
                        { value: 'Thứ 4', label: 'Thứ 4' },
                        { value: 'Thứ 5', label: 'Thứ 5' },
                        { value: 'Thứ 6', label: 'Thứ 6' },
                        { value: 'Thứ 7', label: 'Thứ 7' },
                    ]} placeholder="Ngày dạy" />
                </Form.Item>
                <Form.Item
                    name={"subject"}
                    label={"Môn dạy"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Input placeholder="Họ tên" />
                </Form.Item>
                <Form.Item
                    name={"startDate"}
                    label={"Thời gian bắt đầu"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Input placeholder="Thời gian bắt đầu" />
                </Form.Item>

                <Form.Item
                    name={"endDate"}
                    label={"Thời gian kết thúc"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Input placeholder="Thời gian kết thúc" />
                </Form.Item>

                <Form.Item
                    name={"room"}
                    label={"Phòng"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Select options={[
                        { value: '101', label: '101' },
                        { value: '102', label: '102' },
                        { value: '103', label: '103' },
                        { value: '201', label: '201' },
                        { value: '202', label: '202' },
                        { value: '203', label: '203' },
                    ]} placeholder="Phòng" />
                </Form.Item>
                <Form.Item
                    name={"description"}
                    label={"Mô tả"}
                >
                    <Input.TextArea rows={2} />
                </Form.Item>
                <div className="row">
                    <div className="col">
                        <Form.Item

                            label={"Người tạo"}
                        >
                            <Input rows={4} disabled defaultValue={user.fullName} />
                        </Form.Item>
                        <Form.Item
                            style={{ display: "none" }}
                        >
                            <Input defaultValue={user._id} disabled />
                        </Form.Item>
                    </div>
                    <div className="col">
                        <Form.Item
                            label={"Ngày tạo"}
                        >
                            <DatePicker format={"DD/MM/YYYY"} disabled defaultValue={moment()} />
                        </Form.Item>
                    </div>
                </div>

            </Form>
        </Modal>
    </>);
}

export default ToggleModalSchedule;