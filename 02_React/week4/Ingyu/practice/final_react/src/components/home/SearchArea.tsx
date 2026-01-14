import { useNavigate, useSearchParams } from "react-router"
import { search  } from "../../assets/images/images"
import { useEffect, useRef, useState } from "react";

export default function SearchArea() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const debounceTimer = useRef<null | number>(null);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      navigate(query ? '?q=' + query : '/');
    }, 300);
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [navigate, query])
  return (
    <section className="search-area">
          <article className="search-area__search">
            <h2 className="search-area__title">The Ingyu Blog</h2>
            <p className="search-area__description">
              A Blog About Food, Experience, and Recipes.
            </p>
            <form method="get" className="search-area__form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="q"
                placeholder="Search"
                className="search-area__input"
                autoComplete="off"
                value={query}
                onChange={handleChange}
              />
              <button type="submit" className="search-area__submit">
                <img
                  src={search}
                  alt="search-icon"
                  className="search-area__icon"
                />
              </button>
            </form>
          </article>
        </section>
  )
}