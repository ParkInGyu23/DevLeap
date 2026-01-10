import { useNavigate } from "react-router";
import { deleteApi } from "../api/post";
import axios from "axios";

export function useRead(id: string | undefined) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!id) {
      console.error("ID가 없어 삭제할 수 없습니다.");
      return;
    }

    try {
      const { status } = await deleteApi(id);
      if (status === 204) {
        alert("삭제되었습니다.");
        navigate("/");
      } else {
        throw new Error("삭제에 실패했습니다.");
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

  return { handleDelete };
}
