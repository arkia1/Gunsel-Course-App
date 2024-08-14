import Arrow_Down from "../assets/arrowDown.svg";
import { Link } from "react-scroll";

const ClassDetailsPageHeader = () => {
  return (
    <div className="w-full h-[33vh] md:h-[30vh] bg-[#628281] flex justify-center gap-0 min-[1920px]:h-[16vh] mt-10 md:mt-0">
      <div className="flex flex-col items-center relative">
        <h1 className="text-4xl font-bold text-white text-center pt-5">
          Course Student list
        </h1>
        <h1 className="text-2xl font-semibold text-white text-center pt-8">
          You can find a list of students enrolled in this Course
        </h1>
        <button>
          <Link to="CourseContent" smooth={true} offset={-35} duration={300}>
            <img
              src={Arrow_Down}
              alt="Arrow-Down "
              className="w-[48px] h-[48px] mt-2 "
            />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ClassDetailsPageHeader;
