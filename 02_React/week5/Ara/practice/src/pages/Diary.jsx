import { useNavigate, useParams } from "react-router";
import { useDiary } from "../hooks/useDiary";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viwer";
import { getStringedDate } from "../util/get-stringed-data";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Diary() {
  const params = useParams();
  const currentDiaryItem = useDiary(params.id);
  const navigate = useNavigate();

  usePageTitle(`${params.id} 일기 - 감정 일기장`);

  if (!currentDiaryItem) return <div>로딩중 ...</div>;

  const title = getStringedDate(new Date(currentDiaryItem.createdDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={
          <Button onClick={() => navigate(-1)}>&#60; 뒤로 가기</Button>
        }
        rightChild={
          <Button onClick={() => navigate(`/edit/${params.id}`)}>
            수정하기
          </Button>
        }
      ></Header>
      <Viewer diary={currentDiaryItem} />
    </div>
  );
}
