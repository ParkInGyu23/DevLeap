import { getEmotionImage } from "./../util/get-image-emtion";
import Button from "./Button";
import "./DiaryItem.css";
import { useNavigate } from "react-router";

export default function DiaryItem({ id, emotionId, createdDate, content }) {
  const navigate = useNavigate();

  return (
    <div className="diary_item">
      <div
        className={`img_section img_section_${emotionId}`}
        onClick={() => navigate(`/diary/${id}`)}
      >
        <img src={getEmotionImage(emotionId)} alt="" />
      </div>
      <div className="info_section" onClick={() => navigate(`/diary/${id}`)}>
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button onClick={() => navigate(`/edit/${id}`)}>수정하기</Button>
      </div>
    </div>
  );
}
