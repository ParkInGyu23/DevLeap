import { useSearchParams } from "react-router";
import { usePost } from "../../hooks/usePost";
import type { Post } from "../../types/post.d";
import PostItem from "./PostItem";

function PostArea() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const { data, error, isLoading } = usePost<Post[]>(
    q ? "/posts/search?title=" + q : "/posts",
    []
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="posts-area">
      {data && data.map((post) => <PostItem key={post.id} {...post} />)}
    </section>
  );
}

export default PostArea;
