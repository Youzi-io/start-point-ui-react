import { LoginParams } from "@/types/auth";
import { Button, Form, Input } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values: LoginParams) => {
    console.log("Received values of form: ", values);
    navigate("/");
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<LoginParams>) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<LoginParams>
          label="账号"
          name="account"
          rules={[{ required: true, message: "Please input your account!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<LoginParams>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item<LoginParams>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
