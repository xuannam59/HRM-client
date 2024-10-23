import { DatePicker, Form, Input, Modal, notification, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { generateString } from "../utils/generateString.util";

const ToggleModalCollaborate = (props) => {
    const {
        visible, onClose,
        setDataSource, dataSource,
        dataSelected
    } = props

    const user = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (dataSelected) {
            dataSelected.time = moment(dataSelected.time)
            form.setFieldsValue(dataSelected);
        }
    }, [dataSelected]);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setIsLoading(true);
        // Push vào phần tử
        const data = dataSource;
        if (!dataSelected) {
            data.push({
                _id: values._id,
                fullName: values.fullName,
                unitName: values.unitName,
                time: moment(values.time).format("LL")
            })
            setDataSource(data);
        } else {
            const index = data.findIndex(item => item._id === dataSelected._id);
            data[index] = {
                _id: values._id,
                fullName: values.fullName,
                unitName: values.unitName,
                time: moment(values.time).format("LL")
            };

            setDataSource(data);
        }
        notification.success(dataSelected ? {
            message: "Update success",
            description: "Cập nhập công tác thánh công"
        } : {
            message: "Create success",
            description: "Thêm mới công tác thánh công"
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
                initialValues={{
                    "_id": !dataSelected && generateString(25)
                }}
            >
                <Form.Item
                    name={"_id"}
                    label={"Mã Công tác"}
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
                    label={"Nhân viên"}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >
                    <Select options={[
                        { value: generateString(25), label: 'Lê Văn A' },
                        { value: generateString(25), label: 'Nguyễn Văn B' },
                        { value: generateString(25), label: 'Nguyễn Hữu C' },
                        { value: generateString(25), label: 'Trần Thế D' },
                        { value: generateString(25), label: 'Quốc Bảo E' },
                        { value: generateString(25), label: 'Nguyễn Thị F' },
                    ]} placeholder="Nhân viên" />
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
                    name={"time"}
                    label={"Thời gian "}
                    rules={[
                        {
                            required: true,
                            message: "Vui không được để trống!"
                        }
                    ]}
                >

                    <DatePicker />
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