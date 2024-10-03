import { DatePicker, Form, Input, Modal, notification, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import handleApi from "../api/handleAPI";

const AddDepartmentEmployee = (props) => {
    const {
        visible,
        loadData, departmentId, onClose
    } = props
    const [isLoading, setIsLoading] = useState(false);
    const [listEmployee, setListEmployee] = useState(undefined);
    const user = useSelector(authSelector);


    const [form] = Form.useForm();

    useEffect(() => {
        getListEmployee();
    }, []);

    const getListEmployee = async () => {
        const api = `/departments/detail-employee/list/employee`;
        try {
            const res = await handleApi(api);
            if (res.data) {
                const Employees = res.data.map((item) => {
                    return {
                        value: item._id,
                        label: item.fullName,
                    }
                });
                setListEmployee(Employees);
            }
        } catch (error) {
            console.log(error);
        }
    }


    const onFinish = async (values) => {
        setIsLoading(true);
        const api = `/departments/detail-employee/add`;
        try {
            const res = await handleApi(api, values, "post");
            if (res.data) {
                loadData();
                handleCancel();
                notification.success({
                    message: "Add success",
                    description: "Thêm nhân viên thánh công"
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
            title={"Add Employee"}
            open={visible}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText={"ADD"}
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
                    ["addedBy"]: user._id,
                    ["departmentId"]: departmentId
                }}
            >
                <Form.Item
                    name={"departmentId"}
                    label={"Mã phòng ban"}
                >

                    <Input disabled={true} />
                </Form.Item>
                <Form.Item
                    name={"employeeId"}
                    label={"Chọn nhân viên"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Select
                        options={listEmployee}
                    />
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
                            label={"Người thêm"}
                        >
                            <Input rows={4} disabled defaultValue={user.fullName} />
                        </Form.Item>
                        <Form.Item
                            style={{ display: "none" }}
                            name={"addedBy"}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col">
                        <Form.Item
                            label={"Ngày Thêm"}
                        >

                            <DatePicker format={"DD/MM/YYYY"} defaultValue={moment()} disabled />
                        </Form.Item>
                    </div>
                </div>

            </Form>
        </Modal>
    </>);
}

export default AddDepartmentEmployee;