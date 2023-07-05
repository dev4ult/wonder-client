import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';

import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import PostNewArticle from './pages/PostNewArticle';

import TravelSpots from './pages/TravelSpots';
import TravelSpotDetail from './pages/TravelSpotDetail';
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
          <Route path="/travelspots" element={<TravelSpots />} />
          <Route path="/travelspot_detail" element={<TravelSpotDetail />} />
          <Route path="/new_travelspot" element={<PostNewPlace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
