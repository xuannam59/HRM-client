import { Button, Card, Checkbox, Form, Input, message, notification, Space, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import { loginAPI } from "../../api/handleAPI";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";


const { Title, Paragraph, Text } = Typography

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const HandleLogin = async (values) => {
        setIsLoading(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            localStorage.setItem("authData", JSON.stringify(res.data));
            dispatch(addAuth(res.data));
            message.success("Login Success");
        } else {
            notification.error({
                message: "Error",
                description: JSON.stringify(res.message)
            })
        }
        setIsLoading(false);
    }
    return (
        <>
            <Card style={{ minWidth: "500px" }}>
                <div className="text-center">
                    <Title level={2}>Login in to your account</Title>
                    <Paragraph type="secondary">
                        welcome back! please enter your detail.
                    </Paragraph>
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={HandleLogin}
                    size="large"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Pleas input your email",
                            },
                            {
                                type: "email",
                                message: "The input is not valid Email!",
                            }
                        ]}>
                        <Input allowClear maxLength={100} type="email" placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Pleas input your password',
                            },
                        ]}
                    >
                        <Input.Password allowClear maxLength={100} placeholder="Enter password" />
                    </Form.Item>
                    <div className="row">
                        <div className="col">
                            <Checkbox
                                checked={isRemember}
                                onChange={(e) => setIsRemember(e.target.checked)}
                            >Remember for 30 days</Checkbox>
                        </div>
                        <div className="col text-end" >
                            <Link to={"/"}>Forgot password</Link>
                        </div>
                    </div>
                </Form>
                <div className="mt-4 mb-3">
                    <Button
                        type="primary"
                        onClick={() => form.submit()}
                        style={{ width: "100%" }}
                        size="large"
                        loading={isLoading}
                    >Sign in</Button>
                </div>
                <SocialLogin />
                <div className="mt-4 text-center">
                    <Space>
                        <Text type="secondary">
                            Don’t have an account?
                        </Text>
                        <Link to={"/sign-up"}>Sign up</Link>
                    </Space>
                </div>
            </Card>
        </>
    );
}

export default Login;