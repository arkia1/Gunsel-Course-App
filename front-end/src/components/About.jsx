import About_IMG from "../assets/about.webp";

const About = () => {
  return (
    <div className="w-full h-[60vh] bg-white flex md:flex-row min-[0px]:flex-col min-[0px]:overflow-y-auto scrollbar-none display-none">
      <div className="md:flex min-[0px]:self-center">
        <img
          src={About_IMG}
          alt="about section image"
          className="md:rounded-r-[20px] md:mr-[550px]"
        />
      </div>
      <div className="px-5 py-5 ">
        <h1 className="text-xl font-bold text-slate-700">About Us</h1>
        <p className="text-3xl font-bold text-slate-900 pt-5">
          Improve your skill set with our courses
        </p>
        <p className="text-lg text-slate-500 pt-7">
          Welcome to LearnApp, your go-to platform for enriching and flexible
          learning experiences! At LearnApp, we believe that education should be
          accessible, engaging, and tailored to fit your lifestyle. Our mission
          is to empower individuals from all walks of life to acquire new
          skills, advance their careers, and explore their passions through
          high-quality online courses.
        </p>
      </div>
    </div>
  );
};

export default About;
