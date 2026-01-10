import { useNavigate } from "react-router";
import { search } from "../../assets/images/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

function SearchArea() {
  const navigator = useNavigate();
  const [query, setQuery] = useState("");
  const debounceTimer = useRef<number | null>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      navigator(query ? "?q=" + query : "/");
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, navigator]);

  return (
    <section className="search-area">
      <article className="search-area__search">
        <h2 className="search-area__title">The Sucoding Blog</h2>
        <p className="search-area__description">
          A Blog About Food, Experience, and Recipes.
        </p>
        <form
          method="get"
          className="search-area__form"
          onSubmit={(e) => e.preventDefault()}
        >
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
            <img src={search} alt="search-icon" className="search-area__icon" />
          </button>
        </form>
      </article>
    </section>
  );
}

export default SearchArea;
