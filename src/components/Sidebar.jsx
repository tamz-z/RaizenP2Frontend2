import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import PropTypes from "prop-types";



const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  return (
    <div className="h-screen w-20 md:w-60 border-r border-gray-300 bg-white flex flex-col py-8 px-2 md:px-6 sticky top-0">
      <div className="mb-10 flex justify-center md:justify-start">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Raizen
        </Link>
      </div>
      <nav className="flex flex-col gap-6 flex-grow">
        <Link
          to="/"
          className="text-gray-700 hover:text-gray-900 text-center md:text-left"
        >
          Home
        </Link>
        <Link
          to="/profile"
          className="text-gray-700 hover:text-gray-900 text-center md:text-left"
        >
          Profile
        </Link>
        <Link
          to="/search"
          className="text-gray-700 hover:text-gray-900 text-center md:text-left"
        >
          Search
        </Link>
        <Link
          to="/settings"
          className="text-gray-700 hover:text-gray-900 text-center md:text-left"
        >
          Settings
        </Link>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center justify-center md:justify-start gap-2 text-red-600 hover:text-red-800 focus:outline-none"
      >
        <BiLogOut size={24} />
        <span className="hidden md:inline">Logout</span>
      </button>
    </div>
  );
};

Sidebar.propTypes = {
  onLogout: PropTypes.func,
};

export default Sidebar;
