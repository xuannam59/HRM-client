import { DatePicker, Form, Input, Modal, notification } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { generateString } from "../utils/generateString.util";

const ToggleModalApplication = (props) => {
    const {
        visible, onClose,
        setDataSource, dataSource,
        applicationSelected
    } = props

    const user = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (applicationSelected) {
            form.setFieldsValue(applicationSelected);
        }
    }, [applicationSelected]);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setIsLoading(true);
        // Push vào phần tử
        const data = dataSource;
        if (!applicationSelected) {
            data.push(values)
            setDataSource(data);
        } else {
            const index = data.findIndex(item => item._id === applicationSelected._id);
            data[index] = values;

            setDataSource(data);
        }
        notification.success(applicationSelected ? {
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
            title={applicationSelected ? "Update application" : "Create application"}
            open={visible}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText={applicationSelected ? "Update" : "CREATE"}
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
                    "_id": !applicationSelected && generateString(25)
                }}
            >
                <Form.Item
                    name={"_id"}
                    label={"Mã tuyển dụng"}
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
                    name={"fullName"}
                    label={"Họ tên"}
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
                    name={"email"}
                    label={"Email"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name={"phoneNumber"}
                    label={"Số điện thoại"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Input placeholder="Số điện thoại" />
                </Form.Item>

                <Form.Item
                    name={"address"}
                    label={"địa chỉ"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Input placeholder="địa chỉ" />
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

export default ToggleModalApplication;