
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://instagram.fjga1-1.fna.fbcdn.net/v/t51.2885-19/403908255_1677328472793460_3179481571731453175_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fjga1-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QHOXjOM5N0ksqePGC4OzpMZdz4X2p8qPU6ncYdt-OXY-6oZQO9vvnOEYsflMfmpJ4NzpSd9ytZhWs4gPSSOuMs7&_nc_gid=dF1ffrwOHYCMsdHYAEBFag&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfLyk0ytsD3sifFOGnsCZTf6EaURrDgVSVELxldQjbFLWA&oe=6829FC0D&_nc_sid=8b3546" 
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
          <Button variant="outline" className="bg-white text-red-700">
            Help
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
