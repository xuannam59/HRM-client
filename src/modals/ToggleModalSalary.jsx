import { DatePicker, Form, Input, InputNumber, Modal, notification, Radio, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import handleApi from "../api/handleAPI";
import { authSelector } from "../redux/reducers/authReducer";
import { generateString } from "../utils/generateString.util";
import dayjs from "dayjs";

const ToggleModalSalary = (props) => {
    const {
        visible, onClose, loadData,
        dataSelected
    } = props

    const user = useSelector(authSelector);
    const [teachers, setTeachers] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataSelected) {
            form.setFieldsValue(dataSelected);
        }
    }, [dataSelected]);


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
        const api = `/salaries/${dataSelected ? `update/${dataSelected._id}` : "create"}`;
        try {
            const res = await handleApi(api, values, `${dataSelected ? "patch" : "post"}`);
            if (res.data) {
                handleCancel();
                loadData();
                notification.success(dataSelected ? {
                    message: "Updata Susseccfully",
                    description: "Cập nhập lương thành công"
                } : {
                    message: "Create Susseccfully",
                    description: "Tạo lương thành công"
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
            title={dataSelected ? "Update lương" : "Create lương"}
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

                <Form.Item
                    name={"baseSalary"}
                    label={"Lương cơ sở"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <InputNumber
                        formatter={(value) => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/đ\s?|(,*)/g, '')}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={"salaryCoefficient"}
                    label={"hệ số lương"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }} />
                </Form.Item>
                <Form.Item
                    name={"allowance"}
                    label={"Phụ cấp"}
                >

                    <InputNumber
                        formatter={(value) => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/đ\s?|(,*)/g, '')}
                        style={{
                            width: '100%',
                        }} />
                </Form.Item>
                <Form.Item
                    name={"status"}
                    label={"Trạng thái"}
                >

                    <Radio.Group>
                        <Radio.Button value="active">Đã thanh toán</Radio.Button>
                        <Radio.Button value="inactive" >Chưa thanh toán</Radio.Button>
                    </Radio.Group>
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

export default ToggleModalSalary;