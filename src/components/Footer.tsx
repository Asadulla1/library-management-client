import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <div className="flex items-center">
            <img src={logo} alt="" className="w-[80px] mx-2 rounded-full" />
            <div className=" mx-5 text-left">
              <button className="btn btn-ghost text-xl">BookNest</button>
              <p className="text-sm text-gray-400">
                Your personal digital library
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} BookNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
