import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';

import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import PostNewArticle from './pages/PostNewArticle';

import Places from './pages/Places';
import PlaceDetail from './pages/PlaceDetail';
import PostNewPlace from './pages/PostNewPlace';

import Profile from './pages/Profile';
import NotFound404 from './pages/NotFound404';

import AsideNavbar from './components/AsideNavbar';

function App() {
  return (
    <Router>
      <div className="container mx-auto font-poppins max-w-5xl px-4">
        <AsideNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article_detail" element={<ArticleDetail />} />
          <Route path="/new_article" element={<PostNewArticle />} />
          <Route path="/places" element={<Places />} />
          <Route path="/place_detail" element={<PlaceDetail />} />
          <Route path="/new_place" element={<PostNewPlace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
