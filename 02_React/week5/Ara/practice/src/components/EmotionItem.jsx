import "./EmotionItem.css";
import { getEmotionImage } from "./../util/get-image-emtion";

export default function EmotionItem({
  emotionId,
  emotionName,
  isSelected,
  onClick,
}) {
  return (
    <div
      className={`emotion_item ${isSelected && `emotion_item_on_${emotionId}`}`}
      onClick={() => onClick(emotionId)}
    >
      <img
        className="emotion_img"
        src={getEmotionImage(emotionId)}
        alt={`${emotionName} 이미지`}
      />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
}
