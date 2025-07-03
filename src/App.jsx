import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModulList from "./pages/ModulList.jsx";
import ModulDetail from "./pages/ModulDetail.jsx";
import Login from "./pages/Login.jsx";
import Kuis from "./pages/Kuis.jsx";
import Sertifikat from "./pages/Sertifikat.jsx";
import Admin from "./pages/Admin.jsx";
import TambahModul from "./pages/TambahModul.jsx";
import KelolaKuis from "./pages/KelolaKuis.jsx";
import Profil from "./pages/Profil.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import Register from "./pages/Register.jsx";
import Chatbot from "./components/Chatbot";
import Simulasi from './pages/Simulasi.jsx';
import EditModul from "./pages/EditModul.jsx";
import Forum from './pages/Forum.jsx';
import ForumDetail from './pages/ForumDetail.jsx';
import ForumTambah from "./pages/ForumTambah.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman umum */}
        <Route path="/" element={<ModulList />} />
        <Route path="/modul/:id" element={<ModulDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kuis/:id" element={<Kuis />} />
        <Route path="/sertifikat/:id" element={<Sertifikat />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/register" element={<Register />} />
        <Route path="/simulasi" element={<Simulasi />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:id" element={<ForumDetail />} />
        <Route path="/forum/tambah" element={<ForumTambah />} />
        <Route
          path="/admin/modul/:id/edit"
          element={
            <AdminRoute>
              <EditModul />
            </AdminRoute>
          }
        />

        {/* Halaman admin - dibungkus dengan proteksi */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/modul/tambah"
          element={
            <AdminRoute>
              <TambahModul />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/modul/:id/kuis"
          element={
            <AdminRoute>
              <KelolaKuis />
            </AdminRoute>
          }
        />
      </Routes>
       <Chatbot />
    </BrowserRouter>
  );
}
