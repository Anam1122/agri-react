import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ModulList() {
  const [moduls, setModuls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch('http://localhost:8000/api/modul.php')
      .then((res) => {
        if (!res.ok) throw new Error('Gagal terhubung ke server.');
        return res.json();
      })
      .then((data) => {
        setModuls(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat modul:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "#f4f6f9", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #c8e6c9, #f1f8e9)",
        padding: "4rem 2rem",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>🌾 AgriNuklir</h1>
        <p style={{ fontSize: "1.2rem", color: "#444" }}>
          Edukasi interaktif teknologi nuklir dalam pertanian — dari iradiasi benih hingga konservasi pangan.
        </p>
        {!user && (
          <div style={{ marginTop: "1.5rem" }}>
            <Link to="/register" className="btn-primary" style={{ marginRight: "1rem" }}>📝 Daftar Gratis</Link>
            <Link to="/login" className="btn-secondary">🔐 Login</Link>
          </div>
        )}
      </section>

      {/* Topbar */}
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "1rem" }}>
        {user && (
          <div style={{
            display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem"
          }}>
            <span>👋 <strong>{user.username}</strong></span>
            <Link to="/profil">👤 Profil</Link>
            <Link to="/forum">💬 Forum</Link>
            {user.role === "admin" && <Link to="/admin">🛠️ Admin</Link>}
            <button onClick={handleLogout} className="btn-logout">🔓 Logout</button>
          </div>
        )}

        {/* Modul Section */}
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>📘 Modul Edukasi</h2>
        {loading && <p>⏳ Memuat modul...</p>}
        {error && <p style={{ color: 'red' }}>❌ {error}</p>}
        {!loading && moduls.length === 0 && <p>⚠️ Tidak ada modul ditemukan.</p>}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem"
        }}>
          {moduls.map((modul) => (
            <div key={modul.id} style={{
              background: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
            }}>
              <img
                src={
                  modul.gambar_url
                    ? modul.gambar_url.startsWith("uploads/")
                      ? `http://localhost:8000/${modul.gambar_url}`
                      : modul.gambar_url
                    : "https://via.placeholder.com/600x300?text=Tanpa+Gambar"
                }
                alt={modul.judul}
                style={{ width: "100%", height: "160px", objectFit: "cover" }}
              />
              <div style={{ padding: "1rem" }}>
                <h3>{modul.judul}</h3>
                <p style={{ fontSize: "0.95rem", color: "#555" }}>
                  {modul.konten ? modul.konten.substring(0, 100) + '...' : '(Tidak ada konten)'}
                </p>
                <Link to={`/modul/${modul.id}`} className="btn-detail">
                  ➤ Baca Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Simulasi Section */}
        <hr style={{ margin: "4rem 0" }} />
        <section style={{
          background: "#e8f5e9",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
        }}>
          <h2>🎮 Simulasi Iradiasi Benih</h2>
          <p>
            Pelajari bagaimana teknologi nuklir dapat mempercepat mutasi genetik dan meningkatkan hasil panen.
          </p>
          <Link to="/simulasi" className="btn-primary" style={{ marginTop: '1rem', display: "inline-block" }}>
            🚀 Mulai Simulasi
          </Link>
        </section>
      </div>
    </div>
  );
}
