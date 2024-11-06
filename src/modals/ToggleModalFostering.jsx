import { DatePicker, Form, Input, Modal, notification, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { generateString } from "../utils/generateString.util";

const ToggleModalFostering = (props) => {
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
            data[index] = values;

            setDataSource(data);
        }
        notification.success(dataSelected ? {
            message: "Update success",
            description: "Cập nhập bồi dưỡng thánh công"
        } : {
            message: "Create success",
            description: "Thêm mới bồi dưỡng thánh công"
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
            title={dataSelected ? "Update fostering" : "Create fostering"}
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
                    label={"Mã bồi dưỡng"}
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
                    name={"teacher"}
                    label={"Nhân viên"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Select options={[
                        { value: 'Lê Văn E', label: 'Lê Văn E' },
                        { value: 'Nam Lê', label: 'Nam Lê' },
                        { value: 'Lê Văn B', label: 'Lê Văn B' },
                        { value: 'Lê Văn A', label: 'Lê Văn A' },
                    ]} placeholder="Nhân viên" />
                </Form.Item>
                <Form.Item
                    name={"subject"}
                    label={"Môn bồi dưỡng"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Select options={[
                        { value: 'Toán', label: 'Toán' },
                        { value: 'Văn', label: 'Văn' },
                        { value: 'Anh', label: 'Anh' },
                        { value: 'Hoá', label: 'Hoá' },
                        { value: 'Vật lý', label: 'Vật lý' },
                        { value: 'Sinh', label: 'Sinh' },
                        { value: 'Lịch sử', label: 'Lịch sử' },
                    ]} placeholder="Môn bồi dưỡng" />
                </Form.Item>
                <Form.Item
                    name={"schedule"}
                    label={"Lịch bồi dưỡng"}
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
                    ]} placeholder="Lịch bồi dưỡng" />
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

export default ToggleModalFostering;