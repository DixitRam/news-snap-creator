
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
          src="/logo.png"
            alt="Girnar Sandesh Logo" 
            className="h-12 w-12 rounded-full object-cover border-2 border-white"
          />
          <div>
            <h1 className="text-2xl font-bold">Girnar Sandesh</h1>
            <p className="text-sm">News Template Generator</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:underline">
                  Templates
                </Link>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;
