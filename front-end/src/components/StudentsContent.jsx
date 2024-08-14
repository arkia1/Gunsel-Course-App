import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Edit_Icon from "../assets/editIcon.svg";
import Delete_Icon from "../assets/deleteIcon.svg";
import { Link } from "react-router-dom";

const StudentsContent = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newClassId, setNewClassId] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    // Fetch students
    fetch("http://localhost:3000/api/student/")
      .then((response) => response.json())
      .then((data) => {
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

    // Fetch classes
    fetch("http://localhost:3000/api/class/")
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccessful && Array.isArray(data.data)) {
          setClasses(data.data);
        } else {
          console.error(
            "API response does not contain an array of classes:",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching class data:", error));

    // Fetch all courses
    fetch("http://localhost:3000/api/course/")
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccessful && Array.isArray(data.data)) {
          setAllCourses(data.data);
        } else {
          console.error(
            "API response does not contain an array of courses:",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching course data:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/student/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccessful) {
          setStudents((prevStudents) =>
            prevStudents.filter((student) => student.id !== id)
          );
          setIsDeleteModalOpen(false);
        } else {
          console.error("Error deleting student:", data);
        }
      })
      .catch((error) => console.error("Error deleting student:", error));
  };

  const handleEdit = () => {
    const updatedData = {
      name: newName,
      age: parseInt(newAge, 10),
      classId: newClassId ? parseInt(newClassId, 10) : undefined,
      courses: selectedCourses.map((course) => course.id),
    };

    fetch(`http://localhost:3000/api/student/${selectedStudent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccessful) {
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student.id === selectedStudent.id
                ? {
                    ...student,
                    name: newName,
                    age: parseInt(newAge, 10),
                    class: classes.find(
                      (cls) => cls.id === parseInt(newClassId, 10)
                    ),
                    courses: selectedCourses,
                  }
                : student
            )
          );
          setIsEditModalOpen(false);
        } else {
          console.error("Failed to update student:", data.errors);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setNewName(student.name);
    setNewAge(student.age);
    setNewClassId(student.class?.id || "");
    setSelectedCourses(student.courses || []);
    setIsEditModalOpen(true);
  };

  return (
    <div className="StudentContent w-full h-auto bg-white grid grid-cols-1 sm:grid-cols-2 min-[760px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1920px]:grid-cols-5 mx-0 px-0 py-5 gap-4">
      {students.map((student, index) => (
        <div
          key={index}
          className="bg-[#dadde2] p-4 rounded-lg shadow-md flex flex-row items-center h-[150px] mx-4 justify-between"
        >
          <div className="flex flex-col flex-grow">
            <Link to={`/student/${student.id}/details`}>
              <h3 className="text-xl font-bold mb-2 text-slate-500 hover:scale-105 duration-300">
                Name: {student.name}
              </h3>
            </Link>
            <p className="text-slate-500 ">Age: {student.age}</p>
            <p className="text-slate-500 ">ID: {student.id}</p>
            <p className="text-slate-500 ">Class: {student.class?.name}</p>
          </div>
          <div className="flex flex-col items-end">
            <button
              className="flex mb-1 border gap-1 font-semibold hover:text-slate-300 h-10 w-[50px] justify-center items-center rounded-[30px] bg-[#889fa5] hover:scale-110 duration-300"
              onClick={() => openDeleteModal(student)}
            >
              <img src={Delete_Icon} alt="icon" className="w-[25px] h-[25px]" />
            </button>
            <button
              className="flex mt-1 border gap-1 font-semibold hover:text-slate-300 h-10 w-[50px] justify-center items-center rounded-[30px] bg-[#889fa5] hover:scale-110 duration-300"
              onClick={() => openEditModal(student)}
            >
              <img src={Edit_Icon} alt="icon" className="w-[20px] h-[20px]" />
            </button>
          </div>
        </div>
      ))}

      {/* Delete Modal */}
      <div className="w-full h-full flex items-center justify-center">
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          contentLabel="Delete Student"
          className="max-w-sm w-full mx-auto mt-20 p-6 bg-slate-300 rounded-[20px] flex-col relative top-[40%]"
        >
          <h2 className="text-2xl mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete {selectedStudent?.name}?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-[20px] mr-2"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-[20px]"
              onClick={() => handleDelete(selectedStudent.id)}
            >
              Delete
            </button>
          </div>
        </Modal>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Student"
        className="max-w-sm w-full mx-auto mt-20 p-6 bg-slate-300 rounded-[20px]"
      >
        <h2 className="text-2xl mb-4">Edit Student</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 border rounded-[20px]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Age:</label>
            <input
              type="number"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
              className="w-full px-3 py-2 border rounded-[20px]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Class:</label>
            <select
              value={newClassId}
              onChange={(e) => setNewClassId(e.target.value)}
              className="w-full px-3 py-2 border rounded-[20px]"
              required
            >
              <option value="" disabled>
                Select a class
              </option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Courses:</label>
            <select
              multiple
              value={selectedCourses.map((course) => course.id)}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions
                ).map((option) => ({
                  id: parseInt(option.value, 10),
                  name: option.text,
                }));
                setSelectedCourses(selectedOptions);
              }}
              className="w-full px-3 py-2 border rounded-[20px]"
            >
              {allCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-[20px] mr-2"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#43655a] text-white px-4 py-2 rounded-[20px]"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentsContent;
