import React, { useState, useEffect } from "react";
import Arrow_Down from "../assets/arrowDown.svg";
import { Link } from "react-scroll";
import Modal from "react-modal";

const StudentsHeader = () => {
  const [students, setStudents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [classId, setClassId] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch("http://localhost:3000/api/student/")
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
        if (data.isSuccessful && Array.isArray(data.data)) {
          setStudents(data.data);
        } else {
          console.error(
            "API response does not contain an array of students:",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching student data:", error));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    window.location.reload();
  };

  const handleThis = () => {
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = { name, age: Number(age) };

    if (classId) {
      newStudent.classId = Number(classId);
    }

    fetch("http://localhost:3000/api/student/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccessful) {
          fetchStudents();
          closeModal();
        } else {
          console.error("Error adding student:", data);
        }
      })
      .catch((error) => console.error("Error adding student:", error));
  };

  return (
    <div className="w-full h-[35vh] min-[400px]:h-[35vh] min-[370px]:h-[42vh] min-[1200px]:h-[37vh] md:h-[40vh] bg-[#628281] flex justify-center items-center gap-0 min-[1920px]:h-[28vh] mt-10 md:mt-0">
      <div className="flex flex-col items-center relative">
        <h1 className="text-4xl font-bold text-white text-center pt-5">
          Enrolled Students
        </h1>
        <h1 className="text-2xl font-semibold text-white text-center pt-8">
          You Can find a list of students enrolled in our courses here
        </h1>
        <button>
          <Link to="StudentContent" smooth={true} offset={-35} duration={300}>
            <img
              src={Arrow_Down}
              alt="Arrow-Down "
              className="w-[48px] h-[48px] mt-2"
            />
          </Link>
        </button>
        <button
          onClick={openModal}
          className="mt-4 bg-white text-[#43655a] px-4 py-2 rounded-[20px]"
        >
          Add Student
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Student Modal"
        className="w-[375px] p-5 bg-slate-300 rounded-[20px] shadow-md mx-auto my-8 flex-col items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-[20px]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 border rounded-[20px]"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">Class ID (optional):</label>
            <input
              type="number"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full px-3 py-2 border rounded-[20px]"
            />
          </div> */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[110px] bg-[#43655a] text-white py-2 rounded-[20px]"
              onClick={handleThis}
            >
              Add Student
            </button>
          </div>
        </form>
        <div className="flex justify-center">
          <button
            onClick={closeModal}
            className="w-[110px] mt-4 bg-red-500 text-white px-4 py-2 rounded-[20px]"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default StudentsHeader;
