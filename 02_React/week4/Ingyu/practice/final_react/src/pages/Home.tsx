import PostArea from "../components/home/PostArea";
import SearchArea from "../components/home/SearchArea";

export default function Home() {
  return (
    <main className="page__main">
      <SearchArea />
      <PostArea />
    </main>
  )
}