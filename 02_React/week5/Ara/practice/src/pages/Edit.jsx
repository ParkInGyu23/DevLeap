import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { useDiary } from "../hooks/useDiary";
import { DiaryDispatchContext } from "../App";
import Header from "../components/Header";
import Editor from "../components/Editor";
import Button from "../components/Button";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Edit() {
  const params = useParams();
  const currentDiaryItem = useDiary(params.id);
  const navigate = useNavigate();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  usePageTitle(`${params.id} 일기 수정 - 감정 일기장`);

  const handleDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(params.id);
      navigate("/", { replace: true });
    }
  };

  const onSubmit = (forms) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        params.id,
        forms.createdDate.getTime(),
        forms.emotionId,
        forms.content
      );
      alert("일기가 수정되었습니다.");
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={
          <Button onClick={() => navigate(-1)}>&#60; 뒤로 가기</Button>
        }
        rightChild={
          <Button variant={"negative"} onClick={handleDelete}>
            삭제하기
          </Button>
        }
      ></Header>
      <Editor initData={currentDiaryItem} onSubmit={onSubmit} />
    </div>
  );
}
