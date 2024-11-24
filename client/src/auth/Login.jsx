import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import loginAvatar from "../assets/loginAvatar.png";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { loading, error, loginUser } = useLogin();
  const handleLogin = async (values) => {
    await loginUser(values);
  };
  return (
    <div>
      <Card className="form-container">
        <Flex gap="large">
          {/* Image */}
          <Flex flex={1}>
            <img
              src={loginAvatar}
              alt="Register Avatar"
              className="register-avatar"
            />
          </Flex>

          {/* Form */}
          <Flex vertical flex={1} justify="center">
            <Typography.Title level={3} strong className="title">
              Sign in
            </Typography.Title>
            <Typography.Text type="secondary" strong className="slogan">
              Unlock Your World
            </Typography.Text>
            <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please Input Your Email!" },
                  { type: "email", message: "This in not a Valid Email!" },
                ]}
              >
                <Input placeholder="Enter Your Email" size="large" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please Input Your Password!" },
                ]}
              >
                <Input.Password
                  placeholder="Enter Your Password"
                  size="large"
                />
              </Form.Item>
              {error && (
                <Alert
                  description={error}
                  type="error"
                  showIcon
                  closable
                  className="error-alert"
                ></Alert>
              )}
              <Form.Item>
                <Button
                  type={`${loading ? "" : "primary"}`}
                  disabled={loading}
                  size="large"
                  className="btn"
                  htmlType="submit"
                >
                  {loading ? <Spin /> : "Sign in"}
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="/register">
                  <Button size="large" className="btn">
                    Create an account
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default Login;
