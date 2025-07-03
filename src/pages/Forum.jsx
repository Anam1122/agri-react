import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Forum() {
  const [topik, setTopik] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:8000/api/forum.php")
      .then((res) => res.json())
      .then((data) => setTopik(data));
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>💬 Forum Diskusi AgriNuklir</h2>

      {user && (
        <div style={{ textAlign: "right", marginBottom: "1rem" }}>
          <Link to="/forum/tambah" className="btn-primary">
            ➕ Buat Topik Baru
          </Link>
        </div>
      )}

      {topik.length === 0 ? (
        <p style={{ textAlign: "center", color: "#999" }}>
          ❗ Belum ada topik diskusi. Jadilah yang pertama memulai!
        </p>
      ) : (
        <div className="modul-grid">
          {topik.map((item) => (
            <div key={item.id} className="modul-card" style={{ background: "#fefefe" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>{item.judul}</h3>
              <p style={{ color: "#555" }}>
                {item.isi.length > 100
                  ? item.isi.substring(0, 100) + "..."
                  : item.isi}
              </p>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#777",
                  margin: "0.5rem 0 1rem",
                }}
              >
                👤 <strong>{item.username}</strong> | 🕒{" "}
                {new Date(item.created_at).toLocaleString()}
              </div>
              <Link to={`/forum/${item.id}`} className="btn-detail">
                ➤ Buka Diskusi
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
