import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import FirstPage from "./FirstPage";
import ClassesPage from "./ClassesPage";
import CoursesPage from "./CoursesPage";
import StudentsPage from "./StudentsPage";
import ClassDetailsPage from "./ClassDetailsPage";
import StudentDetailsPage from "./StudentDetailsPage";
import CourseDetailsPage from "./CourseDetailsPage";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/Courses" element={<CoursesPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path={`/class/:id/details`} element={<ClassDetailsPage />} />
          <Route
            path={`/student/:id/details`}
            element={<StudentDetailsPage />}
          />
          <Route path={`/Course/:id/details`} element={<CourseDetailsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
