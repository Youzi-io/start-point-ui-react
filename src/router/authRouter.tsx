import { useUserStore } from "@/stores";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AuthRouter = ({ children }: Props) => {
  const navigator = useNavigate();
  const { getToken } = useUserStore();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigator("/login");
    }
  }, [getToken, navigator]);
  return <>{children}</>;
};

export default AuthRouter;
