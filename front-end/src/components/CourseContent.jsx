import { useState, useEffect } from "react";
import Modal from "react-modal";
import Edit_Icon from "../assets/editIcon.svg";
import Delete_Icon from "../assets/deleteIcon.svg";
import { Link } from "react-router-dom";

const CourseContent = () => {
  const [courses, setCourses] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });

  useEffect(() => {
    fetch("http://localhost:3000/api/course/")
      .then((response) => response.json())
      .then((data) => {
        console.log("API response: ", data);
        if (data.isSuccessful && Array.isArray(data.data)) {
          setCourses(data.data);
        } else {
          console.log(
            "API response does not contain an array of courses: ",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching course data: ", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/course/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccessful) {
          setCourses((prevCourses) =>
            prevCourses.filter((course) => course.id !== id)
          );
          setIsDeleteModalOpen(false);
        } else {
          console.error("Error deleting course:", data);
        }
      })
      .catch((error) => console.error("Error deleting course:", error));
  };

  const handleEdit = () => {
    fetch(`http://localhost:3000/api/course/${selectedCourse.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newCourse.title,
        description: newCourse.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccessful) {
          setCourses((prevCourses) =>
            prevCourses.map((course) =>
              course.id === selectedCourse.id
                ? {
                    ...course,
                    title: newCourse.title,
                    description: newCourse.description,
                  }
                : course
            )
          );
          setIsEditModalOpen(false);
        } else {
          console.error("Error editing course:", data);
        }
      })
      .catch((error) => console.error("Error editing course:", error));
  };

  const openEditModal = (course) => {
    setSelectedCourse(course);
    setNewCourse({ title: course.title, description: course.description });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (course) => {
    setSelectedCourse(course);
    setIsDeleteModalOpen(true);
  };

  return (
    <div>
      <div className="CourseContent w-full h-auto bg-white grid grid-cols-1 sm:grid-cols-2 min-[760px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1920px]:grid-cols-5 mx-0 px-0 py-5 gap-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-[#dadde2] p-4 rounded-lg shadow-md flex flex-row items-center h-[250px] mx-4 justify-between border border-white"
          >
            <div className="flex flex-col flex-grow">
              <Link to={`/course/${course.id}/details`}>
                <h3 className="text-xl font-bold mb-2 text-slate-500 hover:scale-105 duration-300">
                  Class course: {course.title}
                </h3>
              </Link>
              <p className="text-slate-500">
                Description: {course.description}
              </p>
              <p className="text-slate-500">ID: {course.id}</p>
            </div>
            <div className="flex flex-col">
              <button
                className="flex mb-1 border gap-1 font-semibold hover:text-slate-300 h-10 w-[50px] justify-center items-center rounded-[30px] bg-[#889fa5] hover:scale-110 duration-300"
                onClick={() => openDeleteModal(course)}
              >
                <img
                  src={Delete_Icon}
                  alt="icon"
                  className="w-[20px] h-[20px]"
                />
              </button>
              <button
                className="flex mb-1 border gap-1 font-semibold hover:text-slate-300 h-10 w-[50px] justify-center items-center rounded-[30px] bg-[#889fa5] hover:scale-110 duration-300"
                onClick={() => openEditModal(course)}
              >
                <img src={Edit_Icon} alt="icon" className="w-[20px] h-[20px]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      <div className="w-full h-full flex items-center justify-center">
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          contentLabel="Delete Class"
          className="max-w-sm w-full mx-auto mt-20 p-6 bg-slate-300 rounded-[20px] flex-col relative top-[25%]"
        >
          <h2 className="text-2xl mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete {selectedCourse?.title}?</p>
          <div className="flex justify-center mt-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-[20px] mr-2"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-[20px]"
              onClick={() => handleDelete(selectedCourse.id)}
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
        contentLabel="Edit Class"
        className="max-w-sm w-full mx-auto mt-20 p-6 bg-slate-300 rounded-[20px] relative top-[25%]"
      >
        <h2 className="text-2xl mb-4">Edit Class</h2>
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
              value={newCourse.title}
              onChange={(e) =>
                setNewCourse({ ...newCourse, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-[20px]"
              required
            />
            <label className="block text-gray-700">Description:</label>
            <input
              type="text"
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-[20px]"
            />
          </div>
          <div className="flex justify-center">
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

export default CourseContent;
