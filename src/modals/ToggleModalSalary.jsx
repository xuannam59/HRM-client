import { DatePicker, Form, Input, InputNumber, Modal, notification, Radio, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { generateString } from "../utils/generateString.util";

const ToggleModalSalary = (props) => {
    const {
        visible, onClose,
        setDataSource, dataSource,
        dataSelected
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
        // Push vào phần tử
        const data = dataSource;
        if (!dataSelected) {
            if (!values.allowance)
                values.allowance = 0
            if (!values.advance)
                values.advance = 0
            data.push({
                ...values,
                date: new Date()
            })
            setDataSource(data);
        } else {
            const index = data.findIndex(item => item._id === dataSelected._id);
            data[index] = values;

            setDataSource(data);
        }
        notification.success(dataSelected ? {
            message: "Update success",
            description: "Cập nhập lương thánh công"
        } : {
            message: "Create success",
            description: "Thêm mới lương thánh công"
        })
        handleCancel();
        setIsLoading(false);
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
                initialValues={{
                    "_id": !dataSelected && generateString(25)
                }}
            >
                <Form.Item
                    name={"_id"}
                    label={"Mã lương"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <Input disabled={true} />
                </Form.Item>
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

                    <Select options={[
                        { value: 'Lê Văn E', label: 'Lê Văn E' },
                        { value: 'Nam Lê', label: 'Nam Lê' },
                        { value: 'Lê Văn B', label: 'Lê Văn B' },
                        { value: 'Lê Văn A', label: 'Lê Văn A' },
                    ]} placeholder="Nhân viên" />
                </Form.Item>

                <div className="row">
                    <div className="col-6">
                        <Form.Item
                            name={"wage"}
                            label={"Lương theo tháng"}
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
                    </div>
                    <div className="col-6">
                        <Form.Item
                            name={"workDay"}
                            label={"Ngày công"}
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
                                }} />
                        </Form.Item>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
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
                    </div>
                    <div className="col-6">
                        <Form.Item
                            name={"advance"}
                            label={"Tạm ứng"}
                        >

                            <InputNumber
                                formatter={(value) => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/đ\s?|(,*)/g, '')}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item
                    name={"status"}
                    label={"Tạm ứng"}
                >

                    <Radio.Group>
                        <Radio.Button value="paid">Đã thanh toán</Radio.Button>
                        <Radio.Button value="" >Chưa thanh toán</Radio.Button>
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