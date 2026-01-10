import { useParams } from "react-router";
import { usePost } from "../../hooks/usePost";
import RecommendationItem from "./RecommendationItem";
import type { Post } from "../../types/post.d";

function RecommedationArea() {
  const params = useParams();
  const { data, error, isLoading } = usePost<Post[]>(
    `/posts/${params.id}/related`,
    []
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <article className="page__recommend">
      <h3 className="page__recommend-title">Recommend Reading</h3>
      <ul className="page__recommend-lists">
        {data &&
          data.map((post) => <RecommendationItem key={post.id} {...post} />)}
      </ul>
    </article>
  );
}

export default RecommedationArea;
