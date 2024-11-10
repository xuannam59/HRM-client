import { DatePicker, Form, Input, InputNumber, Modal, notification, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import handleApi from "../api/handleAPI";
import { authSelector } from "../redux/reducers/authReducer";
import { generateString } from "../utils/generateString.util";

const ToggleModalRewardDiscipline = (props) => {
    const {
        visible, onClose, loadData, dataSelected
    } = props

    const user = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(false);
    const [teachers, setTeachers] = useState(undefined);
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataSelected) {
            const data = {
                ...dataSelected,
                employeeId: dataSelected.employeeId._id
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
        const api = `/reward-discipline/${dataSelected ? `update/${dataSelected._id}` : "create"}`;
        try {
            const res = await handleApi(api, values, `${dataSelected ? "patch" : "post"}`);
            if (res.data) {
                handleCancel();
                loadData();
                notification.success(dataSelected ? {
                    message: "Updata Susseccfully",
                    description: "Cập nhập thưởng/kỷ luật thành công"
                } : {
                    message: "Create Susseccfully",
                    description: "Tạo thưởng/kỷ luật thành công"
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

    const handleCancel = () => {
        form.resetFields();
        onClose();
    }
    return (<>
        <Modal
            closable={!isLoading}
            title={dataSelected ? "Cập nhập Thưởng & kỷ luật" : "Thêm Thưởng & kỷ luật"}
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
                initialValues={{
                    "_id": !dataSelected && generateString(25)
                }}
            >
                <div className="row">
                    <div className="col-6">
                        <Form.Item
                            name={"employeeId"}
                            label={"Giáo viên"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui không được để trống!"
                                }
                            ]}
                        >
                            <Select options={teachers} placeholder="Giáo viên" />
                        </Form.Item>
                    </div>
                    <div className="col-6">
                        <Form.Item
                            name={"types"}
                            label={"Loại"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui không được để trống!"
                                }
                            ]}
                        >

                            <Select options={[
                                { value: 'bonus', label: 'Khen thưởng' },
                                { value: 'punish', label: 'Kỷ luật' },
                            ]} placeholder="Loại" />
                        </Form.Item>
                    </div>

                </div>
                <Form.Item
                    name={"content"}
                    label={"Nội dung"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Input placeholder="Nội dung" />
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

export default ToggleModalRewardDiscipline;