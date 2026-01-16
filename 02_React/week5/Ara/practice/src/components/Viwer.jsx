import { emotionList } from "../util/constants";
import { getEmotionImage } from "../util/get-image-emtion";
import "./Viewer.css";

export default function Viewer({ diary }) {
  const emotionItem = emotionList.find(
    (item) => item.emotionId === diary.emotionId
  );

  return (
    <div className="viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div
          className={`emotion_img_wrapper emotion_img_wrapper_${diary.emotionId}`}
        >
          <img src={getEmotionImage(diary.emotionId)} alt="" />
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{diary.content}</p>
        </div>
      </section>
    </div>
  );
}
