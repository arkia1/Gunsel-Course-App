import GnLogo from "../assets/gnlogo2.png";

const Accreditions = () => {
  return (
    <div className="w-full h-[30vh] bg-white flex flex-col justify-center items-center ">
      <div className="h-[200px] w-full bg-white relative flex flex-col items-center p-5">
        <h1 className="text-sm lg:text-2xl text text-slate-500">
          Offical learning platform of GUNSEL electric veicles
        </h1>
        <img
          src={GnLogo}
          alt=""
          className="w-[200px] h-[100px] relative top-[10px]"
        />
      </div>
    </div>
  );
};

export default Accreditions;
