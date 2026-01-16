import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import "./Editor.css";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/get-stringed-data";

export default function Editor({ initData, onSubmit }) {
  const [forms, setForms] = useState({
    createdDate: new Date(),
    emotionId: 0,
    content: "",
  });
  const navigate = useNavigate();

  // e.target 내용을 직접 설정할 수 있는지 모르고 강의 보기전에 만든 function
  const onChangeForms = (name, value) => {
    let nextValue = value;

    if (name === "createdDate") nextValue = new Date(value);

    setForms((prev) => {
      return { ...prev, [name]: nextValue };
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (forms.emotionId === 0) {
      alert("오늘의 감정을 선택해주세요.");
      return;
    } else if (forms.content.trim() === "") {
      alert("오늘의 일기를 작성해주세요.");
      return;
    }

    onSubmit(forms);
  };

  useEffect(() => {
    if (initData) {
      setForms({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  return (
    <div className="editor">
      <form onSubmit={onSubmitForm}>
        <section className="date_section">
          <h4>오늘의 날짜</h4>
          <input
            name="createdDate"
            type="date"
            value={getStringedDate(forms.createdDate)}
            onChange={(e) => onChangeForms("createdDate", e.target.value)}
          />
        </section>
        <section className="emotion_section">
          <h4>오늘의 감정</h4>
          <div className="emotion_list_wrapper">
            {emotionList.map((item) => (
              <EmotionItem
                key={item.emotionId}
                isSelected={item.emotionId === forms.emotionId}
                onClick={() => onChangeForms("emotionId", item.emotionId)}
                {...item}
              />
            ))}
          </div>
        </section>
        <section className="content_section">
          <h4>오늘의 일기</h4>
          <textarea
            name="content"
            placeholder="오늘은 어땠나요?"
            value={forms.content}
            onChange={(e) => onChangeForms("content", e.target.value)}
          ></textarea>
        </section>
        <section className="button_section">
          <Button type="button" onClick={() => navigate(-1)}>
            취소하기
          </Button>
          <Button variant={"positive"}>작성완료</Button>
        </section>
      </form>
    </div>
  );
}
