import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TambahModul() {
  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");
  const [gambar, setGambar] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("konten", konten);
    if (gambar) {
      formData.append("gambar", gambar);
    }

    fetch("http://localhost:8000/api/tambah_modul.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert("Modul berhasil ditambahkan!");
          navigate("/admin");
        } else {
          alert("Gagal menambah modul.");
        }
      });
  };

  return (
    <div className="container">
      <h2>➕ Tambah Modul</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Judul Modul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
        />
        <textarea
          placeholder="Konten Modul"
          rows={5}
          value={konten}
          onChange={(e) => setKonten(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setGambar(e.target.files[0])}
        />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
