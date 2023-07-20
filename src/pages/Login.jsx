import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, setUserDetail, reset } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';
import InputGroup from '../components/InputGroup';

function Login() {
  const { user, isError, isSuccessfull, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  function handleChangeInput(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (user != null) {
      if (user.role == 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/travelspots');
      }
    }
  }, [user]);

  useEffect(() => {
    if (isSuccessfull && message != '') {
      toast.success(message);

      const { w_token_id: token_id, w_user_id: user_id } = user;
      dispatch(setUserDetail({ token_id, user_id }));

      dispatch(reset());
    }
  }, [isSuccessfull]);

  useEffect(() => {
    if (isError && message != '') {
      toast.error(message);

      dispatch(reset());
    }
  }, [isError]);

  const { email, password } = form;

  function handleAuthorization(e) {
    e.preventDefault();

    dispatch(login({ email, password }));
  }

  return (
    <>
      <Navbar />
      <form onSubmit={handleAuthorization} className="flex justify-center items-center mt-20 flex-col">
        <div className="p-7 border-2 rounded flex flex-col gap-5">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Login</h2>
            <p className="text-sm max-w-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, fugit.</p>
          </div>
          <InputGroup label="Email" name="email" type="email" placeholder="emailmu@example.com" onChange={handleChangeInput} value={email} required />
          <InputGroup label="Password" name="password" type="password" placeholder="passwordMu4213" onChange={handleChangeInput} value={password} required autoComplete="current-password" />
          <button type="submit" className="mt-3 rounded-full btn btn-primary w-full">
            Login
          </button>
        </div>
        <p className="mt-2">
          Belum memiliki akun?{' '}
          <Link to="/signup" className="text-blue-400">
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
}

export default Login;
