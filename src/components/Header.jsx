import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import bnbLogo from "../assets/BnB_logo.png";

const Header = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div>Loding...</div>;

  return (
    <header className="sticky top-0 bg-white shadow-sm flex justify-between items-center px-8 py-4">
      <h1 className="text-2xl font-bold text-blue-700 flex gap-2 justify-start items-center">
        <img src={bnbLogo} alt="Bits & Breakpoints" className="w-6 h-6" />
        Bits & Breakpoints
      </h1>
      <div className="flex items-center gap-4">
        <p className="font-medium">
          {user.firstName} {user.lastName}
        </p>
        <img
          src="https://api.dicebear.com/9.x/thumbs/svg?seed=Admin&scale=90&backgroundColor=FF7700,FFBB44&backgroundType=gradientLinear&eyes=variant4W12&faceOffsetX=0,0&shapeColor=0055FF"
          alt="avatar"
          className="w-10 h-10 rounded-full border-2 border-blue-500"
        />
      </div>
    </header>
  );
};

export default Header;
