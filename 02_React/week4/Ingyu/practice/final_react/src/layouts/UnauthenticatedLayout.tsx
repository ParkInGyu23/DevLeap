import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect } from "react";

export default function UnauthenticatedLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  // 이미 로그인된 유저는 auth 화면을 볼 필요가 없으니 차단
  if (user) return null;

  return <Outlet />;
}