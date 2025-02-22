import { useContext, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import taskManagement from '../../assets/taskManagement.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', error.message, 'error');
          });
      }
    });
  };

  const link = (
    <>
      {/* Add your navigation links here */}
    </>
  );

  return (
    <div className="">
      <div className="fixed top-0 left-0 w-full z-50 mt-5">
        <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50 max-w-7xl mx-auto rounded-full">
          <div className="flex flex-wrap items-center justify-between gap-5 w-full">
            <Link to="/" className="max-sm:hidden">
              <img src={taskManagement} alt="logo" className="w-15" />
            </Link>
            <Link to="/" className="hidden max-sm:block">
              <img src={taskManagement} alt="logo" className="w-10" />
            </Link>

            <div
              className={`${isMenuOpen ? 'block' : 'hidden'} max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto lg:block`}
            >
              <button
                onClick={handleToggle}
                className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
              >
                <FiX className="w-5 h-5 text-black" />
              </button>

              <ul className="lg:flex gap-x-5 max-lg:space-y-3">
                <li className="mb-6 hidden max-lg:block">
                  <Link to="/" className="hidden max-sm:block">
                    <img src={taskManagement} alt="logo" className="w-10" />
                  </Link>
                </li>
                {link}
              </ul>
            </div>

            {user ? (
              <div className='flex items-center space-x-4'>
                <button
                  tabIndex={0}
                  role="button"
                  aria-label="User Menu"
                  className="btn btn-circle avatar"
                >
                  <div className="rounded-full border-2 border-[#2D9BB8]">
                    <img
                      className='w-10 h-10 rounded-full object-cover'
                      alt={`${user.displayName}'s Profile`}
                      src={user.photoURL || 'https://picsum.photos/id/237/200/300'}
                    />
                  </div>
                </button>
                <button onClick={handleLogout} className="cursor-pointer px-4 py-2 text-sm rounded-full font-bold text-[#3086B3] border-2 border-[#3086B3] bg-transparent hover:bg-[#00EFC5] hover:text-white transition-all ease-in-out duration-300">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex max-lg:ml-auto space-x-4 items-center">
                <Link to="/login" className="px-4 py-2 text-sm rounded-full font-bold text-[#3086B3] border-2 border-[#3086B3] bg-transparent hover:bg-[#00EFC5] hover:text-white transition-all ease-in-out duration-300">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#3086B3] bg-[#3086B3] transition-all ease-in-out duration-300 hover:bg-[#00EFC5] hover:border-[#00EFC5]">
                  Register
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
