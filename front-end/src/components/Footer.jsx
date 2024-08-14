const Footer = () => {
  return (
    <footer className=" text-white py-6 px-6 mt-6 relative w-full bottom-0 min-[1920px]:flex min-[1920px]:self-center min-[1920px]:bottom-[-450px] bg-[#628281]">
      <div className="container mx-auto flex justify-between items-center min-[1920px]:">
        <div className="min-[1920px]:relative left-1">
          <h3 className="text-xl font-bold">LearnApp</h3>
          <p className="text-sm">© 2024 LearnApp. All rights reserved.</p>
        </div>
        <div className="flex space-x-4 min-[1920px]:relative right-1">
          <a href="#" className="text-white hover:text-slate-500 relative">
            About
          </a>
          <a href="#" className="text-white hover:text-slate-500 relative">
            Contact
          </a>
          <a href="#" className="text-white hover:text-slate-500 relative">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
