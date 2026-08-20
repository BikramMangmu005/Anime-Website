import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between mx-10 mt-5 absolute top-0 left-0 right-0 z-50 bg-transparent text-white">
      <h1 className="text-xl font-semibold tracking-wide font-serif text-white/90">
        SnapStory
      </h1>

      <nav className="hidden md:flex items-center space-x-10 text-sm font-medium text-white/70">
        <a
          href="#discover"
          className="hover:text-white transition-colors duration-200"
        >
          Discover
        </a>
        <a
          href="#styles"
          className="hover:text-white transition-colors duration-200"
        >
          Styles
        </a>
        <a
          href="#contacts"
          className="hover:text-white transition-colors duration-200"
        >
          Contacts
        </a>

        <Link
          to="/login"
          className="hover:text-white transition-colors duration-200"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
