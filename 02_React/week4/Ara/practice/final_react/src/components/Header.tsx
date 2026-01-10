import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Header() {
  const { user, handleLogout } = useAuth();

  return (
    <header className="page__header">
      <h1 className="page__logo">
        <NavLink to="./index.html" className="page__logo-link">
          SU
        </NavLink>
      </h1>
      <nav className="page__navigation">
        <ul className="page__nav-list">
          <li className="page__nav-item">
            <NavLink to="write" className="page__nav-link">
              글쓰기
            </NavLink>
          </li>
          <li className="page__nav-item">
            {!user ? (
              <NavLink to="/auth" className="page__nav-link">
                인증
              </NavLink>
            ) : (
              <button className="page__nav-link" onClick={handleLogout}>
                로그아웃
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
