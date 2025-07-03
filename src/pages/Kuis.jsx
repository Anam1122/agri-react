import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Kuis() {
  const { id } = useParams();
  const [soal, setSoal] = useState([]);
  const [jawaban, setJawaban] = useState({});
  const [skor, setSkor] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:8000/api/kuis.php?modul_id=${id}`)
      .then((res) => res.json())
      .then((data) => setSoal(data));
  }, [id]);

  const handleSubmit = () => {
    let benar = 0;
    soal.forEach((s) => {
      if (jawaban[s.id] === s.jawaban_benar) benar++;
    });

    const nilai = Math.round((benar / soal.length) * 100);
    setSkor(nilai);

    if (user) {
      localStorage.setItem(`skor_modul_${id}_${user.id}`, nilai);
    }
  };

  if (soal.length === 0) return <p>⏳ Memuat soal...</p>;

  if (skor !== null) {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h2>📊 Skor Kamu</h2>
        <p style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: skor >= 70 ? "#4CAF50" : "crimson"
        }}>
          {skor}
        </p>
        {skor >= 70 ? (
          <p>🎉 Selamat! Kamu berhak melihat sertifikat.</p>
        ) : (
          <p>😢 Skor kamu belum cukup. Ulangi lagi ya!</p>
        )}
        <div style={{ marginTop: "1.5rem" }}>
          <button onClick={() => navigate("/")}>🏠 Kembali ke Beranda</button>
          {skor >= 70 && (
            <button
              onClick={() => navigate(`/sertifikat/${id}`)}
              style={{ marginLeft: "1rem" }}
            >
              🏆 Lihat Sertifikat
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>📝 Kuis Modul #{id}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {soal.map((s, index) => (
          <div
            key={s.id}
            style={{
              marginBottom: "1.5rem",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#fdfdfd",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
            }}
          >
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>{index + 1}. {s.pertanyaan}</strong>
            </p>
            {["a", "b", "c"].map((opsi) => (
              <label
                key={opsi}
                style={{
                  display: "block",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  background: jawaban[s.id] === opsi ? "#e8f5e9" : "#fafafa",
                  marginBottom: "6px",
                  border: "1px solid #ccc",
                  cursor: "pointer"
                }}
              >
                <input
                  type="radio"
                  name={`soal_${s.id}`}
                  value={opsi}
                  checked={jawaban[s.id] === opsi}
                  onChange={() => setJawaban({ ...jawaban, [s.id]: opsi })}
                  style={{ marginRight: "8px" }}
                />
                <strong>{opsi.toUpperCase()}.</strong> {s[`opsi_${opsi}`]}
              </label>
            ))}
          </div>
        ))}

        <button type="submit" style={{ width: "100%", padding: "12px" }}>
          ✅ Selesai & Lihat Skor
        </button>
      </form>
    </div>
  );
}
