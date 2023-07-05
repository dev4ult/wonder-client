import { Link } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';
import InputGroup from '../components/InputGroup';

function Login() {
  return (
    <>
      <Navbar />
      <form action="" method="post" className="flex justify-center items-center mt-20 flex-col">
        <div className="p-7 border-2 rounded flex flex-col gap-5">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Login</h2>
            <p className="text-sm max-w-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, fugit.</p>
          </div>
          <InputGroup label="Email" name="email" type="email" placeholder="email_anda@example.com" />
          <InputGroup label="Password" name="password" type="password" placeholder="****************" />
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
