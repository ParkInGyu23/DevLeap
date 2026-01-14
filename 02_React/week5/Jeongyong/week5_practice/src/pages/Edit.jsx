import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const { id } = useParams();
  const currentDiaryItem = useDiary(id);
  usePageTitle(`${id}번 일기 수정`);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?"))
      onUpdate(id, input.createdDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        leftChild={<Button onClick={() => nav(-1)} text="< 뒤로가기" />}
        title="일기 수정하기"
        rightChild={
          <Button onClick={onClickDelete} text="삭제하기" type="Negative" />
        }
      />
      <Editor onSubmit={onSubmit} initData={currentDiaryItem} />
    </div>
  );
};

export default Edit;
