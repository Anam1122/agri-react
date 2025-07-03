import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function KelolaKuis() {
  const { id } = useParams();
  const [soal, setSoal] = useState([]);
  const [form, setForm] = useState({
    pertanyaan: "",
    opsi_a: "",
    opsi_b: "",
    opsi_c: "",
    jawaban_benar: "a",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSoal = () => {
    fetch(`http://localhost:8000/api/kuis.php?modul_id=${id}`)
      .then((res) => res.json())
      .then((data) => setSoal(data))
      .catch(() => setError("Gagal memuat soal."));
  };

  useEffect(() => {
    fetchSoal();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    fetch("http://localhost:8000/api/kuis.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, modul_id: id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setForm({
            pertanyaan: "",
            opsi_a: "",
            opsi_b: "",
            opsi_c: "",
            jawaban_benar: "a",
          });
          fetchSoal();
        } else {
          setError(res.message || "Gagal menyimpan soal.");
        }
      })
      .catch(() => setError("Gagal menghubungi server."))
      .finally(() => setLoading(false));
  };

  const hapusSoal = (idSoal) => {
    if (!window.confirm("Yakin ingin menghapus soal ini?")) return;

    fetch("http://localhost:8000/api/kuis.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idSoal }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          fetchSoal();
        } else {
          alert("❌ Gagal menghapus soal.");
        }
      })
      .catch(() => alert("❌ Gagal menghubungi server."));
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>✏️ Kelola Kuis Modul #{id}</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <h3>➕ Tambah Soal</h3>
        {error && <p style={{ color: "red" }}>❌ {error}</p>}

        <input
          type="text"
          placeholder="Pertanyaan"
          value={form.pertanyaan}
          onChange={(e) => setForm({ ...form, pertanyaan: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Opsi A"
          value={form.opsi_a}
          onChange={(e) => setForm({ ...form, opsi_a: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Opsi B"
          value={form.opsi_b}
          onChange={(e) => setForm({ ...form, opsi_b: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Opsi C"
          value={form.opsi_c}
          onChange={(e) => setForm({ ...form, opsi_c: e.target.value })}
          required
        />
        <select
          value={form.jawaban_benar}
          onChange={(e) => setForm({ ...form, jawaban_benar: e.target.value })}
        >
          <option value="a">Jawaban Benar: A</option>
          <option value="b">Jawaban Benar: B</option>
          <option value="c">Jawaban Benar: C</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "💾 Simpan Soal"}
        </button>
      </form>

      <hr />

      <h3>📋 Daftar Soal</h3>
      {soal.length === 0 && <p>⚠️ Belum ada soal.</p>}
      {soal.map((s, i) => (
        <div key={s.id} className="modul-card">
          <p>
            <strong>{i + 1}. {s.pertanyaan}</strong>
          </p>
          <ul style={{ paddingLeft: "1rem" }}>
            <li>A. {s.opsi_a}</li>
            <li>B. {s.opsi_b}</li>
            <li>C. {s.opsi_c}</li>
          </ul>
          <p>
            <strong>✅ Jawaban Benar: {s.jawaban_benar?.toUpperCase()}</strong>
          </p>
          <button
            onClick={() => hapusSoal(s.id)}
            style={{
              background: "#e53935",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "0.5rem"
            }}
          >
            🗑️ Hapus Soal
          </button>
        </div>
      ))}
    </div>
  );
}
