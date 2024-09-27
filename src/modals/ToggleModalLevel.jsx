import { DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";

const ToggleModalLevel = (props) => {
    const {
        visible, setVisible
    } = props

    const user = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
    }

    const handleCancel = () => {
        setVisible(false);
    }
    return (<>
        <Modal
            closable={!isLoading}
            title={"Create Position"}
            open={visible}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText={"CREATE"}
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
                    ["createdAt"]: moment(),
                    ["creatorName"]: user.fullName,
                    ["createdBy"]: user._id
                }}
            >
                <Form.Item
                    name={"title"}
                    label={"Tên trình độ"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Input placeholder="Tên trình độ" />
                </Form.Item>

                <Form.Item
                    name={"description"}
                    label={"Mô tả"}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <div className="row">
                    <div className="col">
                        <Form.Item
                            name={"creatorName"}
                            label={"Người tạo"}
                        >
                            <Input rows={4} disabled />
                        </Form.Item>
                        <Form.Item
                            style={{ display: "none" }}
                            name={"createdBy"}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col">
                        <Form.Item
                            name={"createdAt"}
                            label={"Ngày tạo"}
                        >
                            <DatePicker format={"DD/MM/YYYY"} disabled />
                        </Form.Item>
                    </div>
                </div>

            </Form>
        </Modal>
    </>);
}

export default ToggleModalLevel;