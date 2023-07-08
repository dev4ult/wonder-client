import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetail } from './features/auth/authSlice';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';

import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import PostNewArticle from './pages/PostNewArticle';

import TravelSpots from './pages/TravelSpots';
import TravelSpotDetail from './pages/TravelSpotDetail';
import PostNewTravelSpot from './pages/PostNewTravelSpot';

import ManageAdmin from './pages/ManageAdmin';

import Profile from './pages/Profile';
import NotFound404 from './pages/NotFound404';

import AsideNavbar from './components/navbar/AsideNavbar';

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logged = user != null;
  const adminLogged = (logged && user.role == 'admin') || user.role == 'superadmin';
  const superAdminLogged = logged && user.role == 'superadmin';

  useEffect(() => {
    if (logged) {
      const { w_token_id: token_id, w_user_id: user_id } = user;
      dispatch(setUserDetail({ token_id, user_id }));
    }
  }, []);

  return (
    <Router>
      <div className="container mx-auto font-poppins max-w-5xl px-4">
        {adminLogged && <AsideNavbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          {adminLogged && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/new_travelspot" element={<PostNewTravelSpot />} />
            </>
          )}
          {superAdminLogged && <Route path="/manage_admin" element={<ManageAdmin />} />}

          <Route path="/articles" element={<Articles />} />
          <Route path="/article_detail:id" element={<ArticleDetail />} />
          <Route path="/new_article" element={<PostNewArticle />} />
          <Route path="/travelspots" element={<TravelSpots />} />
          <Route path="/travelspot_detail/:id" element={<TravelSpotDetail />} />
          {logged && <Route path="/profile" element={<Profile />} />}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
