import React, { useState, useEffect } from "react";
import StudentDetailsPageHeader from "./components/StudentDetailPageHeader";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom

const StudentDetailsPage = () => {
  const { id } = useParams(); // Access the student ID from URL parameters
  const [student, setStudent] = useState([]);

  useEffect(() => {
    // Fetch data using the dynamic ID from URL
    fetch(`http://localhost:3000/api/student/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Student Data:", data);
        if (data.isSuccessful) {
          setStudent(data.data);
          console.log("test", student.name);
        } else {
          console.error("Error fetching student data:", data);
        }
      })
      .catch((error) => console.error("Error fetching student data:", error));
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center overflow-hidden">
      <StudentDetailsPageHeader />
      <div className="Profile w-[340px] sm:h-[400px] h-auto bg-slate-300 mt-6 rounded-[20px] p-4">
        <h2 className="text-2xl font-bold mb-4">
          Name: <span className="font-normal">{student.name}</span>
        </h2>
        <p className="text-lg mb-2 font-bold">
          Age: <span className="font-normal">{student.age}</span>
        </p>
        <p className="text-lg mb-2 font-bold">
          Class: <span className="font-normal">{student.classId}</span>
        </p>
        <h3 className="text-xl font-bold mt-4">Courses Taken:</h3>
        <ul className="list-disc pl-5 mt-2">
          {student.courses?.map((course, index) => (
            <li key={index} className="text-lg">
              {course.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDetailsPage;
