import { NavLink } from "react-router";
import type { Post } from "../../types/post.d";

function RecommendationItem({ id, title, desc, thumbnail }: Post) {
  return (
    <li>
      <NavLink to={`/read/${id}`}>
        <div className="page__recommend-list">
          <img src={thumbnail} alt={title} className="page__recommend-img" />
          <div>
            <h4 className="page__recommend-subtitle">{title}</h4>
            <p className="page__recommend-desc">{desc}</p>
          </div>
        </div>
      </NavLink>
    </li>
  );
}

export default RecommendationItem;
