import { DatePicker, Form, Input, Modal, notification } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import handleApi from "../api/handleAPI";

const ToggleModalLevel = (props) => {
    const {
        visible, onClose,
        loadData, levelSelected
    } = props

    const user = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (levelSelected) {
            form.setFieldsValue(levelSelected);
        }
    }, [levelSelected]);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setIsLoading(true);
        const api = `/levels/${levelSelected ? `update/${levelSelected._id}` : "create"}`;
        try {
            const res = await handleApi(api, values, `${levelSelected ? "put" : "post"}`);
            if (res.data) {
                loadData();
                handleCancel();
                notification.success(levelSelected ?
                    {
                        message: "Update success",
                        description: "Cập nhập trình độ thánh công"
                    } : {
                        message: "Create success",
                        description: "Tạo trình độ thánh công"
                    });
            } else {
                notification.error({
                    message: "Create error",
                    description: JSON.stringify(res.message)
                });
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCancel = () => {
        form.resetFields();
        onClose();
    }
    return (<>
        <Modal
            closable={!isLoading}
            title={levelSelected ? "Update level" : "Create Level"}
            open={visible}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText={levelSelected ? "Update" : "CREATE"}
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

export default ToggleModalLevel;