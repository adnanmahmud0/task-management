import { FaGoogle } from 'react-icons/fa';
import taskManagement from '../../assets/logowhte.png';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const { loginUser, signInWithGoogle } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const googleHandeler = () => {
    signInWithGoogle()
      .then(result => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in!',
        }).then(() => navigate('/'));
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message || 'Invalid email or password.',
        });
      });
  };

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in both email and password.',
      });
      return;
    }

    loginUser(data.email, data.password)
      .then(result => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in!',
        }).then(() => navigate('/'));
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message || 'Invalid email or password.',
        });
      });
  };

  return (
    <div className="font-[sans-serif] bg-gradient-to-r from-[#3086B3] via-[#0FF0C8] to-[#3086B3] text-gray-800">
      <div className="min-h-screen flex flex-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          {/* Left Section */}
          <div>
            <a href="#">
              <img
                src={taskManagement}
                alt="logo"
                className="lg:w-52 w-44 mb-12 inline-block"
              />
            </a>
            <h2 className="lg:text-4xl text-2xl font-extrabold lg:leading-[50px] text-white">
              Seamless Login for Task Management Access
            </h2>
            <p className="text-sm mt-6 text-white">
              Drag and drop your way to a more organized life. Use Task Management to keep track of all your tasks and projects in one place.
            </p>
            <p className="text-sm mt-6 text-white">
              Do not have an account?
              <Link to="/register" className="text-white font-semibold underline ml-1">Register here</Link>
            </p>
          </div>

          {/* Login Form */}
          <form
            className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-3xl font-extrabold mb-12">Sign in</h3>

            {/* Email and Password Inputs */}
            <div className="space-y-3">
              <input
                {...register('email', { required: true })}
                name="email"
                type="email"
                autoComplete="email"
                className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
                placeholder="Email address"
              />
              <input
                {...register('password', { required: true })}
                name="password"
                type="password"
                autoComplete="current-password"
                className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
                placeholder="Password"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-sm text-right">
              <a href="#" className="text-blue-600 font-semibold hover:underline">
                {/* Forgot your password? */}
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="cursor-pointer w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
            >
              Log in
            </button>

            {/* Divider */}
            <p className="my-6 text-sm text-gray-400 text-center">or continue with</p>

            {/* Social Login Buttons */}
            <div className="space-x-6 flex justify-center">
              <button onClick={googleHandeler} type="button" className="cursor-pointer border-none outline-none text-[#3086B3] hover:text-[#11EFC8] transition">
                <FaGoogle size={30} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
