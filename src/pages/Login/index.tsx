import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  console.log("登录页的组件");

  return (
    <>
      <div className="text-3xl font-bold">这是登录页</div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        去仪表盘
      </button>
    </>
  );
};

export default Login;
