import { useSearchParams } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import PostItem from "./PostItem";

export default function PostArea() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const { data, error, isLoading } = useAxios<Post[]>(
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
