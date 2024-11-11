import { DatePicker, Form, Input, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import handleApi from "../api/handleAPI";
import moment from 'moment';
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import dayjs from "dayjs";


const UserModal = (props) => {
    const { loadData,
        visible, onClose,
        userSelected
    } = props
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [preview, setPreview] = useState(undefined);
    const [employees, setEmployees] = useState(undefined);
    const [form] = Form.useForm();

    const user = useSelector(authSelector);

    useEffect(() => {
        if (userSelected) {
            userSelected.birthday = dayjs(userSelected.birthday);
            setPreview(userSelected.avatar);
            form.setFieldsValue(userSelected);
        }
    }, [userSelected]);

    useEffect(() => {
        getAllEmployees();
    }, []);

    const handleCancel = () => {
        form.resetFields();
        setSelectedFile(undefined);
        setPreview(undefined);
        onClose();
    }

    const getAllEmployees = async () => {
        const apiEmployees = `/auth/not-account`;
        try {
            const resEmployees = await handleApi(apiEmployees);
            if (resEmployees.data) {
                const data = resEmployees.data.map(item => {
                    return {
                        value: item._id,
                        label: item.fullName
                    }
                });
                setEmployees(data);
            }
        } catch (error) {
            console.log(error)
        }
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
        const api = `/auth/${userSelected ? `update/${userSelected._id}` : "register"}`;
        try {
            const res = await handleApi(api, values, `${userSelected ? "patch" : "post"}`);
            if (res.data) {
                handleCancel();
                loadData();
                notification.success(userSelected ? {
                    message: "Updata Susseccfully",
                    description: "Cập nhập người dùng thành công"
                } : {
                    message: "Create Susseccfully",
                    description: "Tạo người dùng thành công"
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
                title={userSelected ? "Cập nhập tài khoản" : "Tạo tài khoản"}
                open={visible}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                okText={userSelected ? "UPDATE" : "CREATE"}
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
                    <Form.Item
                        name={"employeeId"}
                        label="Nhân viên"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập Nhân viên!"
                            }
                        ]}
                    >
                        <Select
                            placeholder={"Nhân viên"}
                            options={employees}
                        />
                    </Form.Item>
                    <div className="row">
                        <div className="col-9">
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
                                <Input placeholder="Email" disabled={userSelected ? true : false} />
                            </Form.Item>
                        </div>
                        <div className="col-3">
                            <Form.Item
                                name={"role"}
                                label="Vai tò"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập role!"
                                    }
                                ]}
                            >
                                <Select
                                    placeholder={"Vai trò"}
                                    options={[
                                        {
                                            value: 'admin',
                                            label: 'admin',
                                        },
                                        {
                                            value: 'accountant',
                                            label: 'accountant',
                                        },
                                        {
                                            value: 'user',
                                            label: 'user',
                                        },
                                    ]} />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                name={"password"}
                                label="Mật khẩu"
                                rules={!userSelected ? [
                                    {
                                        required: true,
                                        message: "Vui lòng nhập Password!"
                                    }
                                ] : []}
                            >
                                <Input.Password placeholder="password" />
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                name={"confirmPassword"}
                                label="Xác thực mật khẩu"
                                rules={!userSelected ? [
                                    {
                                        required: true,
                                        message: "Vui lòng nhập Password!"
                                    }
                                ] : []}
                            >
                                <Input.Password placeholder="confirmPassword" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            {userSelected ?
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
                                label={userSelected ? "Ngày cập nhập" : "Ngày tạo"}
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
export default UserModal;