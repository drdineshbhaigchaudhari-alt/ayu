import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { About, Departments, DepartmentDetail, Doctors, DoctorDetail, Facilities, Gallery, Blog, BlogDetail, Contact, BookAppointment, NotFound } from "./pages/Pages";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="departments" element={<Departments />} />
        <Route path="departments/:slug" element={<DepartmentDetail />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="doctors/:slug" element={<DoctorDetail />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
