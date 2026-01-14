import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
  const { id } = useParams();
  const nav = useNavigate();
  usePageTitle(`${id}번 일기`);
  const currentDiaryItem = useDiary(id);
  if (!currentDiaryItem) {
    return <div>데이터 로딩중 ...</div>;
  }

  const { createdDate, emotionId, content } = currentDiaryItem;
  const title = getStringedDate(new Date(createdDate));
  return (
    <div>
      <Header
        leftChild={<Button onClick={() => nav(-1)} text="< 뒤로 가기" />}
        title={`${title} 기록`}
        rightChild={
          <Button onClick={() => nav(`/edit/${id}`)} text="수정하기" />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
