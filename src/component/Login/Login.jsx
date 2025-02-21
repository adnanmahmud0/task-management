import { FaGoogle } from 'react-icons/fa';
import taskManagement from '../../assets/logowhte.png';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Log the form data
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
              Seamless Login for Exclusive Access
            </h2>
            <p className="text-sm mt-6 text-white">
              Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.
            </p>
            <p className="text-sm mt-6 text-white">
              Do not have an account?
              <a href="#" className="text-white font-semibold underline ml-1">Register here</a>
            </p>
          </div>

          {/* Login Form */}
          <form
            className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full"
            onSubmit={handleSubmit(onSubmit)} // Handle form submission
          >
            <h3 className="text-3xl font-extrabold mb-12">Sign in</h3>

            {/* Email and Password Inputs */}
            <div className="space-y-3">
              <input
                {...register('email', { required: true })}
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
                placeholder="Email address"
              />
              <input
                {...register('password', { required: true })}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
                placeholder="Password"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-sm text-right">
              <a href="#" className="text-blue-600 font-semibold hover:underline">
                Forgot your password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
            >
              Log in
            </button>

            {/* Divider */}
            <p className="my-6 text-sm text-gray-400 text-center">or continue with</p>

            {/* Social Login Buttons */}
            <div className="space-x-6 flex justify-center">
              <button type="button" className="border-none outline-none text-red-500 hover:text-red-600 transition">
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
