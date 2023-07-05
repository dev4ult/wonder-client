import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import InputGroup from '../components/InputGroup';

function Registration() {
  return (
    <div>
      <Navbar />
      <form action="" method="post" className="flex justify-center items-center mt-14 flex-col">
        <div className="p-7 border-2 rounded flex flex-col gap-5">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Registrasi</h2>
            <p className="text-sm max-w-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, fugit.</p>
          </div>
          <InputGroup label="Username" name="username" placeholder="username_anda231" />
          <InputGroup label="Email" name="email" type="email" placeholder="email_anda@example.com" />
          <InputGroup label="Password" name="password" type="password" placeholder="****************" />
          <button type="submit" className="mt-3 rounded-full btn btn-primary w-full">
            Submit
          </button>
        </div>
        <p className="mt-2">
          Sudah memiliki akun?{' '}
          <Link to="/auth" className="text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Registration;
