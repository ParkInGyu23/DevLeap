import { useParams } from "react-router";
import { usePost } from "../../hooks/usePost";
import type { Post } from "../../types/post.d";
import { format } from "date-fns";
import { useRead } from "../../hooks/useRead";
import { useAuthStore } from "../../stores/useAuthStore";

function ReadArea() {
  const params = useParams();
  const { data, error, isLoading } = usePost<Post>(
    `/posts/${params.id}`,
    {} as Post
  );
  const { title, category, author, username, thumbnail, desc, regdate } = data;
  const { handleDelete } = useRead(params.id);
  const user = useAuthStore((store) => store.user);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <article className="page__read">
      <section>
        <strong className="page__read-tag">{category}</strong>
        <h2 className="page__read-title">{title}</h2>
        <div className="page__read-meta-group">
          <p className="page__read-profile">
            {username} • {format(regdate, "MMM dd, yyyy")}
          </p>
          {user?.email === author && (
            <button className="page__read-btn" onClick={handleDelete}>
              삭제
            </button>
          )}
        </div>
        <img src={thumbnail} alt={title} className="page__read-image" />
      </section>
      <section className="page__read-desc">
        <pre>{desc}</pre>
      </section>
    </article>
  );
}

export default ReadArea;
