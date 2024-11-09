import { DatePicker, Form, Input, Modal, notification, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import handleApi from "../api/handleAPI";
import { authSelector } from "../redux/reducers/authReducer";
import { generateString } from "../utils/generateString.util";

const ToggleModalCollaborate = (props) => {
    const {
        visible, onClose,
        setDataSource, dataSource, loadData,
        dataSelected
    } = props

    const user = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(false);
    const [teachers, setTeachers] = useState(undefined);
    const [form] = Form.useForm();


    useEffect(() => {
        if (dataSelected) {
            const data = {
                ...dataSelected,
                employeeId: dataSelected.employeeId._id,
            }
            form.setFieldsValue(data);
        }
    }, [dataSelected]);



    useEffect(() => {
        getTeachers();
    }, []);

    const getTeachers = async () => {
        const apiTeachers = `/schedules/teachers`;
        try {
            const resTeachers = await handleApi(apiTeachers);
            if (resTeachers.data) {
                const data = resTeachers.data.map(item => {
                    return {
                        value: item._id,
                        label: item.fullName
                    }
                });
                setTeachers(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onFinish = async (values) => {
        setIsLoading(true);
        const api = `/collaborates/${dataSelected ? `update/${dataSelected._id}` : "create"}`;
        try {
            const res = await handleApi(api, values, `${dataSelected ? "patch" : "post"}`);
            if (res.data) {
                handleCancel();
                loadData();
                notification.success(dataSelected ? {
                    message: "Updata Susseccfully",
                    description: "Cập nhập công tác thành công"
                } : {
                    message: "Create Susseccfully",
                    description: "Tạo công tác thành công"
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
            handleCancel();
        }
    }

    const handleCancel = () => {
        form.resetFields();
        onClose();
    }
    return (<>
        <Modal
            closable={!isLoading}
            title={dataSelected ? "Update Collaborate" : "Create Collaborate"}
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
                    name={"employeeId"}
                    label={"Nhân viên"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >
                    <Select options={teachers} placeholder="Nhân viên" />
                </Form.Item>
                <Form.Item
                    name={"unitName"}
                    label={"Tên Đơn vị"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >
                    <Input placeholder="Tên Đơn vị" />
                </Form.Item>
                <Form.Item
                    name={"date"}
                    label={"Thời gian "}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Select options={[
                        { value: "3 tháng", label: '3 tháng' },
                        { value: "6 tháng", label: '6 tháng' },
                        { value: "9 tháng", label: '9 tháng' },
                        { value: "12 tháng", label: '12 tháng' }
                    ]} placeholder="Thời gian" />
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

export default ToggleModalCollaborate;