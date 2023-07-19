import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { reset, register } from '../features/auth/authSlice';

import Navbar from '../components/navbar/Navbar';
import InputGroup from '../components/InputGroup';

function Registration() {
  const { user, message, isSuccessfull, isError, errorMessages } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

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

      navigate('/auth');
    }
  }, [isSuccessfull, message]);

  useEffect(() => {
    if (isError && errorMessages.length != 0) {
      errorMessages.forEach((message) => toast.error(message));
    }
  }, [isError, errorMessages]);

  function onInputChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onRegistSubmit(e) {
    e.preventDefault();

    dispatch(register(form));
    dispatch(reset());
  }

  const { username, email, password } = form;

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mt-14 flex-col">
        <form onSubmit={onRegistSubmit} className="p-7 border-2 rounded flex flex-col gap-5">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Registrasi</h2>
            <p className="text-sm max-w-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, fugit.</p>
          </div>
          <InputGroup label="Username" name="username" onChange={onInputChange} value={username} placeholder="usernamemu231" required />
          <InputGroup label="Email" name="email" type="email" onChange={onInputChange} value={email} placeholder="emailmu@example.com" required />
          <InputGroup label="Password" name="password" type="password" onChange={onInputChange} value={password} placeholder="passwordMu4213" required autoComplete="current-password" />
          <button type="submit" className="mt-3 rounded-full btn btn-primary w-full">
            Submit
          </button>
        </form>
        <p className="mt-2">
          Sudah memiliki akun?{' '}
          <Link to="/auth" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
