import { useContext, useState } from "react";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";
import Button from "./../components/Button";
import { DiaryStateContext } from "../App";
import { usePageTitle } from "../hooks/usePageTitle";

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0,
  ).getTime(); // 비교하기 위해 타임스탬프 형식으로 저장

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59,
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime,
  );
};

export default function Home() {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const monthlyData = getMonthlyData(pivotDate, data);

  usePageTitle("감정 일기장");

  const onChangeMonth = (offset) => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() + offset),
    );
  };

  return (
    <>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={() => onChangeMonth(-1)}>&#60;</Button>}
        rightChild={<Button onClick={() => onChangeMonth(1)}>&#62;</Button>}
      />
      <DiaryList data={monthlyData} />
    </>
  );
}
