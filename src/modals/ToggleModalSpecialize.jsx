import { DatePicker, Form, Input, InputNumber, Modal, notification } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import handleApi from "../api/handleAPI";

const ToggleModalSpecialize = (props) => {
    const {
        visible,
        loadData, specializeSelected, onClose
    } = props
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector(authSelector);

    const [form] = Form.useForm();
    useEffect(() => {
        if (specializeSelected) {
            form.setFieldsValue(specializeSelected);
        }
    }, [specializeSelected]);

    const onFinish = async (values) => {
        setIsLoading(true);
        const api = `/specializes/${specializeSelected ? `update/${specializeSelected._id}` : "create"}`;
        try {
            const res = await handleApi(api, values, `${specializeSelected ? "put" : "post"}`);
            if (res.data) {
                loadData();
                handleCancel();
                notification.success(specializeSelected ?
                    {
                        message: "Update success",
                        description: "Cập nhập chuyên môn thánh công"
                    } : {
                        message: "Create success",
                        description: "Tạo chuyên môn thánh công"
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
        form.resetFields("");
        onClose();
    }
    return (<>
        <Modal
            closable={!isLoading}
            title={specializeSelected ? "Update specialize" : "Create specialize"}
            open={visible}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText={specializeSelected ? "UPDATE" : "CREATE"}
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
                    ["createdBy"]: user._id
                }}
            >
                <Form.Item
                    name={"title"}
                    label={"Tên chuyên môn"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Input placeholder="Tên chuyên môn" />
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
                            name={"createdBy"}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col">
                        <Form.Item
                            label={specializeSelected ? "Ngày cập nhập" : "Ngày tạo"}
                        >

                            <DatePicker format={"DD/MM/YYYY"} defaultValue={moment()} disabled />
                        </Form.Item>
                    </div>
                </div>

            </Form>
        </Modal>
    </>);
}

export default ToggleModalSpecialize;