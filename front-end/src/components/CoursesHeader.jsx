import React, { useState, useEffect } from "react";
import Arrow_Down from "../assets/arrowDown.svg";
import { Link } from "react-scroll";
import Modal from "react-modal";

const CoursesHeader = () => {
  const [courses, setCourses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    fetch("http://localhost:3000/api/course/")
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
        if (data.isSuccessful && Array.isArray(data.data)) {
          setCourses(data.data);
        } else {
          console.error(
            "API response does not contain an array of courses:",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching course data:", error));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // Optionally, you can reload the course data here if needed
    fetchCourses();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = { title, description };

    fetch("http://localhost:3000/api/course/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccessful) {
          fetchCourses();
          closeModal();
        } else {
          console.error("Error adding course:", data);
        }
      })
      .catch((error) => console.error("Error adding course:", error));
  };

  return (
    <div className="w-full h-[35vh] min-[400px]:h-[35vh] min-[370px]:h-[42vh] min-[1200px]:h-[37vh] md:h-[40vh] bg-[#628281] flex justify-center items-center gap-0 min-[1920px]:h-[28vh] mt-10 md:mt-0">
      <div className="flex flex-col items-center relative">
        <h1 className="text-4xl font-bold text-white text-center pt-5">
          Courses
        </h1>
        <h1 className="text-2xl font-semibold text-white text-center pt-8">
          Discover and manage your courses
        </h1>
        <button>
          <Link to="CourseContent" smooth={true} offset={-35} duration={300}>
            <img
              src={Arrow_Down}
              alt="Arrow-Down"
              className="w-[48px] h-[48px] mt-2"
            />
          </Link>
        </button>
        <button
          onClick={openModal}
          className="mt-4 bg-white text-blue-800 px-4 py-2 rounded-[20px]"
        >
          Add Course
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Course Modal"
        className="w-[375px] p-5 bg-slate-300 rounded-[20px] shadow-md mx-auto my-8 flex-col items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">Add Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-[20px]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-[20px]"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[110px] bg-[#43655a] text-white py-2 rounded-[20px]"
            >
              Add Course
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

export default CoursesHeader;
