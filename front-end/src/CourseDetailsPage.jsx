import { useState, useEffect } from "react";
import CourseDetailsPageHeader from "./components/CourseDetailsPageHeader";
import { useParams } from "react-router-dom";
import Delete_Icon from "./assets/deleteIcon.svg";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/course/${id}`);
      const data = await response.json();
      console.log("Course Data:", data);
      if (data.isSuccessful) {
        setCourse(data.data);
      } else {
        console.error("Error fetching course data:", data);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/course/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          students: [studentId], // Include the student ID in the request body
        }),
      });

      const data = await response.json();
      console.log("Delete Response:", data);

      if (data.isSuccessful) {
        // Refresh course details after deletion
        fetchCourseDetails();
      } else {
        console.error("Error deleting student from course:", data);
      }
    } catch (error) {
      console.error("Error deleting student from course:", error);
    }
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center">
      <CourseDetailsPageHeader />
      <div className="w-[360px] h-auto min-h-[200px] bg-slate-300 rounded-[20px] flex flex-col items-between mt-6 p-6">
        {course?.students?.map((student) => (
          <div key={student.id} className="grid grid-cols-2 grid-rows-1">
            <ul>
              <li className="col-start-1 col-end-1">
                <span className="mr-6">
                  <span className="font-bold">Name: </span>
                  {student.name}
                </span>
              </li>
            </ul>
            <button
              onClick={() => handleDeleteStudent(student.id)}
              className="ml-[100px] border bg-[#889fa5] rounded-[10px] w-[35px] h-[35px] inline-flex justify-center items-center hover:scale-110 duration-300 col-start-2 col-end-2"
            >
              <img
                src={Delete_Icon}
                alt="delete"
                className="w-[25px] h-[25px] inline-flex"
              />
            </button>
            <hr className="w-[300px] border border-black my-2 col-start-1 col-end-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetailsPage;
