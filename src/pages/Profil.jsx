import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profil() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [moduls, setModuls] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/modul.php")
      .then((res) => res.json())
      .then((data) => setModuls(data));
  }, []);

  if (!user) {
    return (
      <div className="container">
        <h3 style={{ color: "crimson" }}>⚠️ Akses Ditolak</h3>
        <p>Silakan login terlebih dahulu untuk melihat profil pengguna.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>👤 Profil Pengguna</h2>

      <div className="modul-card" style={{ background: "#f8f8f8", marginBottom: "2rem" }}>
        <p>
          <strong>📛 Nama:</strong> {user.username}
        </p>
        <p>
          <strong>📧 Email:</strong> {user.email}
        </p>
        <p>
          <strong>🔐 Role:</strong>{" "}
          <span style={{ fontWeight: "bold", color: user.role === "admin" ? "crimson" : "#4CAF50" }}>
            {user.role}
          </span>
        </p>
      </div>

      <h3 style={{ marginBottom: "1rem" }}>📚 Riwayat Kuis</h3>
      {moduls.length === 0 && <p>⏳ Memuat daftar modul...</p>}

      <div className="modul-grid">
        {moduls.map((modul) => {
          const skor = localStorage.getItem(`skor_modul_${modul.id}_${user.id}`);
          if (!skor) return null;

          const lulus = skor >= 70;

          return (
            <div key={modul.id} className="modul-card" style={{ background: "#fefefe" }}>
              <h4>{modul.judul}</h4>
              <p>
                Skor: <strong>{skor}</strong>{" "}
                {lulus ? (
                  <span style={{ color: "green" }}>✅ Lulus</span>
                ) : (
                  <span style={{ color: "crimson" }}>❌ Tidak Lulus</span>
                )}
              </p>
              {lulus && (
                <Link to={`/sertifikat/${modul.id}`} className="btn-detail">
                  🏆 Lihat Sertifikat
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
