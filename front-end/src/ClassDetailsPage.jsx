import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClassDetailsPageHeader from "./components/ClassDetailPageHeader";

const ClassDetailsPage = () => {
  const [newStudents, setNewStudents] = useState([]);
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const fetchClassWithStudents = (id) => {
      fetch(`http://localhost:3000/api/class/${id}/details`)
        .then((response) => response.json())
        .then((data) => {
          if (data.isSuccessful) {
            const { students } = data.data; // Extracting the students array
            // Setting the full data (including students) to the state
            console.log("This is the students array:", students);
            setNewStudents(students);
            console.log("this student", newStudents);
          } else {
            console.error("Error fetching class with students:", data);
          }
        })
        .catch((error) =>
          console.error("Error fetching class with students:", error)
        );
    };

    fetchClassWithStudents(id);
  }, [id]);

  return (
    <div>
      <ClassDetailsPageHeader />
      <div className=" w-full h-auto bg-white grid grid-cols-1 sm:grid-cols-2 min-[760px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1920px]:grid-cols-5 mx-0 px-0 py-5 gap-4">
        {newStudents.map((stud) => (
          <div
            className="bg-[#dadde2] p-4 rounded-lg shadow-md flex flex-row items-center h-[150px] mx-4 justify-between"
            key={stud.id}
          >
            <h3 className="text-xl font-bold mb-2 text-slate-500">
              {" "}
              Student Name: {stud.name}
              <p className="text-slate-500 ">Age: {stud.age}</p>
              <p className="text-slate-500 ">ID: {stud.id}</p>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassDetailsPage;
