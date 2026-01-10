import { Link } from "react-router";
import type { Post } from "../../types/post.d";
import { format } from "date-fns";

function PostItem({
  id,
  title,
  category,
  desc,
  thumbnail,
  username,
  regdate,
}: Post) {
  return (
    <article className="posts-area__post">
      <Link to={`/read/${id}`} className="posts-area__post-link">
        <img src={thumbnail} alt={title} className="posts-area__post-image" />
        <em className="posts-area__post-tag">{category}</em>
        <h2 className="posts-area__post-title">{title}</h2>
        <p className="posts-area__post-meta">
          {username} • {format(regdate, "MMM dd, yyyy")}
        </p>
        <p className="posts-area__post-excerpt">{desc}</p>
      </Link>
    </article>
  );
}

export default PostItem;
