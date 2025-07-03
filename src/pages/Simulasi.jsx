import { useState } from "react";

export default function Simulasi() {
  const [dosis, setDosis] = useState(30);
  const [hasil, setHasil] = useState(null);
  const [showAnim, setShowAnim] = useState(false);

  const prosesSimulasi = () => {
    let mutasi = 0;
    let ketahanan = "";
    let emoji = "🌱";

    if (dosis >= 10 && dosis <= 30) {
      mutasi = dosis * 2;
      ketahanan = "🌿 Cukup Baik";
      emoji = "🌱🔆";
    } else if (dosis > 30 && dosis <= 60) {
      mutasi = dosis * 3;
      ketahanan = "🌳 Sangat Baik";
      emoji = "🌿💪";
    } else if (dosis > 60) {
      mutasi = dosis * 1.5;
      ketahanan = "⚠️ Terlalu Tinggi";
      emoji = "🥀⚠️";
    } else {
      ketahanan = "🚫 Tidak Efektif";
    }

    setHasil({
      dosis,
      mutasi: Math.round(mutasi),
      ketahanan,
      emoji,
    });

    setShowAnim(true);
    setTimeout(() => setShowAnim(false), 1500);
  };

  return (
    <div className="container">
      <div style={{
        textAlign: "center",
        padding: "2rem 1rem",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #e0f7fa, #f1f8e9)",
        marginBottom: "2rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🧪 Simulasi Iradiasi Benih</h2>
        <p style={{ fontSize: "1rem", color: "#555" }}>
          Geser dosis iradiasi dan tekan tombol untuk melihat efeknya terhadap benih.
        </p>
      </div>

      <div className="modul-card" style={{ marginBottom: "2rem" }}>
        <label><strong>Dosis Iradiasi: {dosis} Gy</strong></label>
        <input
          type="range"
          min="0"
          max="100"
          value={dosis}
          onChange={(e) => setDosis(Number(e.target.value))}
          style={{ width: "100%", margin: "1rem 0" }}
        />
        <button onClick={prosesSimulasi} style={{ width: "100%", fontSize: "1rem" }}>
          🚀 Simulasikan
        </button>
      </div>

      {hasil && (
        <div
          className="modul-card"
          style={{
            marginTop: "2rem",
            textAlign: "center",
            fontSize: "1.1rem",
            background: "#fdfdfd",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "1.5rem",
            transition: "all 0.3s ease"
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
              transform: showAnim ? "scale(1.3)" : "scale(1)",
              transition: "transform 0.4s ease"
            }}
          >
            {hasil.emoji}
          </div>
          <p><strong>🧬 Dosis:</strong> {hasil.dosis} Gy</p>
          <p><strong>🔁 Mutasi Genetik:</strong> {hasil.mutasi}%</p>
          <p><strong>🛡️ Ketahanan:</strong> {hasil.ketahanan}</p>
        </div>
      )}

      <hr style={{ margin: "3rem 0" }} />
      <div style={{ fontSize: "0.9rem", color: "#888", textAlign: "center" }}>
        📝 Simulasi ini hanya ilustrasi. Hasil nyata dapat berbeda tergantung jenis benih & kondisi lingkungan.
      </div>
    </div>
  );
}
