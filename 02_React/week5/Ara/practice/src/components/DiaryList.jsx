import { useState } from "react";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";
import { useNavigate } from "react-router";

export default function DiaryList({ data }) {
  const [sortType, setSortType] = useState("latest");
  const navigate = useNavigate();

  const handleChangeSort = (e) => {
    setSortType(e.target.value);
  };

  const getSortedDate = () => {
    return data.toSorted((a, b) => {
      if (sortType === "oldest")
        return Number(a.createdDate) - Number(b.createdDate);
      else return Number(b.createdDate) - Number(a.createdDate);
    });
  };

  const sortedData = getSortedDate();

  return (
    <div className="diary_list">
      <div className="menu_bar">
        <select onChange={handleChangeSort}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
        <Button variant={"positive"} onClick={() => navigate("/new")}>
          새로운 일기 쓰기
        </Button>
      </div>
      <div className="listWrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
