import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

function Registration() {
  return (
    <div>
      <Navbar />
      <form action="" method="post" className="flex justify-center items-center mt-14 flex-col">
        <div className="p-7 border-2 rounded flex flex-col gap-3">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Registrasi</h2>
            <p className="text-sm max-w-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, fugit.</p>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Username</span>
            </label>
            <input type="text" placeholder="yourusername" className="input input-bordered" />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input type="email" placeholder="youremail@example.com" className="input input-bordered" />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input type="password" placeholder="XXXXXXXXXXXX" className="input input-bordered" />
          </div>
          <button type="submit" className="mt-3 rounded btn btn-primary w-full">
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
