import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditModul() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");
  const [gambarLama, setGambarLama] = useState("");
  const [gambarBaru, setGambarBaru] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/modul.php")
      .then((res) => res.json())
      .then((data) => {
        const modul = data.find((m) => m.id === parseInt(id));
        if (modul) {
          setJudul(modul.judul);
          setKonten(modul.konten);
          setGambarLama(modul.gambar_url);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("judul", judul);
    formData.append("konten", konten);
    if (gambarBaru) {
      formData.append("gambar", gambarBaru);
    }

    fetch("http://localhost:8000/api/edit_modul.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert("✅ Modul berhasil diperbarui!");
          navigate("/admin");
        } else {
          alert("❌ " + res.message);
        }
      });
  };

  if (loading) return <p>⏳ Memuat data modul...</p>;

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>✏️ Edit Modul</h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "600px",
          margin: "auto"
        }}
      >
        <label>
          Judul Modul:
          <input
            type="text"
            placeholder="Judul Modul"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </label>

        <label>
          Konten Modul:
          <textarea
            rows={6}
            placeholder="Konten lengkap modul..."
            value={konten}
            onChange={(e) => setKonten(e.target.value)}
            required
            style={{ resize: "vertical" }}
          />
        </label>

        {gambarLama && (
          <div>
            <strong>📷 Gambar Saat Ini:</strong><br />
            <img
              src={
                gambarLama.startsWith("uploads/")
                  ? `http://localhost:8000/${gambarLama}`
                  : gambarLama
              }
              alt="Gambar lama"
              style={{
                width: "100%",
                maxWidth: "100%",
                borderRadius: "8px",
                marginTop: "0.5rem",
                boxShadow: "0 0 8px rgba(0,0,0,0.1)"
              }}
            />
          </div>
        )}

        <label>
          Ganti Gambar (Opsional):
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGambarBaru(e.target.files[0])}
          />
        </label>

        <button type="submit" style={{ marginTop: "1rem" }}>
          💾 Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
