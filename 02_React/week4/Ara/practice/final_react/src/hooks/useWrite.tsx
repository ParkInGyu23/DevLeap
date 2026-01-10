import { useState, type ChangeEvent, type FormEvent } from "react";
import type { formPops } from "../types/post.d";
import { writeApi } from "../api/post";
import { useNavigate } from "react-router";
import axios from "axios";

export function useWrite() {
  const [forms, setForms] = useState<formPops>({
    title: "",
    category: "",
    username: "",
    thumbnail: "",
    desc: "",
  });

  const navigate = useNavigate();

  const encodeFileToBase64 = (image: File) => {
    return new Promise((resolve, reject) => {
      const render = new FileReader();
      render.readAsDataURL(image);
      render.onload = (event) => {
        const target = event.target as FileReader | null;
        if (target && target.result) {
          resolve(target.result);
        } else {
          reject(new Error("File reading failed"));
        }
      };
      render.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files && e.target.files[0]) || null;
    if (!file) return;
    const convertedFile = await encodeFileToBase64(file);
    setForms((prev) => ({
      ...prev,
      thumbnail: convertedFile as string,
    }));
  };

  const handleChangeInput =
    (name: string) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setForms((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    };

  const handleWrite = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      forms.title === "" ||
      forms.category === "" ||
      forms.username === "" ||
      forms.thumbnail === "" ||
      forms.desc === ""
    ) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    try {
      const { status } = await writeApi(forms);
      if (status === 201) {
        alert("글이 등록되었습니다.");
        navigate("/");
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

  return { forms, handleFileChange, handleChangeInput, handleWrite };
}
