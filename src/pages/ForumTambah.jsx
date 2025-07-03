import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForumTambah() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    judul: "",
    isi: ""
  });
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="container">
        <h3>⚠️ Akses ditolak</h3>
        <p>Kamu harus login untuk membuat topik baru.</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    fetch("http://localhost:8000/api/forum.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        judul: form.judul,
        isi: form.isi
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          navigate("/forum");
        } else {
          setError(res.message || "Gagal menyimpan topik.");
        }
      })
      .catch(() => setError("Gagal menghubungi server."));
  };

  return (
    <div className="container">
      <h2>➕ Buat Topik Diskusi</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul Topik"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          required
        />
        <textarea
          rows={6}
          placeholder="Isi topik..."
          value={form.isi}
          onChange={(e) => setForm({ ...form, isi: e.target.value })}
          required
        />
        <button type="submit">💬 Buat Topik</button>
      </form>
    </div>
  );
}
