import { DatePicker, Form, Input, Modal, notification, Select, TimePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import handleApi from "../api/handleAPI";
import { authSelector } from "../redux/reducers/authReducer";
import dayjs from "dayjs";

const ToggleModalSchedule = (props) => {
    const {
        visible, onClose,
        loadData, dataSelected
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
                startTime: dayjs(dataSelected.startTime),
                endTime: dayjs(dataSelected.endTime),
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
        const api = `/schedules/${dataSelected ? `update/${dataSelected._id}` : "create"}`;
        try {
            const res = await handleApi(api, values, `${dataSelected ? "patch" : "post"}`);
            if (res.data) {
                handleCancel();
                loadData();
                notification.success(dataSelected ? {
                    message: "Updata Susseccfully",
                    description: "Cập nhập lịch thành công"
                } : {
                    message: "Create Susseccfully",
                    description: "Tạo lịch thành công"
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
            title={dataSelected ? "Cập nhập lịch" : "Thêm lịch"}
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

                <div className="row">
                    <div className="col-6">
                        <Form.Item
                            name={"day"}
                            label={"Thứ"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui không được để trống!"
                                }
                            ]}
                        >

                            <Select options={[
                                { value: 'Thứ 2', label: 'Thứ 2' },
                                { value: 'Thứ 3', label: 'Thứ 3' },
                                { value: 'Thứ 4', label: 'Thứ 4' },
                                { value: 'Thứ 5', label: 'Thứ 5' },
                                { value: 'Thứ 6', label: 'Thứ 6' },
                                { value: 'Thứ 7', label: 'Thứ 7' },
                            ]} placeholder="Ngày dạy" />
                        </Form.Item>
                    </div>
                    <div className="col-6">
                        <Form.Item
                            name={"subject"}
                            label={"Môn dạy"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui không được để trống!"
                                }
                            ]}
                        >

                            <Input placeholder="Họ tên" />
                        </Form.Item>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <Form.Item
                            name={"startTime"}
                            label={"Giờ bắt đầu"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui không được để trống!"
                                }
                            ]}
                        >

                            <TimePicker
                                style={{
                                    width: '50%',
                                }}
                                placeholder="Giờ bắt đầu"
                            />
                        </Form.Item>
                    </div>
                    <div className="col-6">
                        <Form.Item
                            name={"endTime"}
                            label={"Giờ kết thúc"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui không được để trống!"
                                }
                            ]}
                        >

                            <TimePicker
                                style={{
                                    width: '50%',
                                }}
                                placeholder="Giờ kết thúc"
                            />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item
                    name={"room"}
                    label={"Phòng"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Select options={[
                        { value: '101', label: '101' },
                        { value: '102', label: '102' },
                        { value: '103', label: '103' },
                        { value: '201', label: '201' },
                        { value: '202', label: '202' },
                        { value: '203', label: '203' },
                    ]} placeholder="Phòng" />
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

export default ToggleModalSchedule;