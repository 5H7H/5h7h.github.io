// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import './common.css';
import './post_style.css';
import './App.css'; // 引入我们刚刚加入的列表样式
import BlogList from './components/BlogList';
import Post from './components/Post'; // 引入新的文章组件

function App() {
  return (
    // Router 提供路由环境
    <Router>
      <div className="App">
        {/* 导航栏放在最上面，它会在所有页面中一直显示 */}
        <NavBar />
        
        {/* Routes 里面定义了不同的网址对应显示什么内容 */}
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;