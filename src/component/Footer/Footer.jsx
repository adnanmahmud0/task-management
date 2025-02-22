import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import taskManagement from '../../assets/logowhte.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#3086B3] via-[#00EFC5] to-[#3086B3] py-10 px-10 font-sans tracking-wide">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-wrap items-center md:justify-between max-md:flex-col gap-6">
          {/* Logo */}
          <div>
            <a href="#">
              <img
                src={taskManagement}
                alt="logo"
                className="w-36"
              />
            </a>
          </div>

          {/* Navigation Links */}
          {/* <ul className="flex items-center justify-center flex-wrap gap-y-2 md:justify-end space-x-6">
            {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-white hover:underline text-base transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul> */}
        </div>

        {/* Divider */}
        <hr className="my-6 border-white opacity-30" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center text-white text-base">
            © 2025 adnanmahmud99. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-[#00EFC5] transition-colors duration-300">
              <FiFacebook size={24} />
            </a>
            <a href="#" className="text-white hover:text-[#00EFC5] transition-colors duration-300">
              <FiTwitter size={24} />
            </a>
            <a href="#" className="text-white hover:text-[#00EFC5] transition-colors duration-300">
              <FiInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
