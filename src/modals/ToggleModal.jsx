import { Avatar, DatePicker, Form, Input, InputNumber, Modal, notification, Radio, Select, Space } from "antd";
import { useEffect, useState } from "react";
import handleApi from "../api/handleAPI";
import { uploadFile } from "../utils/uploadFile.util";
import { replaceName } from "../utils/replaceName.util";
import moment from 'moment';
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";

const { TextArea } = Input;

const ToggleModal = (props) => {
    const { loadData,
        visible, onClose,
        employeeSelected
    } = props
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [preview, setPreview] = useState(undefined);
    const [positions, setPositions] = useState(undefined);
    const [levels, setLevels] = useState(undefined);
    const [specialize, setSpecialize] = useState(undefined);
    const [department, setDepartment] = useState(undefined);
    const [form] = Form.useForm();

    const user = useSelector(authSelector);

    useEffect(() => {
        if (employeeSelected) {
            employeeSelected.birthday = moment(employeeSelected.birthday);
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
        if (typeof values.schedule === "object") {
            values.schedule = values.schedule.join(",");
        }
        const data = values;
        const api = `/employees/${employeeSelected ? `update/${employeeSelected._id}` : "create"}`;
        data.birthday = moment(data.birthday).format();
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
                    description: "Cập nhập nhân viên thành công"
                } : {
                    message: "Create Susseccfully",
                    description: "Tạo nhân viên thành công"
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
        setIsLoading(false);
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
                        <div className="col pe-0">
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
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                name={"position"}
                                label="Vị trí"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng không để trống"
                                    },
                                ]}
                            >
                                <Input placeholder="Vị trí" />
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                name={"address"}
                                label="Địa chỉ"
                            >
                                <Input placeholder="Địa chỉ" rows={4} />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item
                        name="status"
                        label="Trạng thái"
                    >
                        <Radio.Group optionType="button" buttonStyle="solid" value={"active"}>
                            <Radio value={"active"} >Làm việc</Radio>
                            <Radio value={"inactive"}>Đang sử lý</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <div className="row">
                        <div className="col-5">
                            {employeeSelected ?
                                <Form.Item
                                    label="Cập nhập bởi"
                                >
                                    <Input disabled defaultValue={user.fullName} />
                                </Form.Item>
                                :
                                <Form.Item
                                    label="Tạo bởi"
                                >
                                    <Input disabled defaultValue={user.fullName} />
                                </Form.Item>
                            }
                        </div>
                        <div className="col">
                            <Form.Item
                                label={employeeSelected ? "Ngày cập nhập" : "Ngày tạo"}
                            >
                                <DatePicker format={"DD/MM/YYYY"} disabled defaultValue={moment()} />
                            </Form.Item>
                        </div>
                    </div>
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