import axios from "axios";
import { logoutApi } from "../api/auth";
import { useAuthStore } from "../stores/useAuthStore";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const unsetAuth = useAuthStore((state) => state.unsetAuth);

  const handleLogout = async () => {
    try {
      const { status } = await logoutApi();
      if (status === 200) {
        unsetAuth();
      } else {
        throw new Error("로그아웃에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // axios 자체에서 발생한 오류 처리
        const msg = error.response?.data?.message ?? error.message;
        alert(msg);
      } else if (error instanceof Error) {
        // 기본 오류 처리
        alert(error.message);
      } else {
        // 그외 오류 처리
        alert("알 수 없는 이유로 실패했습니다.");
      }
    }
  };

  return { user, handleLogout };
}
