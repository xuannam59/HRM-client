import { Avatar, Form, Input, Modal, notification, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import handleApi from "../api/handleAPI";
import { uploadFile } from "../utils/uploadFile";
import { replaceName } from "../utils/replaceName";


const ToggleModal = (props) => {
    const { loadData,
        visible, onClose,
        teacherSelected
    } = props
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [preview, setPreview] = useState(undefined);
    const [form] = Form.useForm();

    useEffect(() => {
        if (teacherSelected) {
            setPreview(teacherSelected.avatar);
            form.setFieldsValue(teacherSelected);
        }
    }, [teacherSelected]);
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
        const api = `/teachers/${teacherSelected ? `update/${teacherSelected._id}` : "create"}`;

        if (selectedFile && preview) {
            data.avatar = await uploadFile(selectedFile);
        }
        data.slug = replaceName(values.fullName);
        try {
            const res = await handleApi(api, data, `${teacherSelected ? "put" : "post"}`);
            if (res.data) {
                handleCancel();
                loadData();
                notification.success(teacherSelected ? {
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
                title={teacherSelected ? "Update Teacher" : "Create Teacher"}
                open={visible}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                okText={teacherSelected ? "UPDATE" : "CREATE"}
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

                    <div className="row">
                        <div className="col-6">
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
                        <div className="col-3">
                            <Form.Item
                                name={"gender"}
                                label="Giới tính"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn giới tính!"
                                    }
                                ]}
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
                        <div className="col-3">
                            <Form.Item
                                name={"class"}
                                label="Chủ nhiệm"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập lớp"
                                    }
                                ]}
                            >
                                <Select
                                    placeholder={"Lớp"}
                                    options={[
                                        {
                                            value: '6A',
                                            label: 'Lớp 6A'
                                        },
                                        {
                                            value: '6B',
                                            label: 'Lớp 6B'
                                        },
                                        {
                                            value: '6C',
                                            label: 'Lớp 6C'
                                        },
                                    ]} />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Form.Item
                                name={"password"}
                                label="Mật khẩu"
                                rules={[
                                    (teacherSelected ? {} :
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mật khẩu"
                                        }
                                    )
                                ]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>
                        </div>
                        <div className="col">
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
                                <Input placeholder="Số điện thoại" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                name={"subject"}
                                label="Chuyên môn"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn Môn dạy"
                                    }
                                ]}
                            >
                                <Select
                                    placeholder={"Lớp"}
                                    options={[
                                        {
                                            value: 'Toán',
                                            label: 'Toán'
                                        },
                                        {
                                            value: 'Văn',
                                            label: 'Văn'
                                        },
                                        {
                                            value: 'Anh',
                                            label: 'Anh'
                                        },
                                    ]} />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item
                        name="status"
                        label="Trạng thái"
                    >
                        <Radio.Group optionType="button" buttonStyle="solid" value={"active"}>
                            <Radio value={"active"} >Đang công tác</Radio>
                            <Radio value={"inactive"}>Ngừng công tác</Radio>
                        </Radio.Group>
                    </Form.Item>
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