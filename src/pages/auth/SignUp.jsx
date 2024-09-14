import { Button, Card, Form, Input, notification, Space, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import { registerAPI } from "../../api/handleAPI";

const { Title, Paragraph, Text } = Typography

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const HandleSignUp = async (values) => {
    setIsLoading(true);
    const res = await registerAPI(values.fullName, values.email, values.password, values.configPassword);
    if (res.data) {
      notification.success({
        message: "Register success",
        description: "Account created successfully"
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Register error",
        description: "Account created error"
      });
    }
    setIsLoading(false);
  }
  return (
    <>
      <Card style={{ minWidth: "500px" }}>
        <div className="text-center">
          <Title level={2}>Create an account</Title>
          <Paragraph type="secondary">
            Start your 30-day free trial.
          </Paragraph>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={HandleSignUp}
          size="large"
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Pleas input your full name",
              }
            ]}>
            <Input allowClear maxLength={100} placeholder="Full Name" />
          </Form.Item>
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
            <Input allowClear maxLength={100} type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Pleas input your password',
              },
            ]}>
            <Input.Password allowClear maxLength={100} placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Config Password"
            name="configPassword"
            rules={[
              {
                required: true,
                message: 'Pleas input your config password',
              },
            ]}>
            <Input.Password allowClear maxLength={100} placeholder="Config Password" />
          </Form.Item>
        </Form>
        <div className="mt-4 mb-3">
          <Button
            type="primary"
            onClick={() => form.submit()}
            style={{ width: "100%" }}
            size="large"
            loading={isLoading}
          >Get started</Button>
        </div>
        <SocialLogin />
        <div className="mt-4 text-center">
          <Space>
            <Text type="secondary">
              Already have an account?
            </Text>
            <Link to={"/login"}>Log in</Link>
          </Space>
        </div>
      </Card>
    </>
  );
}

export default SignUp;