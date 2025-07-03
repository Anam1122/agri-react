import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  const [moduls, setModuls] = useState([]);

  const fetchModuls = () => {
    fetch("http://localhost:8000/api/modul.php")
      .then((res) => res.json())
      .then((data) => setModuls(data));
  };

  useEffect(() => {
    fetchModuls();
  }, []);

  const hapusModul = (id) => {
    if (!window.confirm("Yakin ingin menghapus modul ini?")) return;

    fetch("http://localhost:8000/api/hapus_modul.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert("✅ Modul berhasil dihapus.");
          fetchModuls(); // refresh daftar
        } else {
          alert("❌ " + res.message);
        }
      });
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>🛠️ Admin Panel</h2>

      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        <Link to="/admin/modul/tambah" className="btn-detail">
          ➕ Tambah Modul
        </Link>
      </div>

      <div className="modul-grid">
        {moduls.map((modul) => (
          <div key={modul.id} className="modul-card">
            <h3>{modul.judul}</h3>
            <img
              src={
                modul.gambar_url?.startsWith("uploads/")
                  ? `http://localhost:8000/${modul.gambar_url}`
                  : modul.gambar_url || "https://via.placeholder.com/600x300?text=Tanpa+Gambar"
              }
              alt={modul.judul}
              className="modul-image"
            />
            <p>{modul.konten.substring(0, 100)}...</p>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <Link
                to={`/admin/modul/${modul.id}/kuis`}
                className="btn-detail"
              >
                🎯 Kelola Kuis
              </Link>

              <Link
                to={`/admin/modul/${modul.id}/edit`}
                className="btn-detail"
              >
                🖊️ Edit
              </Link>

              <button
                className="btn-hapus"
                onClick={() => hapusModul(modul.id)}
              >
                🗑️ Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
