import { useContext } from "react";
import { useNavigate } from "react-router";
import { DiaryDispatchContext } from "../App";
import { usePageTitle } from "../hooks/usePageTitle";
import Editor from "../components/Editor";
import Header from "../components/Header";
import Button from "./../components/Button";

export default function New() {
  const { onCreate } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();

  usePageTitle("새 일기 쓰기 - 감정 일기장");

  const onSubmit = (forms) => {
    onCreate(forms.createdDate.getTime(), forms.emotionId, forms.content);
    navigate("/", { replace: true });
  };

  return (
    <>
      <Header
        title={"새 일기 쓰기"}
        leftChild={
          <Button onClick={() => navigate(-1)}>&#60; 뒤로 가기</Button>
        }
      />
      <Editor onSubmit={onSubmit} />
    </>
  );
}
