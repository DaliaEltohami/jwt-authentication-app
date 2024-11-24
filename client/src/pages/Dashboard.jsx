import { Avatar, Button, Card, Flex, Spin, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {userData ? (
        <Card className="profile-card">
          <Flex vertical gap="small" align="center">
            <Avatar
              size={150}
              icon={<UserOutlined />}
              className="avatar"
            ></Avatar>
            <Typography.Title level={2} strong className="user-name">
              {userData?.name}
            </Typography.Title>
            <Typography.Text type="secondary" strong>
              Email: {userData?.email}
            </Typography.Text>
            <Typography.Text type="secondary">
              Role: {userData?.role}
            </Typography.Text>
            <Button
              type="primary"
              className="profile-btn"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Flex>
        </Card>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default Dashboard;
