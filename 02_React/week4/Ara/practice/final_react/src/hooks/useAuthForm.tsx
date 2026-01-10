import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import type { AuthPage, formPops } from "../types/auth.d";
import { loginApi, signupAPI } from "../api/auth";
import { useAuthStore } from "../stores/useAuthStore";

export function useAuthForm() {
  const [activePage, setActivePage] = useState<AuthPage>("login");
  const [forms, setForms] = useState<formPops>({
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
  });
  const Navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handlePageChange = (page: AuthPage) => {
    setActivePage(page);
    setForms({
      email: "",
      password: "",
      name: "",
      passwordConfirm: "",
    });
  };

  const handleChangeInput =
    (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForms((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      forms.email === "" ||
      forms.password === "" ||
      forms.name === "" ||
      forms.passwordConfirm === ""
    ) {
      alert("모든 항목을 입력해 주세요.");
      return;
    } else if (forms.password !== forms.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { data } = await signupAPI(forms);
      if (data) {
        alert("회원가입을 완료했습니다. \n로그인 후 이용해주세요.");
        setForms({
          email: "",
          password: "",
          name: "",
          passwordConfirm: "",
        });
        setActivePage("login");
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

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (forms.email === "" || forms.password === "") {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    try {
      const { data } = await loginApi({
        email: forms.email,
        password: forms.password,
      });
      if (data) {
        setAuth(data.user, data.accessToken);
        Navigate("/");
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

  return {
    activePage,
    forms,
    handlePageChange,
    handleChangeInput,
    handleSignup,
    handleLogin,
  };
}
