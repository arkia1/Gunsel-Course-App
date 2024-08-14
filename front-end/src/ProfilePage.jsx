const ProfilePage = () => {
  return (
    <div className="w-full md:h-[150vh] h-[200vh] bg-white flex flex-col items-center">
      <div className=" w-[250px] h-[270px] bg-slate-200 rounded-[20px] mt-7 inline-flex flex-col  items-center">
        <div className="w-36 h-36 bg-white rounded-full mt-5 shadow-lg"></div>
        <h3 className="mt-3 text-lg font-semibold">Arkia</h3>
        <h3 className="mt-3 text-lg font-semibold text-slate-500">
          Role: Admin
        </h3>
      </div>
      <div className="w-[90%] min-[568px]:w-[500px] h-[35%] bg-slate-200 rounded-[20px] mt-10 flex flex-col shadow-lg">
        <h1 className="text-slate-500 font-semibold text-lg p-5">
          Profile Information:
        </h1>
        <hr className="bg-black border border-black min-w-full" />
      </div>
      <div className="w-[90%] min-[568px]:w-[500px] h-[35%] bg-slate-200 rounded-[20px] my-10 flex flex-col shadow-lg">
        <h1 className="text-slate-500 font-semibold text-lg p-5">
          Additional Information:
        </h1>
        <hr className="bg-black border border-black min-w-full" />
      </div>
    </div>
  );
};

export default ProfilePage;
