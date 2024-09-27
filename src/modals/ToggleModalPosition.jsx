import { DatePicker, Form, Input, InputNumber, Modal, notification } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import handleApi from "../api/handleAPI";

const ToggleModalPosition = (props) => {
    const {
        visible,
        loadData, positionSelected, onClose
    } = props
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector(authSelector);

    const [form] = Form.useForm();
    useEffect(() => {
        if (positionSelected) {
            form.setFieldsValue(positionSelected);
        }
    }, [positionSelected]);

    const onFinish = async (values) => {
        setIsLoading(true);
        const api = `/positions/${positionSelected ? `update/${positionSelected._id}` : "create"}`;
        try {
            const res = await handleApi(api, values, `${positionSelected ? "put" : "post"}`);
            if (res.data) {
                loadData();
                handleCancel();
                notification.success(positionSelected ?
                    {
                        message: "Update success",
                        description: "Cập nhập chức vụ thánh công"
                    } : {
                        message: "Create success",
                        description: "Tạo chức vụ thánh công"
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
            title={positionSelected ? "Update position" : "Create position"}
            open={visible}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText={positionSelected ? "UPDATE" : "CREATE"}
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
                <div className="row">
                    <div className="col">
                        <Form.Item
                            name={"title"}
                            label={"Tên chức vụ"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui không được để trống!"
                                }
                            ]}
                        >

                            <Input placeholder="Tên chức vụ" />
                        </Form.Item>
                    </div>
                    <div className="col">
                        <Form.Item
                            name={"salary"}
                            label={"Lương ngày"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui không được để trống!"
                                }
                            ]}
                        >

                            <InputNumber placeholder="Lương" style={{ width: "100%" }} />
                        </Form.Item>
                    </div>
                </div>
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
                            label={positionSelected ? "Ngày sửa" : "Ngày tạo"}
                        >

                            <DatePicker format={"DD/MM/YYYY"} defaultValue={moment()} disabled />
                        </Form.Item>
                    </div>
                </div>

            </Form>
        </Modal>
    </>);
}

export default ToggleModalPosition;