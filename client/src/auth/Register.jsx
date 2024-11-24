import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import registerAvatar from "../assets/registerAvatar.png";
import { useSignup } from "../hooks/useSignup";

const Register = () => {
  const { error, loading, registerUser } = useSignup();
  const handleRegister = async (values) => {
    console.log("submited Form Values: ", values);
    await registerUser(values);
  };
  return (
    <div>
      <Card className="form-container">
        <Flex gap="large">
          {/* Form */}
          <Flex vertical flex={1} justify="center">
            <Typography.Title level={3} strong className="title">
              Create an Account
            </Typography.Title>
            <Typography.Text type="secondary" strong className="slogan">
              Join for Execlusive Access
            </Typography.Text>
            <Form
              layout="vertical"
              onFinish={handleRegister}
              autoComplete="off"
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: "Please Input Your Full Name!" },
                ]}
              >
                <Input placeholder="Enter Your Full Name" size="large" />
              </Form.Item>
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
              <Form.Item
                label="Confirm Password"
                name="passwordConfirm"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Confirm Password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Re-enter Your Password"
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
                  {loading ? <Spin /> : "Create Account"}
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="/login">
                  <Button size="large" className="btn">
                    Sign in
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Flex>

          {/* Image */}
          <Flex flex={1}>
            <img
              src={registerAvatar}
              alt="Register Avatar"
              className="register-avatar"
            />
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default Register;
