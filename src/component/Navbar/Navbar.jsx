import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import taskManagement from '../../assets/taskManagement.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="">
      <div className="fixed top-0 left-0 w-full z-50">
        <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50 max-w-7xl mx-auto rounded-full">
          <div className="flex flex-wrap items-center justify-between gap-5 w-full">
            {/* Logo for large screens */}
            <a href="#" className="max-sm:hidden">
              <img src={taskManagement} alt="logo" className="w-15" />
            </a>
            {/* Logo for small screens */}
            <a href="#" className="hidden max-sm:block">
              <img src={taskManagement} alt="logo" className="w-10" />
            </a>

            {/* Navbar Menu */}
            <div
              className={`${
                isMenuOpen ? 'block' : 'hidden'
              } max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto lg:block`}
            >
              {/* Close Button for Mobile */}
              <button
                onClick={handleToggle}
                className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
              >
                <FiX className="w-5 h-5 text-black" />
              </button>

              <ul className="lg:flex gap-x-5 max-lg:space-y-3">
                <li className="mb-6 hidden max-lg:block">
                  <a href="#">
                    <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
                  </a>
                </li>
                {['Home', 'Team', 'Feature', 'Blog', 'About', 'Contact'].map((item, index) => (
                  <li key={index} className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                    <a
                      href="#"
                      className={`hover:text-[#00EFC5] ${
                        item === 'Home' ? 'text-[#3086B3]' : 'text-gray-500'
                      } block font-semibold text-[15px] transition-colors duration-300`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons & Menu Toggle */}
            <div className="flex max-lg:ml-auto space-x-4 items-center">
              <Link to="/login" className="px-4 py-2 text-sm rounded-full font-bold text-[#3086B3] border-2 border-[#3086B3] bg-transparent hover:bg-[#00EFC5] hover:text-white transition-all ease-in-out duration-300">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#3086B3] bg-[#3086B3] transition-all ease-in-out duration-300 hover:bg-[#00EFC5] hover:border-[#00EFC5]">
                Register
              </Link>

              {/* Open Menu Button */}
              <button onClick={handleToggle} className="lg:hidden">
                <FiMenu className="w-7 h-7 text-[#3086B3]" />
              </button>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
