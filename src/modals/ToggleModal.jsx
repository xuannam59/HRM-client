import { Avatar, DatePicker, Form, Input, InputNumber, Modal, notification, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import handleApi from "../api/handleAPI";
import { uploadFile } from "../utils/uploadFile.util";
import { replaceName } from "../utils/replaceName.util";
import moment from 'moment';

const { TextArea } = Input;

const ToggleModal = (props) => {
    const { loadData,
        visible, onClose,
        employeeSelected
    } = props
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [preview, setPreview] = useState(undefined);
    const [form] = Form.useForm();

    useEffect(() => {
        if (employeeSelected) {
            employeeSelected.birthday = moment(employeeSelected.birthday);
            employeeSelected.createdAt = moment(employeeSelected.createdAt);
            employeeSelected.updatedAt = moment(employeeSelected.updatedAt);
            setPreview(employeeSelected.avatar);
            form.setFieldsValue(employeeSelected);
        }
    }, [employeeSelected]);
    const handleCancel = () => {
        form.resetFields();
        setSelectedFile(undefined);
        setPreview(undefined);
        onClose();
    }

    const onSelectFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setPreview(null);
            setSelectedFile(null);
            return;
        }

        const fileUpload = event.target.files[0];
        setSelectedFile(fileUpload);
        setPreview(URL.createObjectURL(fileUpload));
    }

    const onFinish = async (values) => {
        setIsLoading(true);
        const data = values;
        const api = `/employees/${employeeSelected ? `update/${employeeSelected._id}` : "create"}`;
        data.birthday = moment(data.birthday.$d).format();
        if (selectedFile && preview) {
            data.avatar = await uploadFile(selectedFile);
        }
        data.slug = replaceName(values.fullName);
        try {
            const res = await handleApi(api, data, `${employeeSelected ? "put" : "post"}`);
            if (res.data) {
                handleCancel();
                loadData();
                notification.success(employeeSelected ? {
                    message: "Updata Susseccfully",
                    description: "Cập nhập giáo viên thành công"
                } : {
                    message: "Create Susseccfully",
                    description: "Tạo giáo viên thành công"
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
    }
    return (
        <>
            <Modal
                closable={!isLoading}
                title={employeeSelected ? "Update Employee" : "Create Employee"}
                open={visible}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                okText={employeeSelected ? "UPDATE" : "CREATE"}
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
                    <div className="row">
                        <div className="col text-center">
                            <Avatar size={96} src={preview ? preview : ""} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <label htmlFor="uploadImage" style={{
                                width: "fit-content",
                                background: "#2cae6b",
                                color: "#fff",
                                padding: "6px 8px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                margin: "8px"
                            }}>Upload</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                name={"fullName"}
                                label="Họ tên"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập họ tên!"
                                    }
                                ]}
                            >
                                <Input placeholder="Full Name" />
                            </Form.Item>
                        </div>
                        <div className="col-3">
                            <Form.Item
                                name="birthday"
                                label="Ngày sinh"
                            >
                                <DatePicker
                                    format={"DD/MM/YYYY"} />
                            </Form.Item>
                        </div>
                        <div className="col-3">
                            <Form.Item
                                name={"gender"}
                                label="Giới tính"
                            >
                                <Select
                                    placeholder={"Giới tính"}
                                    options={[
                                        {
                                            value: 'Nam',
                                            label: 'Nam',
                                        },
                                        {
                                            value: 'Nữ',
                                            label: 'Nữ',
                                        },
                                        {
                                            value: 'Khác',
                                            label: 'Khác',
                                        },
                                    ]} />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3 pe-0">
                            <Form.Item
                                name={"passport"}
                                label="CCCD"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập căng cước công dân!"
                                    }
                                ]}
                            >

                                <Input placeholder="CCCD" />
                            </Form.Item>
                        </div>
                        <div className="col-4 pe-0">
                            <Form.Item
                                name={"phoneNumber"}
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập số điện thoại!"
                                    },
                                ]}
                            >
                                <Input
                                    addonBefore={"+84"}
                                    placeholder="Số điện thoại"
                                />
                            </Form.Item>
                        </div>
                        <div className="col-5">
                            <Form.Item
                                name={"email"}
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập email!"
                                    },
                                    {
                                        type: "email",
                                        message: "Email không đúng định dạng!"
                                    }
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Form.Item
                                name={"address"}
                                label="Địa chỉ"
                            >
                                <TextArea rows={4} placeholder="Địa chỉ" />
                            </Form.Item>
                        </div>
                        <div className="col">
                            <Form.Item
                                style={{ marginBottom: 0 }}
                                name={"y"}
                                label="Phòng ban"
                            >
                                <Select
                                    options={[
                                        {
                                            value: "a",
                                            label: "Kế toán"
                                        },
                                        {
                                            value: "vicedirector",
                                            label: "Lập trình"
                                        },
                                        {
                                            value: "employee",
                                            label: "Nhân sự"
                                        },
                                    ]}
                                    placeholder="Bộ phận"
                                />
                            </Form.Item>
                            <Form.Item
                                name={"x"}
                                label="Chức vụ"
                            >
                                <Select
                                    options={[
                                        {
                                            value: "director",
                                            label: "Giám đốc"
                                        },
                                        {
                                            value: "vicedirector",
                                            label: "Phó giám đốc"
                                        },
                                        {
                                            value: "employee",
                                            label: "nhân viên"
                                        },
                                    ]}
                                    placeholder="Chức vụ"
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item
                        name="status"
                        label="Trạng thái"
                    >
                        <Radio.Group optionType="button" buttonStyle="solid" value={"active"}>
                            <Radio value={"active"} >Làm việc</Radio>
                            <Radio value={"inactive"}>Nghỉ việc</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {employeeSelected &&
                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    name="createdAt"
                                    label="Khởi tạo"
                                >
                                    <DatePicker format={"DD/MM/YYYY"} disabled />
                                </Form.Item>
                            </div>
                            <div className="col">
                                <Form.Item
                                    name="updatedAt"
                                    label="Cập nhật"
                                >
                                    <DatePicker format={"DD/MM/YYYY"} disabled />
                                </Form.Item>
                            </div>
                            <div className="col">
                                <Form.Item
                                    name="createBy"
                                    label="Tạo bởi"
                                >
                                    <Input disabled />
                                </Form.Item>
                            </div>
                        </div>
                    }
                </Form>
                <input type="file" accept="image/*" id="uploadImage"
                    onChange={(event) => onSelectFile(event)}
                    onClick={(event) => event.target.value = null}
                    hidden
                />
            </Modal>
        </>
    );
}
export default ToggleModal;