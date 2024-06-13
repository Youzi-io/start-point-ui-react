import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>仪表盘</div>
      <button onClick={() => navigate("/login")}>去登录</button>
    </>
  );
};

export default Dashboard;
