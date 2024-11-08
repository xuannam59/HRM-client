import { DatePicker, Form, Input, Modal, notification, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import handleApi from "../api/handleAPI";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";

const ToggleModalApplication = (props) => {
    const {
        visible, onClose,
        loadData, dataSelected
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
        const api = `/applications/${dataSelected ? `update/${dataSelected._id}` : "create"}`;
        try {
            const res = await handleApi(api, values, `${dataSelected ? "patch" : "post"}`);
            if (res.data) {
                handleCancel();
                loadData();
                notification.success(dataSelected ? {
                    message: "Updata Susseccfully",
                    description: "Cập nhập đơn ứng tuyển thành công"
                } : {
                    message: "Create Susseccfully",
                    description: "Tạo đơn ứng tuyển thành công"
                });
            } else {
                notification.error({
                    message: "Error",
                    description: res.message
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
        handleCancel()
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
            >
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

                    <Input placeholder="Họ tên" disabled={dataSelected ? true : false} />
                </Form.Item>
                <Form.Item
                    name={"email"}
                    label={"Email"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        },
                        {
                            type: "email",
                            message: "Email không đúng định dạng!"
                        }
                    ]}
                >

                    <Input placeholder="Email" disabled={dataSelected ? true : false} />
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

                    <Input placeholder="Số điện thoại" disabled={dataSelected ? true : false} />
                </Form.Item>
                <div className="row">
                    <div className="col-6">
                        <Form.Item
                            name={"position"}
                            label={"Vị trí tuyển dụng"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui không được để trống!"
                                }
                            ]}
                        >

                            <Select options={[
                                { label: 'Vị trí tuyển dụng', disabled: true },
                                { value: 'Giáo viên', label: 'Giáo viên' },
                                { value: 'Kế Toán', label: 'Kế Toán' },
                            ]} placeholder="Vị trí tuyển dụng" disabled={dataSelected ? true : false} />
                        </Form.Item>
                    </div>
                    <div className="col-6">
                        <Form.Item
                            name={"status"}
                            label={"Trạng thái"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui không được để trống!"
                                }
                            ]}
                        >
                            <Select options={[
                                { label: 'Trạng thái', disabled: true },
                                { value: 'PENDING', label: 'PENDING' },
                                { value: 'REVIEWING', label: 'REVIEWING' },
                                { value: 'APPROVED', label: 'APPROVED' },
                                { value: 'REJECTED', label: 'REJECTED' },
                            ]} placeholder="Vị trí tuyển dụng" />

                        </Form.Item>
                    </div>
                </div>
                <Form.Item
                    name={"address"}
                    label={"Địa chỉ"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Input placeholder="Địa chỉ" />
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