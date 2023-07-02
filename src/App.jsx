import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Article from './pages/Article';
import ArticleDetail from './pages/ArticleDetail';
import Discover from './pages/Discover';
import DiscoverDetail from './pages/DiscoverDetail';
import Profile from './pages/Profile';
import NotFound404 from './pages/NotFound404';

function App() {
  return (
    <Router>
      <div className="container mx-auto font-poppins max-w-5xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/article" element={<Article />} />
          <Route path="/article_detail" element={<ArticleDetail />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/discover_detail" element={<DiscoverDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
