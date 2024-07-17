import { LoginParams } from "@/types/auth";
import { Button, Card, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import MSIcon from "@/components/MSIcon";
import { useEffect, useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { getValidateCodeApi, loginApi } from "@/api/auth";
import { md5 } from "js-md5";
import { useUserStore } from "@/stores";

const Login = () => {
  return (
    <div className={`${styles["login"]}`}>
      <div className={`${styles["g-bg"]}`}>
        <div
          className={`${styles["g-polygon"]} ${styles["g-polygon-1"]}`}
        ></div>
        <div
          className={`${styles["g-polygon"]} ${styles["g-polygon-2"]}`}
        ></div>
        <div
          className={`${styles["g-polygon"]} ${styles["g-polygon-3"]}`}
        ></div>
      </div>
      <FormCard />
    </div>
  );
};

const FormCard = () => {
  const navigate = useNavigate();
  const [imgCode, setImgCode] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [codeKey, setCodeKey] = useState<string>("");
  const { setToken } = useUserStore();

  const onFinish = async (values: LoginParams) => {
    const { account, password, captcha } = values;
    const params = {
      account,
      password: md5(password).toUpperCase(),
      captcha,
      codeKey,
    };
    const loginResult = await loginApi(params);
    if (loginResult.code === 200) {
      setToken(loginResult.data.token);
      navigate("/");
    } else {
      getValidateCode();
    }
  };

  const getValidateCode = async () => {
    const result = await getValidateCodeApi();
    if (result.code === 200) {
      setImgCode(result.data.codeValue);
      setCodeKey(result.data.codeKey);
    }
  };

  const rememberChange = (e: CheckboxChangeEvent) => {
    setRemember(e.target.checked);
  };

  useEffect(() => {
    getValidateCode();
  }, []);

  return (
    <div className={`${styles["form-card"]}`}>
      <Card style={{ width: 400 }}>
        <div className="text-[30px] font-medium">登录到</div>
        <div className="text-[30px] mt-[7px]">Start Point</div>
        <Form
          name="basic"
          style={{ margin: "25px 0 20px" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<LoginParams>
            name="account"
            rules={[{ required: true, message: "请输入账号！" }]}
          >
            <Input
              size="large"
              prefix={
                <MSIcon
                  name="Monitor"
                  style={{
                    fontSize: 15,
                  }}
                />
              }
            />
          </Form.Item>

          <Form.Item<LoginParams>
            name="password"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input.Password
              size="large"
              prefix={
                <MSIcon
                  name="Lock"
                  style={{
                    fontSize: 15,
                  }}
                />
              }
            />
          </Form.Item>

          <Form.Item<LoginParams>
            name="captcha"
            rules={[{ required: true, message: "请输入验证码！" }]}
          >
            <Input
              size="large"
              prefix={
                <MSIcon
                  name="Key"
                  style={{
                    fontSize: 15,
                  }}
                />
              }
              addonAfter={
                <img
                  className="cursor-pointer w-[100%] h-[100%]"
                  src={imgCode}
                  onClick={getValidateCode}
                  alt="加载失败。"
                />
              }
              className={`${styles["captcha-input"]}`}
            />
          </Form.Item>

          <Form.Item name="remember">
            <Checkbox checked={remember} onChange={rememberChange}>
              记住密码
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
