import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ArticleList from './pages/ArticleList';
import Article from './pages/Article';
import Profile from './pages/Profile';
import NotFound404 from './pages/NotFound404';

function App() {
  return (
    <Router>
      <div className="container mx-auto font-poppins">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/article_list" element={<ArticleList />} />
          <Route path="/article" element={<Article />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
