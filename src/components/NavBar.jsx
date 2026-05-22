// src/components/NavBar.jsx
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        {/* 在 React 路由中，使用 Link 代替 a 标签，这样点击就不会刷新整个页面了 */}
        <Link to="/">5H7H's Blog</Link>
      </div>
      <div className="nav-about">
        <Link to="/about">about</Link>
      </div>
    </nav>
  );
}

export default NavBar;